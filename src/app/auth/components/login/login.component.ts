import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spiner.service';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { IAppState } from 'src/app/shared/interfaces/app-state.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public portalSpinner: ComponentPortal<SpinnerComponent>;
  public isLoading$: Observable<boolean>;

  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly spinnerService: SpinnerService,
    private readonly store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.buildForm();
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    this.portalSpinner = this.spinnerService.createComponentPortal();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Login
   */
  public login(): void {
    this.authService.login(this.form.getRawValue());
  }

  /**
   * Build form
   */
  private buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
}
