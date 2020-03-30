import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spiner.service';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public portalSpinner: ComponentPortal<SpinnerComponent>;
  public isLoading = false;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
    this.authService.loadingStateChanged
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((state: boolean) => {
        this.isLoading = state;
      })
    this.portalSpinner = this.spinnerService.createComponentPortal();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public login(): void {
    this.authService.login(this.form.getRawValue());
  }
}
