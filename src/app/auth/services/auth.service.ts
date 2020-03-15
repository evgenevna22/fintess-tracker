import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IUserData } from 'src/app/shared/interfaces/user-data.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user$: BehaviorSubject<IUserData> = new BehaviorSubject<IUserData>(null);
  public isAuthUser$: Subject<boolean> = new Subject<boolean>();
  
  public registerUser(data: IUserData): void {
    this.user$.next({
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString()
    });
    this.isAuthUser$.next(true);
  }

  public login(data: IUserData): void {
    this.user$.next({
      email: data.email,
      userId: Math.round(Math.random() * 1000).toString()
    });
    this.isAuthUser$.next(true);
  }

  public logout(): void {
    this.user$.next(null);
    this.isAuthUser$.next(false);
  }

  public getUser(): IUserData {
    return {...this.user$.value};
  }

  public isAuth(): boolean {
    return this.user$.value !== null;
  }
}