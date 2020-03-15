import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  AUTH_NAVIGATION_LIST,
  NOT_AUTH_NAVIGATION_LIST
} from "../../consts/navigation-consts";
import { IAppNavigation } from "../../interfaces/app-navigation.interface";
import { AuthService } from "src/app/auth/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  @Output() closeSideNavEvent: EventEmitter<void> = new EventEmitter<void>();

  public navigationList: IAppNavigation[] = NOT_AUTH_NAVIGATION_LIST;
  public isAuthUser: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.subscription.add(
      this.authService.isAuthUser$.subscribe((value: boolean) => {
        this.isAuthUser = value;
        this.navigationList = value
          ? AUTH_NAVIGATION_LIST
          : NOT_AUTH_NAVIGATION_LIST;
      })
    );
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
