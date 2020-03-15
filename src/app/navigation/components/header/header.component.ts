import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { IAppNavigation } from "../../interfaces/app-navigation.interface";
import {
  AUTH_NAVIGATION_LIST,
  NOT_AUTH_NAVIGATION_LIST
} from "../../consts/navigation-consts";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuEvent: EventEmitter<void> = new EventEmitter<void>();

  public navigationList: IAppNavigation[];

  private unsuscribe: Subject<void>;

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthUser$
      .pipe(takeUntil(this.unsuscribe))
      .subscribe((value: boolean) => {
        this.navigationList = value
          ? AUTH_NAVIGATION_LIST
          : NOT_AUTH_NAVIGATION_LIST;
      });
  }

  ngOnDestroy() {
    this.unsuscribe.next();
    this.unsuscribe.complete();
  }

  /**
   * Toggle menu
   */
  public toggleMenu(): void {
    this.toggleMenuEvent.emit();
  }
}
