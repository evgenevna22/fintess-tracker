import { Component, OnInit, Input, Inject } from '@angular/core';
import { ISimpleDialog } from '../../interfaces/simple-dialog.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ISimpleDialog) { }

  ngOnInit() {
  }

}
