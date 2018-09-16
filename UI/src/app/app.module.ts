// Angular 4 module
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
    
  MatButtonModule, MatIconModule, MatGridListModule,  MatCardModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home/app-home.component'
import { AppAboutComponent } from './app-about/app-about.component';

import { DataService } from './data.service';

import { AppRouter } from './app.routing';

// my module
import { EditableTableModule } from './modules/editable-table/editable-table.module'


@NgModule({
  declarations: [
    AppComponent,
    AppAboutComponent,
    AppHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRouter,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    EditableTableModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],

})

export class AppModule { }