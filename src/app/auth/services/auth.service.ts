import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { UIService } from 'src/app/shared/services/ui-helper.service';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { IAppState } from 'src/app/shared/interfaces/app-state.interface';
import * as fromUI from '../../shared/ui/actions';
import * as fromAuth from '../../auth/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isAuthUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly router: Router,
    private readonly auth: AngularFireAuth,
    private readonly uiService: UIService,
    private readonly store: Store<IAppState>
  ) {}

  /**
   * Init authorization
   */
  public initAuthListener(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.successfulAutorization();
      } else {
        this.store.dispatch(new fromAuth.SetUnautheticated());
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Register user
   * @param data – user data
   */
  public registerUser(data: IUserData): void {
    this.store.dispatch(new fromUI.StartLoading());
    this.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.successfulAutorization();
      })
      .catch((error: Error) => {
        this.store.dispatch(new fromAuth.SetUnautheticated());
        this.store.dispatch(new fromUI.StopLoading());
        this.uiService.openSnackBar(error.message);
      });
  }

  /**
   * Login user
   * @param data – user data
   */
  public login(data: IUserData): void {
    this.store.dispatch(new fromUI.StartLoading());
    this.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.successfulAutorization();
      })
      .catch((error: Error) => {
        this.store.dispatch(new fromAuth.SetUnautheticated());
        this.store.dispatch(new fromUI.StopLoading());
        this.uiService.openSnackBar(error.message);
      });
  }

  /**
   * Logout user
   */
  public logout(): void {
    this.auth
      .signOut()
      .then(() => {
        this.store.dispatch(new fromAuth.SetUnautheticated());
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      })
      .catch((error: Error) => {
        const errorMessage = error && error.message ? error.message : 'Please try again';
        this.uiService.openSnackBar(errorMessage);
      });
  }

  /**
   * Get user
   */
  /*  public getUser(): IUserData {
     return {...this.user$.value};
   } */

  /**
   * Handler of successful autorization
   */
  private successfulAutorization(): void {
    this.store.dispatch(new fromAuth.SetAutheticated());
    this.router.navigate(['/trainings']);
  }
}
