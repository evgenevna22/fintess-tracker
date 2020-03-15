import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MethodsService {

  /**
   * Set auth mark
   */
  public setAuthMark(array: any, mark: boolean): [] {
    return array.map(item => {
      item.isAuth = !item.isAuth;
      return item;
    })
  }
}