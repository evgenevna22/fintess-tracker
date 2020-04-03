import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from 'src/app/shared/services/ui-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly isAuthUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly router: Router,
              private readonly auth: AngularFireAuth,
              private readonly uiService: UIService) {
  }

  /**
   * Init authorization
   */
  public initAuthListener(): void {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.successfulAutorization();
      } else {
        this.isAuthUser$.next(false);
        this.router.navigate(['/login']);
      }
    })
  }
  
  /**
   * Register user
   * @param data – user data
   */
  public registerUser(data: IUserData): void {
    this.uiService.loadingStateChanged.next(true);
    this.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.successfulAutorization();
      })
      .catch((error: Error) => {
        this.isAuthUser$.next(false);
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar(error.message);
      });
  }

  /**
   * Login user
   * @param data – user data
   */
  public login(data: IUserData): void {
    this.uiService.loadingStateChanged.next(true);
    this.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.successfulAutorization();
      })
      .catch((error: Error) => {
        this.isAuthUser$.next(false);
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar(error.message);
      });
  }

  /**
   * Logout user
   */
  public logout(): void {
    this.auth.signOut()
      .then(() => {
        this.isAuthUser$.next(false);
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      })
      .catch((error: Error) => {
        const errorMessage = error && error.message ? error.message : 'Please try again';
        this.uiService.openSnackBar(errorMessage);
      })
  }

  /**
   * Get user
   */
 /*  public getUser(): IUserData {
    return {...this.user$.value};
  } */

  /**
   * Check user authorization
   * @return – boolean mark of user authorization
   */
  public isAuth(): boolean {
    return this.isAuthUser$.value;
  }

  /**
   * Handler of successful autorization
   */
  private successfulAutorization(): void {
    this.isAuthUser$.next(true);
    this.uiService.loadingStateChanged.next(true);
    this.router.navigate(['/trainings']);
  }
}