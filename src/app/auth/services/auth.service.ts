import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private readonly router: Router) {}

  public user$: BehaviorSubject<IUserData> = new BehaviorSubject<IUserData>(null);
  public isAuthUser$: Subject<boolean> = new Subject<boolean>();
  
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
  }

  /**
   * Logout user
   */
  public logout(): void {
    this.user$.next(null);
    this.isAuthUser$.next(false);
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