import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';

import { VehiclesVariantService } from '../../../services/vehicles-variant.service';
import { NavigationExtras, Router } from '../../../../../node_modules/@angular/router';
@Component({
  selector: 'app-vehicles-variant',
  templateUrl: './vehicles-variant.component.html',
  styleUrls: ['./vehicles-variant.component.scss']
})
export class VehiclesVariantComponent implements OnInit {
  // table data send
  public pageTitle: string = "Vehicles variant list";
  public allTableData:any;

  displayedColumns: any[] = [
      {label: 'Id', key: 'id'},
      {label: 'Name', key: 'name'},
      {label: 'action', key: 'action'},
    ];
  vehiclesVarientTable = new MatTableDataSource<interfacTableData>(tableData);

  constructor(
    private vehiclesVariantService: VehiclesVariantService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.vehiclesVariantList();
  }
  
  ngAfterViewInit() {
    // this.vehiclesVarientTable.paginator = this.paginator;
  }
  

  vehiclesVariantList(){
    this.vehiclesVariantService.vehiclesVariantList().subscribe(
      (success:any)=>{
        console.log(success);
        this.allTableData = success;
      },(error)=>{
        console.log(error);
        
      }
    )
  }
  delete(id){
    console.log(id);
    
    this.vehiclesVariantService.vehiclesVariantDelete(id).subscribe(
      (success)=>{
        console.log(success);
        this.vehiclesVariantList();
      },(error)=>{
        console.log(error);
        
      }
    )
  }
  edit(id){
    this._router.navigate([`/dashboard/vehicles/vehiclesVariant/variantEntity/${id}`])
  }
}

export interface interfacTableData {
  id: number;
  name: string;
}
const tableData: interfacTableData[] = [];