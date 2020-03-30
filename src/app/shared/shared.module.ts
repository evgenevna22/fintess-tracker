import { NgModule } from '@angular/core';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PortalModule } from '@angular/cdk/portal';

const MODULES = [
  MaterialModule,
  FormsModule,
  FlexLayoutModule,
  MaterialModule,
  ReactiveFormsModule,
  PortalModule
];

const COMPONENTS = [
  SimpleDialogComponent,
  SpinnerComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  entryComponents: [
    SimpleDialogComponent,
    SpinnerComponent
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ],
})
export class SharedModule {}