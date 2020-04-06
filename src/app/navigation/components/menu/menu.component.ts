import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AUTH_NAVIGATION_LIST,
  NOT_AUTH_NAVIGATION_LIST,
} from '../../consts/navigation-consts';
import { IAppNavigation } from '../../interfaces/app-navigation.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/shared/interfaces/app-state.interface';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() closeSideNavEvent: EventEmitter<void> = new EventEmitter<void>();

  public navigationList: IAppNavigation[] = NOT_AUTH_NAVIGATION_LIST;
  public isAuthUser = false;

  private subscription: Subscription = new Subscription();

  constructor(private readonly store: Store<IAppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .pipe(select(fromRoot.getIsAuth))
      .subscribe((isAuth: boolean) => {
        this.isAuthUser = isAuth;
        this.navigationList = isAuth
          ? AUTH_NAVIGATION_LIST
          : NOT_AUTH_NAVIGATION_LIST;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Side mav close handler
   */
  public closeSideNav(): void {
    this.closeSideNavEvent.emit();
  }
}
