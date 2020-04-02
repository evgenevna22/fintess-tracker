import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  public loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly snackBar: MatSnackBar) {}

  /**
   * Snackbar opening handler
   * @param message – info message
   * @param action – action for popup
   */
  public openSnackBar(message: string, action: any = null, duration: number = 5000): void {
    this.snackBar.open(message, action, {
      duration: duration
    })
  }
}