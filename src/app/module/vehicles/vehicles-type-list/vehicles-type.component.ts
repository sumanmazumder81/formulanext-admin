import { Component, OnInit } from '@angular/core';
import { VehiclesTypeService } from '../../../services/vehicles-type.service';
import { NavigationExtras, Router } from '../../../../../node_modules/@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-vehicles-type',
  templateUrl: './vehicles-type.component.html',
  styleUrls: ['./vehicles-type.component.scss']
})
export class VehiclesTypeComponent implements OnInit {

  // table data send
  public pageTitle: string = "Vehicles type list";
  public allTableData:any;
  public loader :boolean = false;
  displayedColumns: any[] = [
      {label: 'Id', key: 'id'},
      {label: 'Model', key: 'model'},
      {label: 'Capacity', key: 'meta.LoadCapacity'},
      {label: 'Dimension', key: 'dimension.Height'},
      {label: 'action', key: 'action'},
    ];

  constructor(
    private vehiclesTypeService : VehiclesTypeService,
    private _router: Router,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.vehicleTypeList();
  }


  vehicleTypeList(){
    this.vehiclesTypeService.VehiclesTypeList().subscribe(
      (success: any)=>{
        console.log(success);
        this.allTableData = success;
      },(error)=>{
        console.log(error);
      }
    )
  }
  delete(data){
    console.log(data);
    this.loader = true;
    this.vehiclesTypeService.vehiclesTypeDelete(data).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Delete', 'Successfully');
        this.vehicleTypeList();
      },(error)=>{
        console.log(error);
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }
  edit(id){
    console.log(id);
    // let navigateId: NavigationExtras = {
    //   queryParams:{
    //     vehiclesTypeId: id,
    //   }
    // }
    this._router.navigate([`/dashboard/vehicles/vehiclesType/typeEntity/${id}`]);
    // this._router.navigate(['/dashboard/vehicles/vehiclesType/typeEntity'], navigateId)
  }

}
