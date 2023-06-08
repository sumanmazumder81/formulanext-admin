import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, NavigationExtras } from '@angular/router';
import { DriverService } from '../../../services/driver.service';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {
  // table data send
  public pageTitle: string = vendorEntityType.DRIVER;
  public allTableData:any;
  public loader : boolean = false;
  public pageIndex: number = 1;
  public pageSize: number = 5;
  public dataLength: number;
  public searchString: string = '';

  displayedColumns: any[] = [
      {label: 'Vendor Code', key: 'meta.VendorCode'},
      {label: 'Driver Name', key: 'userEntity.fullName'},
      {label: 'Contact No', key: 'userEntity.contact[0].[contactList][0].contactNo'},
      {label: 'Status', key: 'isActive'},
      {label: 'Action', key: 'action'},
    ];



  constructor(
    public router: Router,
    private driverService: DriverService,
    private routers: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.driverList(this.pageIndex, this.pageSize, this.searchString);
  }

  addDriver(driver){
    console.log(driver);
    let passData: NavigationExtras = {
      queryParams:{
        'brokerAdd': driver,
      }
    }
    this.router.navigate(['/dashboard/vendors/driver/driverCreate'], passData);
  }

  driverList(page, pageSize, searchString){
    this.driverService.driverSearchList(page, pageSize, searchString).subscribe(
      (success: any)=>{
        console.log(success);
        this.allTableData = success.result;
        this.allTableData.map(e=> {
          e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
          return e;
        })
        this.pageIndex = success.currentPage;
        this.pageSize = success.pageSize;
        this.dataLength = success.totalCount;
      },(error)=>{
        console.log(error);
        
      }
    )
  }
  delete(data){
    console.log(data);
    this.loader = true;
    this.driverService.driverDelete(data).subscribe(
      (success)=>{
        console.log(success);
        this.driverList(this.pageIndex, this.pageSize, this.searchString);
        this.loader = false;
        this.notification.showSuccess('Delete', 'Successfully');
      },(error)=>{
        console.log(error);
        
      }
    )
  }
  edit(id){
    // console.log(id);
    this.routers.navigate([`./dashboard/vendors/driver/driverCreate/${id}`])
  }
  search(event){
    this.searchString = event;
    this.pageIndex = 1;
    this.driverList(this.pageIndex, this.pageSize, event);
  }
  setPegination(event: {pageIndex: number, pageSize: number}){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.driverList(event.pageIndex +1, event.pageSize, this.searchString);
  }
}
