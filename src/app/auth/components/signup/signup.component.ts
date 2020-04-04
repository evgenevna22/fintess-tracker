import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { takeUntil, map } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/components/spinner/spiner.service';
import { Subject, Observable } from 'rxjs';
import { UIService } from 'src/app/shared/services/ui-helper.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/shared/interfaces/app-state.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public maxDate: Date;
  public portalSpinner: ComponentPortal<SpinnerComponent>;
  public isLoading$: Observable<boolean>;

  private unsubscribe: Subject<void> = new Subject<void>();

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly spinnerService: SpinnerService,
    private readonly store: Store<{ ui: IAppState }>
  ) {}

  ngOnInit() {
    this.buildForm();
    this.isLoading$ = this.store.pipe(map((state: { ui: IAppState }) => state.ui.isLoading));
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // this.uiService.loadingStateChanged
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe((state: boolean) => {
    //     this.isLoading = state;
    //   })
    this.portalSpinner = this.spinnerService.createComponentPortal();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Sign up new user
   */
  public signUp(): void {
    this.authService.registerUser(this.form.getRawValue());
  }

  /**
   * Build form
   */
  private buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      birthdate: new FormControl(null, Validators.required),
      agreement: new FormControl(null, Validators.required),
    });
  }
}
