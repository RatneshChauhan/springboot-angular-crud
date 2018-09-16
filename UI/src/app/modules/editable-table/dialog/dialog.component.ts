import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog, public dialogRef: MatDialogRef<DialogComponent>, ) { }

  ngOnInit() { }


  public delete() {
    this.close('delete')
  }

  public close(type: string) {

    if (type === 'delete') { // delete
      this.data['operation'] = 'deleted'
      this.dialogRef.close({
        data: this.data

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
