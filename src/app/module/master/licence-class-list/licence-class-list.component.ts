import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { MeasurementUnitsService } from '../../../services/measurement-units.service';
import { LicenceClassService } from '../../../services/licence-class.service';

import { NavigationExtras, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-licence-class-list',
  templateUrl: './licence-class-list.component.html',
  styleUrls: ['./licence-class-list.component.scss']
})
export class LicenceClassListComponent implements AfterViewInit, OnInit {
  // table data send
  public pageTitle: string = "LICENCE CLASS LIST";
  public allTableData:any;
  public tableHeaderData:any;
  public loader: boolean = false;

  // loader
  // public loader:boolean = true;
  // public paginationData: number;
  // public columns : any;
  

  displayedColumns: any[] = [
    {key: 'id', label: "Id"},
    {key: 'className', label: "Class Name"},
    {key: 'isActive', label: "Status"},
    {key: 'associatedWeight', label: "Associated Weight"},
    {key: 'action', label: "Action"},
  ];
  licenceClassTable = new MatTableDataSource<interfacTableData>(tableData);
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private licenceClassService: LicenceClassService,
    private _router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.licenceList();
    // this.onChangePage(event);
    // this.columns = this.displayedColumns.length;
    // this.tableHeaderData = this.displayedColumns;
    
    // console.log(this.tableId);
    
  }

  licenceList(){
    this.licenceClassService.licenceClassList().subscribe(
      (success: any)=>{
        this.allTableData = success;
        // this.loader = false;
        this.licenceClassTable = new MatTableDataSource<interfacTableData>(success);
        this.licenceClassTable.sort = this.sort;
        this.licenceClassTable.paginator = this.paginator;
      },(error)=>{
        console.log(error);
      }
    )
  }
  // onChangePage($event){
  //   console.log($event.pageSize);
  //   this.paginationData = $event.pageSize;
  // }
  ngAfterViewInit() {
    this.licenceClassTable.paginator = this.paginator;
    // table data send
    // this.paginationData = this.paginator.pageSize;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.licenceClassTable.filter = filterValue.trim().toLowerCase();
  }

  edit(id){
    console.log(id);
    // let passData: NavigationExtras = {
    //   queryParams:{
    //     'licenceClassId': id,
    //   }
    // }
    this._router.navigate([`/dashboard/master/licenceClass/licenceClassEntity/${id}`]);
  }
  delete(data){
    console.log(data);
    this.loader = true;
    this.licenceClassService.licenceClassDelete(data).subscribe(
      (success:any)=>{
        // alert("success");
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Delete', 'Successfully');
        this.licenceList();
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
}

export interface interfacTableData {
  id: number;
  className: string;
  status: boolean;
  associatedWeight: number
}
const tableData: interfacTableData[] = [
  // {id: 1, name: 'Hydrogen'},
];
