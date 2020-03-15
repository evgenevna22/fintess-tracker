import { IAppNavigation } from '../interfaces/app-navigation.interface';

export const AUTH_NAVIGATION_LIST: IAppNavigation[] = [
  {
    path: '/trainings',
    label: 'Trainings',
    iconName: 'fitness_center',
  }
];

export const NOT_AUTH_NAVIGATION_LIST: IAppNavigation[] = [
  {
    path: '/trainings',
    label: 'Signin',
    iconName: 'exit_to_app',
  },
  {
    path: '/login',
    label: 'Login',
    iconName: 'present_to_all',
  }
];