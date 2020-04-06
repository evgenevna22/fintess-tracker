import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IAppNavigation } from '../../interfaces/app-navigation.interface';
import {
  AUTH_NAVIGATION_LIST,
  NOT_AUTH_NAVIGATION_LIST,
} from '../../consts/navigation-consts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/shared/interfaces/app-state.interface';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuEvent: EventEmitter<void> = new EventEmitter<void>();

  public navigationList: IAppNavigation[] = NOT_AUTH_NAVIGATION_LIST;
  public isAuthUser = false;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public authService: AuthService,
    private readonly store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.store
      .pipe(takeUntil(this.unsubscribe), select(fromRoot.getIsAuth))
      .subscribe((isAuth: boolean) => {
        this.isAuthUser = isAuth;
        this.navigationList = isAuth
          ? AUTH_NAVIGATION_LIST
          : NOT_AUTH_NAVIGATION_LIST;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Toggle menu
   */
  public toggleMenu(): void {
    this.toggleMenuEvent.emit();
  }

  /**
   * Logout
   */
  public logout(): void {
    this.authService.logout();
  }
}
