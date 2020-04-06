import { Router, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { IFullTrainingState } from 'src/app/shared/interfaces/training-state.interface';

export class PageCurrentTrainingGuard implements CanLoad {
  constructor(
    private readonly store: Store<IFullTrainingState>,
    private readonly router: Router
  ) {}

  canLoad(): boolean {
    return true
  }
}
