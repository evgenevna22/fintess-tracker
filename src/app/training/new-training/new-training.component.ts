import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TrainingTypeEnum } from "../enums/training-type.enum";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"]
})
export class NewTrainingComponent implements OnInit {
  @Output() createNewTrainingEvent: EventEmitter<void> = new EventEmitter<
    void
  >();

  public trainings = [
    {
      value: TrainingTypeEnum.Running,
      label: "Running"
    },
    {
      value: TrainingTypeEnum.Squats,
      label: "Squats"
    },
    {
      value: TrainingTypeEnum.PushAps,
      label: "PushAps"
    },
    {
      value: TrainingTypeEnum.Yoga,
      label: "Yoga"
    }
  ];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit() {}

  /**
   * Creating the new training
   */
  public createNewTraining(): void {
    this.router.navigate(['/current']);
  }
}
