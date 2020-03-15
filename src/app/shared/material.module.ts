import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const MODULES = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class MaterialModule {}
