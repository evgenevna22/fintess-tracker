import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingsService } from 'src/app/training/services/trainings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly isAuthUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly router: Router,
              private readonly auth: AngularFireAuth) {
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
    this.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.successfulAutorization();
      })
      .catch(() => {
        this.isAuthUser$.next(false);
      });
  }

  /**
   * Login user
   * @param data – user data
   */
  public login(data: IUserData): void {
    this.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        this.successfulAutorization();
      })
      .catch(() => {
        this.isAuthUser$.next(false);
      });
  }

  /**
   * Logout user
   */
  public logout(): void {
    this.auth.signOut;
    this.isAuthUser$.next(false);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
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
    this.router.navigate(['/trainings']);
  }
}