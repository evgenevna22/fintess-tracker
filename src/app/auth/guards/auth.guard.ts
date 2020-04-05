import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from 'src/app/shared/interfaces/app-state.interface';
import * as fromRoot from '../../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly store: Store<IAppState>) {}

  canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        select(fromRoot.getIsAuth),
        take(1)
      );
  }

  canLoad(): Observable<boolean> {
    return this.store
      .pipe(
        select(fromRoot.getIsAuth),
        take(1)
      );
  }
}
