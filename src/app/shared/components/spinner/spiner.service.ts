import { Injectable, ComponentFactory } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from './spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private overlayRef: OverlayRef = null;

  constructor(private readonly overlay: Overlay) {}

  /**
   * Showing spinner component
   */
  public show(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }
    const spinnerOverlayPortal = this.createComponentPortal();
    this.overlayRef.attach(spinnerOverlayPortal);
  }

  /**
   * Creating spinner portal component
   */
  public createComponentPortal(): ComponentPortal<SpinnerComponent> {
    return new ComponentPortal(SpinnerComponent);
  }

  /**
   * Hiding spinner
   */
  public hide(): void {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}