import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VehicleBrandService } from '../../../services/vehicle-brand.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-brand-entities',
  templateUrl: './brand-entities.component.html',
  styleUrls: ['./brand-entities.component.scss']
})
export class BrandEntitiesComponent implements OnInit {
  public brandId : string;
  public loader: boolean = false;
  public brandFrom:  FormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      meta: new FormControl(null),
  });
  constructor(
    private vehicleBrandService: VehicleBrandService,
    private _router: Router,
    private activeRouter: ActivatedRoute,
    private notification: NotificationService
  ) { 
    
  }

  ngOnInit(): void {
    this.getUrl();
  }
  saveBrandAdd(){
    this.loader = true;
    console.log(this.brandFrom.value);
    this.vehicleBrandService.brandAdd(this.brandFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Add', 'Successfully');
        this._router.navigateByUrl('/dashboard/vehicles/vehiclesBrand/vehiclesBrandList')
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
  getUrl(){
    this.brandId = this.activeRouter.snapshot.paramMap.get('id');
    if(this.brandId){
      this.loader = true;
      this.vehicleBrandService.brandGetData(this.brandId).subscribe(
        (success: any)=>{
          console.log(success);
          this.loader = false;
          this.brandFrom.patchValue(success);
        },(error)=>{
          console.log(error);
          this.loader = false;
        }
      )
    }
  }
  editBrand(){
    this.loader = true;
    Object.assign(this.brandFrom.value, {'id': parseInt(this.brandId) });
    console.log(this.brandFrom.value);
    this.vehicleBrandService.brandEdit(this.brandId, this.brandFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Update', 'Successfully');
        this._router.navigateByUrl('dashboard/vehicles/vehiclesBrand/vehiclesBrandList');
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
}
