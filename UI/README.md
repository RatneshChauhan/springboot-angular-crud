## Editable Data Table Module

Angular4 Editable Data Table: A reusable module which can be consumed like any other Angular modules.
===========================================

Git repo
=================

https://github.com/RatneshChauhan/springboot-angular

How to get it
=================
You can get editable data table via npm by running the following command to add it as a new dependency to your package.json file and import it in your module

<pre>npm install angular-editable-table</pre>

<code>import { EditableTableModule } from 'angular-editable-table'
 
@NgModule( {
  imports: [
    EditableTableModule
  ]
} )
</code>

Prerequisites
================

*	BrowserAnimationsModule in your app module (Generally, 'app.module.ts')

<pre> import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; </pre>

Usage
=============

*	Add this in your component's template file wherein you want to display it

```html
<div *ngIf="dataLoaded">
<app-editable-table 
  [columns]="['id','firstName','lastName','createdAt','updatedAt', 'Actions']"
  [editableColumns]="['firstName','lastName','class','level']"
  [data]="tableData" 
  [pageSizeOptions]="[5,6,9,12,20,50,100]" 
  [searchable]="true" 
  (action)="action($event)"
  [notification]="yourMessage"
  [maxChar]="23">
</app-editable-table>
</div>
```

*	Description

<pre>
* columns : Columns to be added to the table (see sample data below, make sure json keys matches the names of your columns in table)
* editableColumns : Columns which are editable (see sample data below, make sure json keys matches the names of your columns in table)
* data : Data to be displayed in table (see sample data below, make sure json keys matches the names of your columns in table)
* pageSizeOptions : Pagination options
* searchable : To add a search input to make the data searchable (default is false)
* action : A call back function which will be called after each actions like edit or delete
* notification : Add your custom message to be displayed as a notification after an action is performed on the table.
* maxChar : Maximum characters allowed in a column
</pre>

*	Sample data

<pre>
interface tableData {
  id:number,
  firstName:string;
  createdAt:Date;
  updatedAt:Date;
}

const CUSTOMER_DATA: tableData[] = [
  {id: 1, firstName: 'Ratnesh', updatedAt: new Date(), createdAt: new Date()},
  {id: 2, firstName: 'Zing', updatedAt: new Date(), createdAt: new Date()},
  {id: 3, firstName: 'Greg', updatedAt: new Date(), createdAt: new Date()},
  {id: 4, firstName: 'Sana', updatedAt: new Date(), createdAt: new Date()},
  {id: 5, firstName: 'Neha', updatedAt: new Date(), createdAt: new Date()},
  {id: 6, firstName: 'Kiran', updatedAt: new Date(), createdAt: new Date()},
  {id: 7, firstName: 'John', updatedAt: new Date(), createdAt: new Date()},
  {id: 8, firstName: 'Engliue', updatedAt: new Date(), createdAt: new Date()},
  {id: 9, firstName: 'Marina', updatedAt: new Date(), createdAt: new Date()},
  {id: 10, firstName: 'Vivek', updatedAt: new Date(), createdAt: new Date()},
];
</pre>

*	Add this in your component's typescript file

1. Add variables to be passed to the table

<pre>
  private dataLoaded: boolean;
  private tableData: any
  private yourMessage = []
</pre>

2.  Assign data to table and set dataLoaded to true

<pre>
  tableData = CUSTOMER_DATA;
  dataLoaded=true;
</pre>

3.  Add call back function

<pre>
  private action(row: any) {
  if (row.operation === 'updated') {
  this.update(row); // This is your update call to API
  this.yourMessage.push('success','updated successfully') // Show update success notification
  this.yourMessage = []; // make sure you empty it
  }
  
  if (row.operation === 'deleted') {
  this.delete(row.id); // This is your delete call to API
  this.yourMessage.push('success','deleted successfully') // Show delete success notification
  this.yourMessage = []; // make sure you empty it
  }
  }
</pre>

Add Styling
=======================================
1.	Create a file called theming.scss in src and add the following content in it (feel free to modify per your requirements)

<pre>
@import '~@angular/material/theming';
@import '~material-design-icons/iconfont/material-icons.css';
@import '~angular-notifier/styles.scss';
@include mat-core();

$primary: mat-palette($mat-light-blue);
$accent:  mat-palette($mat-teal);

$theme: mat-light-theme($primary, $accent);

@include angular-material-theme($theme);
</pre>

2.	Open your application's angular.json and add this theming.scss file in it after style.css

<pre>
"styles": [
"src/styles.css",
"src/theming.scss"
          ],
</pre>

Complete source code and working example is here 
=================================================

https://github.com/RatneshChauhan/springboot-angular

Author
===============
Ratnesh Chauhan, Full Stack Developer

License
======================
The MIT License (MIT)

Copyright (c) 2018 Ratnesh Chauhan

Permission is hereby granted, free of charge, to any person obtaining a copy of this application and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.


