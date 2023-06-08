import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';


import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NavigationExtras, Router } from '@angular/router';
import { BrokerService } from '../../../services/broker.service';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-broker-list',
  templateUrl: './broker-list.component.html',
  styleUrls: ['./broker-list.component.scss']
})
export class BrokerListComponent implements OnInit {
  // table data send
  public pageTitle: string = vendorEntityType.BROKER;
  public allTableData:any;
  public loader : boolean = false;
  public pageIndex: number = 1;
  public pageSize: number = 5;
  public dataLength: number;

    displayedColumns: any[] = [
      {label: 'Vendor Code', key: 'meta.VendorCode'},
      {label: 'Broker Name', key: 'userEntity.fullName'},
      {label: 'Contact No', key: 'userEntity.contact[0].contactList[0].contactNo'},
      {label: 'Status', key: 'isActive'},
      {label: 'Action', key: 'action'},
    ];

    
  public searchString: string = '';

  constructor(
    private routers: Router,
    private brokerService : BrokerService,
    private notification: NotificationService
  ) { }
  // dataSource = ELEMENT_DATA;
  // clickedRows = new Set<tableData>();

  
  ngOnInit(): void {
    this.brokerList(this.pageIndex, this.pageSize, this.searchString);
  }


  brokerList(page, pageSize, searchString){
    this.brokerService.brokerSearchList(page, pageSize, searchString).subscribe(
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
      }, (error)=>{
        console.log(error);
      }
    )
  }
  added(added){
    let passData: NavigationExtras = {
      queryParams:{
        'brokerAdd': added,
      }
    }
    this.routers.navigate(['/dashboard/vendors/broker/brokerCreate'], passData)
  }
  delete(id){
    console.log(id);
    this.loader = true;
    this.brokerService.brokerDelete(id).subscribe(
      (success) => {
        console.log(success);
        this.brokerList(this.pageIndex, this.pageSize, this.searchString);
        this.loader = false;
        this.notification.showSuccess('Delete', 'Successfully');
      },
      (error) => {
        console.log(error);
      }
    )
  }
  edit(id){
    // console.log(id);
        this.routers.navigate([`./dashboard/vendors/broker/brokerCreate/${id}`]);
  }
  search(event){
    this.searchString = event;
    this.pageIndex = 1;
    this.brokerList(this.pageIndex, this.pageSize, event);
  }
  setPegination(event: {pageIndex: number, pageSize: number}){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.brokerList(event.pageIndex +1, event.pageSize, this.searchString);
  }
}
