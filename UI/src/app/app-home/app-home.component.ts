import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Customer } from 'src/app/customer';


export interface tableData {
  firstName: string;
  id: number;
  updatedAt: string;
  createdAt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styles: [``]
})
export class AppHomeComponent implements OnInit {

  constructor(private service: DataService) { }
  private dataLoaded: boolean;
  private tableData: any
  private yourMessage = []

  ngOnInit() {

    this.get();

  }

  private get() {
    this.service.get_customers().subscribe(data => {
      this.tableData = data;
      this.dataLoaded = true;
    });
  }
  private create(customer: Customer) {
    this.service.add_customer(customer).subscribe(data => {
      this.get(); 
      
    });
  }
  private update(customer: Customer) {
    this.service.update_customer(customer).subscribe(data => {
     
    });
  }
  private delete(id: number) {
    this.service.delete_customer(id).subscribe(data => {
     
    });
  }

  private action(row: any) {

    if (row.operation === 'added') {
      this.create(row);
      this.yourMessage.push('success', row.firstName + ' has been added successfully!')
      this.yourMessage = []
    }
    if (row.operation === 'updated') {
      this.update(row);
      this.yourMessage.push('success', row.firstName + ' has been updated successfully!')
      this.yourMessage = []
    }
    if (row.operation === 'deleted') {
      this.delete(row.id);
      this.yourMessage.push('success', ' has been deleted successfully!')
      this.yourMessage = []
    }

  }
}