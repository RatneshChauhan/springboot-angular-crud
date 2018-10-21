import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  ValidatorFn,
  Validator,
  FormGroup,
  FormControl,
  NG_VALIDATORS
} from '@angular/forms'
export interface DialogData {
  operation: string;
  data: [string];
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogComponent>, ) { }


  addupForm: FormGroup;

  ngOnInit() {
    this.addupForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      updatedAt: new FormControl(),
      createdAt: new FormControl()

    })
  }

  public delete() {
    this.close('delete')
  }
  public add() {
    this.close('add')
  }

  public close(type: string) {
    if (type === 'delete') { // delete
      this.data['operation'] = 'deleted'
      this.dialogRef.close({
        data: this.data
      });
    }
    else if (type === 'add') { // add
      this.dialogRef.close({
        data: {
          'firstName': this.addupForm.value.firstName,
          'lastName': this.addupForm.value.lastName,
          'createdAt': this.addupForm.value.createdAt,
          'updatedAt': this.addupForm.value.updatedAt,
          'operation':'added'

        }
      });
    }
    else { // close
      this.dialogRef.close({
        data: null,
        operation: 'closed'

      });
    }
  }
}
