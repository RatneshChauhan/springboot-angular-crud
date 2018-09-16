import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppHomeComponent } from './app-home/app-home.component';
import { AppAboutComponent } from './app-about/app-about.component';


const routes : Routes = [
    { path:'', redirectTo:'/home', pathMatch:'full'},
    { path:'home', component:AppHomeComponent},
    { path:'about', component:AppAboutComponent },
    
]

@NgModule({
    imports : [ RouterModule.forRoot( routes ) ] ,
    exports : [ RouterModule ]
})

export class AppRouter{ }