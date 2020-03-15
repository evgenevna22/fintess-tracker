import { NgModule } from '@angular/core';
import { SimpleDialogComponent } from './components/simple-dialog/simple-dialog.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

const MODULES = [
  MaterialModule,
  FormsModule,
  FlexLayoutModule,
  MaterialModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    SimpleDialogComponent
  ],
  imports: [
    ...MODULES
  ],
  entryComponents: [
    SimpleDialogComponent
  ],
  exports: [
    ...MODULES,
    SimpleDialogComponent,
  ],
})
export class SharedModule {}