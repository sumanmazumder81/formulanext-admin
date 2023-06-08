import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MeasurementUnitsService } from '../../../services/measurement-units.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-measurement-units-entity',
  templateUrl: './measurement-units-entity.component.html',
  styleUrls: ['./measurement-units-entity.component.scss']
})
export class MeasurementUnitsEntityComponent implements OnInit {
  public loader: boolean = false;
  public measurementUnitFrom : FormGroup = new FormGroup({
    unit: new FormControl('', Validators.required),
    meta: new FormControl('',),
  });
  public measurementId: string;
  constructor(
    private measurementUnitsService : MeasurementUnitsService,
    private _router: Router,
    private activeRouter: ActivatedRoute,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUrl();
  }
  measurementUnitAdd(){
    console.log(this.measurementUnitFrom.value);
    this.loader = true;
    this.measurementUnitsService.measurementUnitsAdd(this.measurementUnitFrom.value).subscribe(
      (success:any)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Add', 'Successfully');
        this._router.navigateByUrl('dashboard/master/measurementUnits/measurementUnitsList');
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }

  getUrl(){
    this.measurementId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.measurementId);    
    if(this.measurementId){
      this.loader = true;
      this.measurementUnitsService.measureMentGetData(this.measurementId).subscribe(
        (success: any)=>{
          this.measurementUnitFrom.patchValue(success);
          this.loader = false;
        },(error)=>{
          console.log(error);
          this.loader = false;
        },()=>{
          this.loader = false;
        }
      )
    }
    // this.activeRouter.queryParams.subscribe(
    //   (passdata)=>{
    //     console.log(passdata.measurementId);
    //     this.measurementId = passdata.measurementId;
        
    //   }
    // )
  }
  
  editMeasurementUnit(){
    this.loader = true;
    Object.assign(this.measurementUnitFrom.value, {'id': parseInt(this.measurementId) });
    console.log(this.measurementUnitFrom.value);
    this.measurementUnitsService.measurementUnitsEdit(this.measurementId, this.measurementUnitFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Update', 'Successfully');
        this._router.navigateByUrl('dashboard/master/measurementUnits/measurementUnitsList');
      },(error)=>{
        console.log(error);
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }
}
