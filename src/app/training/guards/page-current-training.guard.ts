import { CanActivate, Router } from '@angular/router';
import { TrainingsService } from '../services/trainings.service';

export class PageCurrentTrainingGuard implements CanActivate {
  
  constructor(private readonly trainingsService: TrainingsService,
    private readonly router: Router) {}

  canActivate(): boolean {
    return !this.trainingsService.getSelectExercise() 
      ? (this.router.navigate(['/trainings/new']) && false)
      : true;
  }
}