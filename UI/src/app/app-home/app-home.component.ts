import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { Customer } from 'src/app/customer';


export interface tableData {
  firstName: string;
  id: number;
  updatedAt: string;
  createdAt: string;
}

const ELEMENT_DATA: tableData[] = [
  {id: 1, firstName: 'Ratnesh', updatedAt: '10-July-2018', createdAt: '10-July-2000'},
  {id: 2, firstName: 'Helen', updatedAt: '09-March-2017', createdAt: '10-May-2010'},
  {id: 3, firstName: 'John', updatedAt: '01-April-2018', createdAt: '10-January-2018'},
  {id: 4, firstName: 'Adam', updatedAt: '11-December-2011', createdAt: '11-August-2007'},
  {id: 5, firstName: 'Boron', updatedAt: '01-June-2018', createdAt: '13-August-2017'},
  {id: 6, firstName: 'Greg Joe', updatedAt: '11-August-1991', createdAt: '11-August-1983'},
  {id: 7, firstName: 'Inerty', updatedAt: '12-August-2017', createdAt: '22-May-2011'},
  {id: 8, firstName: 'Kiran Y', updatedAt: '22-August-2015', createdAt: '11-August-2000'},
  {id: 9, firstName: 'Matt', updatedAt: '11-August-2014', createdAt: '29-August-2013'},
  {id: 10, firstName: 'Rahul', updatedAt: '19-August-2017', createdAt: '11-August2017'},
];

@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styles: [``]
})
export class AppHomeComponent implements OnInit {

  constructor(private service: DataService) { }
  //  private dataLoaded: boolean;
  //  private tableData: any
    private yourMessage = []

   dataLoaded=true;
   tableData = ELEMENT_DATA;

  ngOnInit() {
   
    this.service.get_customers().subscribe(data => {
    //  this.tableData = data;
      //this.dataLoaded = true;
    });

  }

  private update(customer: Customer) {
    this.service.update_customer(customer).subscribe(data => {
      this.yourMessage.push('success', customer.firstName + ' has been updated successfully!')
      this.yourMessage = []
    });
  }
  private delete(id: number) {
    this.service.delete_customer(id).subscribe(data => {
      this.yourMessage.push('success', ' has been deleted successfully!')
      this.yourMessage = []
    });
  }

  private action(row: any) {
    this.yourMessage.push('success', row.firstName + ' has been updated successfully!')
    this.yourMessage = []
    if (row.operation === 'updated') {
      this.update(row);
    }
    if (row.operation === 'deleted') {
      this.delete(row.id);
    }

  }
}