import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../../services/trainings.service';
import { ITraining } from '../../interfaces/training.interface';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public trainings: Observable<ITraining[] | any>;
  public selectedTraining: FormControl = new FormControl(null, Validators.required);

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly trainingsService: TrainingsService,
    private readonly db: AngularFirestore
  ) {}

  ngOnInit() {
    this.trainings = this.db.collection('avaliableExercises')
      .snapshotChanges()
      .pipe(
        map(data => {
          return data.map((item: any) => {
            return {
              id: item.payload.doc.id,
              ...item.payload.doc.data()
            }
          })
        })
      );

    this.selectedTraining.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((id: number) => {
        /* this.trainingsService.selectedExercise$.next(
          this.trainings.find(training => training.id === id)
        ); */
      })
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Creating the new training
   */
  public createNewTraining(): void {
    this.router.navigate(['../current'], {relativeTo: this.activatedRoute});
  }
}
