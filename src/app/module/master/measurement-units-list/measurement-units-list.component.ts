import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { MeasurementUnitsService } from '../../../services/measurement-units.service';

import { NavigationExtras, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-measurement-units-list',
  templateUrl: './measurement-units-list.component.html',
  styleUrls: ['./measurement-units-list.component.scss']
})
export class MeasurementUnitsListComponent implements OnInit {
  
  public pageTitle:string = "MEASUREMENT UNIT LIST";
  public allTableData:any;
  public loader: boolean = false;
  
  displayedColumns: any[] = [
    {label: 'Id', key: 'id'},
    {label: 'Unit', key: 'unit'},
    {label: 'Action', key: 'action'},
  ];

  constructor(
    private measurementUnitsService : MeasurementUnitsService,
    private _router: Router,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.measurementUnitsList();
  }

  measurementUnitsList(){
    this.measurementUnitsService.measurementUnitsList().subscribe(
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
    this.loader = true;
    this.measurementUnitsService.measurementUnitsdelete(id).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Delete', 'Successfully');
        this.measurementUnitsList();
      },(error)=>{
        console.log(error);
        this.loader = false;
        
      }
    )
    
  }
  edit(id){
    console.log(id);
    // let navigateId: NavigationExtras = {
    //   queryParams:{
    //     measurementId: id,
    //   }
    // }
    this._router.navigate([`/dashboard/master/measurementUnits/measurementUnitsEntity/${id}`]);
    // this._router.navigate(['/dashboard/master/measurementUnits/measurementUnitsEntity'], navigateId)
  }
}
