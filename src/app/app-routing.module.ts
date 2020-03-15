import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'signup',
     component: SignupComponent
  },
  {
    path: 'login',
     component: LoginComponent
  },
  {
    path: 'trainings',
    loadChildren: () => import('./training/training.module').then(m => m.TrainingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
