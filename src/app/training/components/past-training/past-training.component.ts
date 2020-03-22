import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ITraining } from '../../interfaces/training.interface';
import { TrainingsService } from '../../services/trainings.service';
import { takeUntil, skipWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TrainingTypeEnum } from '../../enums/training-type.enum';
import { TrainingStateEnum } from '../../enums/training-state.enum';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
  host: {
    class: 'page-wrapper'
  }
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public pastTrainings: MatTableDataSource<ITraining> = new MatTableDataSource<ITraining>();
  public displayedColumns: string[] = [];
  public trainingType = TrainingTypeEnum;
  public trainingState = TrainingStateEnum;
  
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly trainingsService: TrainingsService) { }

  ngOnInit() {
    this.displayedColumns = ['id', 'type', 'name', 'duration', 'calories', 'date', 'state'];
    this.trainingsService.trainingsBS$
      .pipe(
        takeUntil(this.unsubscribe),
        skipWhile(v => !v)
      )
      .subscribe((trainings: ITraining[]) => {
        this.pastTrainings.data = [...trainings];
        console.log(this.pastTrainings);
      });
  }

  ngAfterViewInit() {
    this.pastTrainings.sort = this.sort;
    this.pastTrainings.paginator = this.paginator;
  }

  /**
   * Filter trainings table
   * @param event – keyword event
   */
  public filterTrainings(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pastTrainings.filter = filterValue.trim().toLowerCase();
  }

}
