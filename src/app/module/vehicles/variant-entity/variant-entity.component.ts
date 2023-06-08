import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehiclesVariantService } from '../../../services/vehicles-variant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';


@Component({
  selector: 'app-variant-entity',
  templateUrl: './variant-entity.component.html',
  styleUrls: ['./variant-entity.component.scss']
})
export class VariantEntityComponent implements OnInit {
  public varientId: any;
  public loader: boolean = false;
  public vehiclesVariantFrom : FormGroup = new FormGroup({
    name : new FormControl('',  Validators.required),
    meta: new FormControl('',),
  });
  constructor(
    private vehiclesVariantService : VehiclesVariantService,
    private _router: Router,
    private activeRouter: ActivatedRoute,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.varientId = this.activeRouter.snapshot.paramMap.get('id');
    if(this.varientId){
      this.getUrl();
    }
  }
  vehiclesVariantAdd(){
    this.loader = true;
    console.log(this.vehiclesVariantFrom.value);
    this.vehiclesVariantService.vehiclesVariantAdd(this.vehiclesVariantFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Add', 'Successfully');
        this._router.navigateByUrl('dashboard/vehicles/vehiclesVariant/vehiclesVariantList')
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
  getUrl(){
    this.loader = true;
    this.vehiclesVariantService.vehiclesVariantGetData(this.varientId).subscribe(
      (success: any)=>{
        this.loader = false;
        console.log(success);
          this.vehiclesVariantFrom.patchValue(success);
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
  editVarient(){
    this.loader = true;
    Object.assign(this.vehiclesVariantFrom.value, {'id': parseInt(this.varientId) });
    console.log(this.vehiclesVariantFrom.value);
    this.vehiclesVariantService.vehiclesVariantEdit(this.varientId, this.vehiclesVariantFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Update', 'Successfully');
        this._router.navigateByUrl('dashboard/vehicles/vehiclesVariant/vehiclesVariantList');
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
}
