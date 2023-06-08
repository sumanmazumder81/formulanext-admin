import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MeasurementUnitsService } from '../../../services/measurement-units.service';
import { validate } from 'json-schema';
import { LicenceClassService } from '../../../services/licence-class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../notification.service';

export interface ddd{
  className?: string,
  associatedWeight?: number,
  id?: number,
}

@Component({
  selector: 'app-licence-class-entity',
  templateUrl: './licence-class-entity.component.html',
  styleUrls: ['./licence-class-entity.component.scss']
})

export class LicenceClassEntityComponent implements OnInit {
  private isActive : boolean = true;
  public loader: boolean = false;
  public licenceClassId : any;
  public licenceClassFrom : FormGroup = new FormGroup({
    // licenceGroup : new FormGroup({
      className: new FormControl('', Validators.required),
      associatedWeight: new FormControl('', Validators.required),
      meta: new FormControl('',),
      isActive: new FormControl(this.isActive,),
      // id: new FormControl(''),
    // }),
  })
  constructor(
    private licenceClassService: LicenceClassService,
    private _router: Router,
    private activeRouter: ActivatedRoute,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUrl();
  }
  licenceClassAdd(){
    this.loader = true;
    console.log(this.licenceClassFrom.value);
    this.licenceClassService.licenceClassAdd(this.licenceClassFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Add', 'Successfully');
        this._router.navigateByUrl('dashboard/master/licenceClass/licenceClassList');
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
  getUrl() {
    this.licenceClassId = this.activeRouter.snapshot.paramMap.get('id');    
    if(this.licenceClassId){
      this.loader = true;
      this.licenceClassService.licenceClassGetData(this.licenceClassId).subscribe(
        (success: any)=>{
          console.log(success);
          this.loader = false;
          this.licenceClassFrom.patchValue(success);
        },(error)=>{
          console.log(error);
        },()=>{
          this.loader = false;
        }
      )
    }
  }
  licenceClassEdit(){
    let licenceId = this.licenceClassId;
    this.loader = true;
    Object.assign(this.licenceClassFrom.value, {'id': parseInt(this.licenceClassId) })
    console.log(this.licenceClassFrom.value);
    this.licenceClassService.licenceClassEdit(licenceId, this.licenceClassFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.notification.showSuccess('Update', 'Successfully');
        this._router.navigateByUrl('dashboard/master/licenceClass/licenceClassList');
        this.loader = false;
      },(error)=>{
        console.log(error);
      }
    )
  }
}
