import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableTableComponent } from './editable-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatDialogModule,
  MatButtonModule, MatIconModule, MatGridListModule, MatSortModule, MatCardModule, MatTooltipModule
} from '@angular/material';

// https://www.npmjs.com/package/angular-notifier
import { NotifierModule } from 'angular-notifier';
// https://www.npmjs.com/package/ngx-spinner#demo
import { NgxSpinnerModule } from 'ngx-spinner';

import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatDialogModule,
    MatButtonModule, MatIconModule, MatGridListModule, MatSortModule, MatCardModule, MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({
      // Custom options in here
    }),
  ],
  declarations: [EditableTableComponent, DialogComponent],
  exports: [
    EditableTableComponent,
  ],
  entryComponents: [DialogComponent]

})
export class EditableTableModule { }
