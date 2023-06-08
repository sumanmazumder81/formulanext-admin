import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { VehicleBrandService } from '../../../services/vehicle-brand.service';
import { NavigationExtras, Router } from '../../../../../node_modules/@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-vehicles-brand',
  templateUrl: './vehicles-brand.component.html',
  styleUrls: ['./vehicles-brand.component.scss']
})
export class VehiclesBrandComponent implements OnInit  {
  // table data send
  public pageTitle: string = "Vehicles brand list";
  public allTableData:any;
  public loader :boolean = false;
  displayedColumns: any[] = [
    {label: 'Id', key: 'id'},
    {label: 'Name', key: 'name'},
    // {label: 'Date', key: 'updatedDate'},
    {label: 'Action', key: 'action'},
  ];

  constructor(
    private vehicleBrandService: VehicleBrandService,
    private _router: Router,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.brandList();
  }

  brandList(){
    this.vehicleBrandService.brandList().subscribe(
      (success:any)=>{
        console.log(success);
        this.allTableData = success;
        this.loader = false;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
  
  delete(data){
    console.log(data);
    this.loader =true;
    this.vehicleBrandService.brandDelete(data).subscribe(
      (success)=>{
        console.log(success);
        this.notification.showSuccess('Delete', 'Successfully');
        this.brandList();
        this.loader = false;
      },(error)=>{
        console.log(error);
        this.loader =false;
      },()=>{
        this.loader =true;
      }
    )
  }
  edit(id){
    console.log(id);
    this._router.navigate([`./dashboard/vehicles/vehiclesBrand/brandEntities/${id}`]);
  }
}
