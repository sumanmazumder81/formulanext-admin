import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { VehicleListService } from '../../services/vehicle-list.service';
import { Router } from '../../../../node_modules/@angular/router';
import { OwnerListService } from '../../services/owner-list.service';
import { DriverService } from '../../services/driver.service';
@Component({
  selector: 'app-owner-vehicles',
  templateUrl: './owner-vehicles.component.html',
  styleUrls: ['./owner-vehicles.component.scss']
})
export class OwnerVehiclesComponent implements OnInit {
  public pageTitle: string = "";
  public allTableData:any[];
  public tableHeaderData:any;
  public pageIndex: number = 1;
  public pageSize: number = 5;
  public dataLength: number;
  public searchString: string = '';
  displayedColumnsDriver: any[] = [];
  displayedColumnsVehicles: any[] = [];
  public refereshArray : any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public getTableData : any[] = [];
  public loader: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleListService :VehicleListService,
    private router: Router,
    private OwnerListService: OwnerListService,
    public dialogRef: MatDialogRef<OwnerVehiclesComponent>,
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data.type === 'Driver'){
      console.log("Driver api call");
      this.ownerRelatedDriverList(this.pageIndex, this.pageSize, this.searchString);
      this.pageTitle = "Driver List";
      this.displayedColumnsDriver = [
        {label: 'Select', key: 'checkBox'},
        {label: 'Vendor Code', key: 'meta.VendorCode'},
        {label: 'Driver Name', key: 'userEntity.fullName'},
        {label: 'Contact Number', key: 'userEntity.contact[0]contactList[0].contactNo'},
        {label: 'Status', key: 'isActive'},
      ];
    }
    if(this.data.type === 'Vehicle'){
      this.ownerRelatedVehicleList(this.pageIndex, this.pageSize, this.searchString);
      this.displayedColumnsVehicles = [
        {label: 'Select', key: 'checkBox'},
        {label: 'Id', key: 'id'},
        {label: 'Engine No', key: 'engineNo'},
        {label: 'Contact Number', key: 'userEntity.contact[0]contactList[0].contactNo'},
        {label: 'Status', key: 'isActive'},
      ]
      console.log("Vehicles api call");
      this.pageTitle = "Vehicle List";
    }
  }
  //vehicle list call
  ownerRelatedVehicleList(page, pageSize, searchString){
    this.vehicleListService.ownerRelatedVehiclesListSearch(page, pageSize, searchString).subscribe(
      (success : any)=>{
        console.log(success);
        this.allTableData = success.result;
        console.log(this.allTableData);
        // this.data.data.forEach(element => {
        //   return this.getTableData.push(element.id);
        // });

        // this.refereshArray = success.result.filter((element:any)=>{
        //   console.log(this.data.data, element.id);
        //   console.log(this.data.data.includes(element.id));
        //   return !this.data.data.includes(element.id);
        // });
        // console.log(this.refereshArray.length);        
        // this.allTableData = this.refereshArray;
        // console.log(this.refereshArray);
        this.allTableData.map(e=> {
          e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
          return e;
        });
        this.pageIndex = success.currentPage;
        this.pageSize = success.pageSize;
        this.dataLength = success.totalCount;
      },(error)=>{
        console.log(error);
      }
    )
  }

  // Driver list call
  ownerRelatedDriverList(page, pageSize, searchString){
    this.driverService.ownerRelatedDriverListSearch(page, pageSize, searchString).subscribe(
      (success : any)=>{
        console.log(success);
        this.allTableData = success.result;
        console.log(this.allTableData);
        this.allTableData.map(e=> {
          e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
          return e;
        });
        this.pageIndex = success.currentPage;
        this.pageSize = success.pageSize;
        this.dataLength = success.totalCount;
      },(error)=>{
        console.log(error);
      }
    )
  }
  search(event){
    this.searchString = event;
    this.pageIndex = 1;
    if(this.data.type === 'Driver'){
      this.ownerRelatedDriverList(this.pageIndex, this.pageSize, this.searchString);
    }else{
      this.ownerRelatedVehicleList(this.pageIndex, this.pageSize, this.searchString);
    }
  }
  setPagination(event: {pageIndex: number, pageSize: number}){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.ownerRelatedVehicleList(event.pageIndex +1, event.pageSize, this.searchString);
    this.ownerRelatedDriverList(event.pageIndex +1, event.pageSize, this.searchString);
  }
  driveruserEntityDelete(data){
    console.log(data);    
    if(data.status === true){
      this.data.data.push(data.id);
      console.log(this.data.data);      
    }else if(data.status === false){
      this.data.data.splice(this.data.data.indexOf(data.id), 1);
    }
  }
  submitData(){
    this.loader = true;
    this.OwnerListService.updateRelatedEntitiys(this.data.data, this.data.id, this.data.type, ).subscribe(
      (success:any)=>{
        console.log(success);
        this.loader = false;
        this.dialogRef.close();
      },(error:any)=>{
        console.log(error);
        this.loader = false;
        this.dialogRef.close();    
      },()=>{
        this.loader = false;
        this.dialogRef.close();
      }
    )
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
