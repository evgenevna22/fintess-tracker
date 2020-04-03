import { Router, CanLoad } from '@angular/router';
import { TrainingsService } from '../services/trainings.service';

export class PageCurrentTrainingGuard implements CanLoad {
  
  constructor(private readonly trainingsService: TrainingsService,
    private readonly router: Router) {}

  canLoad(): boolean {
    return !this.trainingsService.getSelectExercise() 
      ? (this.router.navigate(['/trainings/new']) && false)
      : true;
  }
}