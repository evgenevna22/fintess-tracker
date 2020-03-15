import { IAppNavigation } from '../interfaces/app-navigation.interface';

export const AUTH_NAVIGATION_LIST: IAppNavigation[] = [
  {
    path: '/trainings',
    label: 'Trainings',
    iconName: 'fitness_center',
  },
  {
    path: '',
    label: 'Logout',
    iconName: 'replay',
  },
];

export const NOT_AUTH_NAVIGATION_LIST: IAppNavigation[] = [
  {
    path: '/trainings',
    label: 'Trainings',
    iconName: 'fitness_center',
  },
  {
    path: '',
    label: 'Logout',
    iconName: 'replay',
  }
];