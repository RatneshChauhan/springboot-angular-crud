import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from './dialog/dialog.component'

export interface Data {
  operation: string;
  data: [string];
}

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

  //Parent to Child
  @Input() data: any;
  @Input() columns: any
  @Input() editableColumns: any;
  @Input() pageSizeOptions: [string];
  @Input() notification: any;
  @Input() searchable: boolean;
  @Input() maxChar: number;

  //Child to Parent
  @Output() action = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  

   displayedColumns: string[] = null
   editableFields = [];
   paginationOptions = [];
   readonly notifier: NotifierService;
   k: number;
   rowData: Data;
   isSearchable: boolean;
   selectedRowIndex: number = -1;
   maxCharsInColumn:number;
   message:string;

  dataSource = new MatTableDataSource(null);
  constructor(public dialog: MatDialog, notifierService: NotifierService,  private spinner: NgxSpinnerService) {
    this.notifier = notifierService
  }

  ngOnInit() {
    // assign data from Parent component set by the users
    this.displayedColumns = this.columns // columns
    this.dataSource.data = this.data // data
    this.editableFields = this.editableColumns // editable columns
    this.paginationOptions = this.pageSizeOptions // page size options
    this.dataSource.paginator = this.paginator // pagination
    this.dataSource.sort = this.sort; // sorting
    this.isSearchable = this.searchable; // search
    this.maxCharsInColumn = this.maxChar;
  }

  // Search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   openEdit(rowData: any, i: number) {
    this.k = i
    this.highlight(rowData)
  }

   closeEdit() {
    this.k = -1
    this.selectedRowIndex = -1;
  }

   doneEdit(rowData: any) {
    
    rowData["operation"] = 'updated';
    this.spinner.show();
    this.action.emit(rowData);
    
    if (this.notification && this.notification.length > 0)
      this.UI_notifications(this.notification[0], this.notification[1]);
    else
      this.UI_notifications('', 'Update action completed!'); // default update notification

     
  }

   openDialog(rowData: any): void { //open a pop up for delete confirmation
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: rowData
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.data && result.data.operation === 'deleted') { //doneDelete
        
        this.action.emit(result.data);
        this.removeFromArray(result.data)
        if (this.notification && this.notification.length > 0)
          this.UI_notifications(this.notification[0], this.notification[1]);
        else
          this.UI_notifications('', 'Delete action completed!');// default delete notification
      }

    });
  }

   removeFromArray(elementToBeDeleted: string) {
    const index: number = this.data.indexOf(elementToBeDeleted);
    if (index !== -1) {
      this.data.splice(index, 1); // remove element
      this.dataSource.data = this.data; // update table
    }
  }

  // Highlight row on edit click
  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  // UI toast notifications
   UI_notifications(status: string, message: string) {
    setTimeout(() => {
      /** spinner ends after 1 seconds */
    this.spinner.hide();
    this.closeEdit()
    this.notifier.notify(status, message);
  }, 1000);
    
  }
}
