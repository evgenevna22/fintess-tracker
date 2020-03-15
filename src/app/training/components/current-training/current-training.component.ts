import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SimpleDialogComponent } from "src/app/shared/components/simple-dialog/simple-dialog.component";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

const finishedSpinnerValue = 100;

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.scss"]
})
export class CurrentTrainingComponent implements OnInit {
  public trainingProgress = 0;
  private timer: number;
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Stop training handler
   */
  public stopTraining(): void {
    clearInterval(this.timer);
    const disalogRef: MatDialogRef<
      SimpleDialogComponent,
      any
    > = this.dialog.open(SimpleDialogComponent, {
      data: {
        title: "Are you sure you want to finish your training?",
        info: `Your progress is ${this.trainingProgress} %`
      }
    });

    disalogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((result: boolean) => {
        result ? this.router.navigate(["/new"]) : this.startOrResumeTimer();
      });
  }

  /**
   * Method start or resume timer
   */
  private startOrResumeTimer(): void {
    this.timer = <any>setInterval(() => {
      this.trainingProgress < finishedSpinnerValue
        ? (this.trainingProgress += 10)
        : clearInterval(this.timer);
    }, 1000);
  }
}
