import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user$: BehaviorSubject<IUserData> = new BehaviorSubject<IUserData>(null);
  public isAuthUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly router: Router) {
    if (localStorage.getItem('userData')) {
      this.user$.next(JSON.parse(localStorage.getItem('userData')));
      this.isAuthUser$.next(true);
    }
  }
  
  /**
   * Register user
   * @param data – user data
   */
  public registerUser(data: IUserData): void {
    this.user$.next({
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString()
    });
    this.isAuthUser$.next(true);
  }

  /**
   * Login user
   * @param data – user data
   */
  public login(data: IUserData): void {
    this.user$.next({
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString()
    });
    this.isAuthUser$.next(true);
    localStorage.setItem('userData', JSON.stringify(this.user$.value));
    this.router.navigate(['/trainings']);
  }

  /**
   * Logout user
   */
  public logout(): void {
    this.user$.next(null);
    this.isAuthUser$.next(false);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  /**
   * Get user
   */
  public getUser(): IUserData {
    return {...this.user$.value};
  }

  /**
   * Check user authorization
   * @return – boolean mark of user authorization
   */
  public isAuth(): boolean {
    return this.user$.value !== null;
  }
}