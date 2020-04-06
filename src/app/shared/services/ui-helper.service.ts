import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class UIService {

  constructor(private readonly snackBar: MatSnackBar) {}

  /**
   * Snackbar opening handler
   * @param message – info message
   * @param action – action for popup
   */
  public openSnackBar(message: string, action: any = null, duration: number = 5000): void {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}
