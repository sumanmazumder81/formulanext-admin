import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { VehicleListService } from '../../../services/vehicle-list.service';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements AfterViewInit {
  public loader :boolean = false;
  // table data send
  public pageTitle: string = "Vehicles CLASS LIST";
  public allTableData:any[];
  public tableHeaderData:any;

  public pageIndex: number = 1;
  public pageSize: number = 5;
  public dataLength: number;
  public searchString: string = '';

  displayedColumns: any[] = [
      {label: 'Id', key: 'id'},
      {label: 'Engine No', key: 'engineNo'},
      {label: 'Chassis No', key: 'chassisNo'},
      {label: 'Status', key: 'isActive'},
      {label: 'action', key: 'action'},
    ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vehicleListService :VehicleListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vehicleList(this.pageIndex, this.pageSize, this.searchString);
  }
  ngAfterViewInit() {
    // this.vehiclesTable.paginator = this.paginator;
  }
  applyFilter(event: Event) {
  }
  vehicleList(page, pageSize, searchString){
    this.vehicleListService.vehiclesSearchList(page, pageSize, searchString).subscribe(
      (success : any)=>{
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
  edit(id) {
    // console.log(id);
    this.router.navigate([`./dashboard/vehicles/vehicles/vehicleEntities/${id}`]);
  }
  delete(id){
    // alert("delete");
    this.loader = true;
    this.vehicleListService.vehiclesDelete(id).subscribe(
      (success)=>{
        // console.log(success);
        this.vehicleList(this.pageIndex, this.pageSize, this.searchString);
        this.loader = false;
      },(error)=>{
        console.log(error);
        
      }
    )
  }
  search(event){
    this.searchString = event;
    this.pageIndex = 1;
    this.vehicleList(this.pageIndex, this.pageSize, this.searchString);
  }
  setPagination(event: {pageIndex: number, pageSize: number}){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.vehicleList(event.pageIndex +1, event.pageSize, this.searchString);
  }
}

