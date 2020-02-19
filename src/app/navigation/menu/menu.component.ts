import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface INavigation {
  url: string;
  text: string;
  iconName: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() closeSideNavEvent: EventEmitter<void> = new EventEmitter<void>();

  public navigationList: INavigation[] = [
    {
      url: '/signup',
      text: 'SignUp',
      iconName: 'account_circle'
    },
    {
      url: '/login',
      text: 'LogIn',
      iconName: 'lock_open'
    },
    {
      url: '/trainings',
      text: 'Trainings',
      iconName: 'fitness_center'
    },
    {
      url: '',
      text: 'Logout',
      iconName: 'replay'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  public closeSideNav(): void {
    this.closeSideNavEvent.emit();
  }

}
