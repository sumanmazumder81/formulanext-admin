


import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, FormBuilder } from '@angular/forms';

import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Subject, Observable, debounceTime } from 'rxjs';
import { map, startWith, finalize } from 'rxjs/operators';
import { VehiclesTypeService } from '../../../services/vehicles-type.service';
import { VehiclesVariantService } from '../../../services/vehicles-variant.service';
import { BrokerService } from '../../../services/broker.service';
import { UserEntitiesService } from '../../../services/user-entities.service';
import { LicenceClassService } from '../../../services/licence-class.service';
import { OwnerListService } from '../../../services/owner-list.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { VehicleListService } from '../../../services/vehicle-list.service';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { MeasurementUnitsService } from '../../../services/measurement-units.service';
import {MatDialog} from '@angular/material/dialog';
import { DimensionDialogComponent } from '../dimension-dialog/dimension-dialog.component';
import { DatePipe } from '@angular/common'
import { stringify } from 'querystring';
import { DriverService } from '../../../services/driver.service';
import { MatStepper } from '../../../../../node_modules/@angular/material/stepper';
import { MatSlideToggleChange } from '../../../../../node_modules/@angular/material/slide-toggle';
export interface User {
  name: string;
}
export interface User2 {
  name: string;
}
@Component({
  selector: 'app-vehicle-entities',
  templateUrl: './vehicle-entities.component.html',
  styleUrls: ['./vehicle-entities.component.scss']
})

export class VehicleEntitiesComponent implements OnInit {
  [x: string]: any;
  isComplete: boolean = false;
  public loader: boolean = false;
  public brokerLoader : boolean = false;
  private searchSubject : Subject<string> = new Subject();
  private searchSubjectBroker : Subject<string> = new Subject();
  private searchSubjectDriver : Subject<string> = new Subject();
  private licenceClassListIds: number[]=[];
  public measurementUnitLists: any;

  public vehiclesType: any;
  public editVehiclesId: number;
  public vehicleVariant: number;
  public vehiclesId: number | string;
  public newDate = new Date();
  public vehiclesMedia : any[] = [];
  public vehiclesAge : string = '0';
  public vehicalData: any;
  public VehicleTypeIds: number;
  public otherDocumentStatus: boolean = false;
  public emiStatus : boolean = false;
  public checkStatus: boolean = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  licenseClassSetList :any[] = [];
  allFruits: any;
  licenceClass: any[] = [];
  searchText: string = '';

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  public vehicleTypeList: any;
  public vehiclesVariantListed:string[] = [];
  public ownership: any[] =[
    {value: 1, viewValue: 'Market'},
    {value: 2, viewValue: 'Owned '},
  ];
  // public units: any[] = [
  //   {value: 'kg', viewValue: 'Kg'},
  //   {value: 'Feet', viewValue: 'Feet'},
  //   {value: 'centmiter', viewValue: 'Centmiter'},
  // ];
  public brokersOption: any[] = [];
  public driverOption: any[] = [];

  // ownerId = new FormControl();
  ownerId = new FormControl();
  public OwnerOptions: any[] = [];

  brokerId = new FormControl();
  brokerOptions: User2[] = [{name: 'Jones'}, {name: 'Smith'}, {name: 'Brown'}];
  filteredBrokerOptions: Observable<User2[]>;
  public vehiclePage: string = vendorEntityType.VEHICLE;


  public vehiclesFrom : FormGroup = new FormGroup({
    id : new FormControl(''),
    vehicleTypeId : new FormControl('',  Validators.required),
    vehicleVariantId : new FormControl(null, Validators.required),
    ownership : new FormControl(1,  Validators.required),
    // ownerId : new FormControl(null, Validators.required),
    ownerId : new FormControl(null),
    
    driver: new FormGroup({
      driverId : new FormControl(0),
    }),
    broker: new FormGroup({
      brokerId : new FormControl(0),
      // orderNumber: new FormControl(''),
    }),
    // licenceClasses : new FormControl([]),
    engineNo : new FormControl('',  Validators.required),
    // plateNo : new FormControl('',  Validators.required),
    chassisNo : new FormControl('',  Validators.required),
    isActive : new FormControl(''),
    vehiclesAge: new FormGroup({
      registerNumber: new FormControl('', Validators.required),
      registerDate: new FormControl('', Validators.required),
      expireDate: new FormControl('', Validators.required),
    }),

    fitnessCertificated: new FormGroup({
      fitnessNumber : new FormControl(''),
      expireDate: new FormControl('', Validators.required),
    }),

    insuranceNumber: new FormGroup({
      insuranceNumber : new FormControl(''),
      expireDate: new FormControl('', Validators.required),
    }),

    rcPermit: new FormGroup({
      rcNumber : new FormControl(''),
      expireDate: new FormControl(''),
    }),
    nationalPermit: new FormGroup({
      nationalNumber : new FormControl(''),
      expireDate: new FormControl(''),
    }),
    roadTax: new FormGroup({
      roadNumber : new FormControl(''),
      expireDate: new FormControl('', Validators.required),
    }),
    pollutionNumber: new FormGroup({
      certifiedNumber : new FormControl(''),
      expireDate: new FormControl('', Validators.required),
    }),
    meta: new FormControl(''),
    emiGroup: new FormGroup({
      isEmi: new FormControl(false),
    //   emiNumber : new FormControl(null),
    //   emiMonths: new FormControl(null),
    //   emiPaidMonths: new FormControl(null),
    //   LastEmiPaymentDate: new FormControl(null, Validators.required),
    }),
    others: new FormArray([]),
  });

  constructor(
    private vehiclesVariantService : VehiclesVariantService,
    private vehiclesTypeService: VehiclesTypeService,
    private brokerServices: BrokerService,
    private licenceClassService: LicenceClassService,
    private ownerListService : OwnerListService,
    private vehicleListService: VehicleListService,
    private activeRouter: ActivatedRoute,
    private _router: Router,
    private measurementUnitsServices: MeasurementUnitsService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private driverServices: DriverService
  ) {

    //
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter3(fruit) : this.allFruits.slice())),
    );
    console.log(this.filteredFruits);
   }

  ngOnInit(): void {
    // this.vehiclesFrom.get('vehiclesAge').get('registerDate').valueChanges.subscribe((e:any)=>{
    //   const regData = new Date(e);
    //   console.log(regData.setFullYear(regData.getFullYear() + 15));     
    //   this.vehiclesFrom.get('vehiclesAge').get('registerDate').setValue(new Date(regData.setFullYear(regData.getFullYear() + 15)));
    // })
    
    if(!this.activeRouter.snapshot.paramMap.get('id')){
      this.vehicleType();
      this.vehiclesVariantList();
      this.licenceClassList();
      this.ownerList('');
      this.brokerList('');
      this.driverList('');
      // this.addItem();
      this.measurementUnits();
    }
    this.getUrl();
    this.searchSubject.pipe(debounceTime(500)).subscribe((e: string) => {
      this.ownerList(e);
    });
    this.searchSubjectBroker.pipe(debounceTime(500)).subscribe((e: string) => {
      console.log(e);
      this.brokerList(e);
    });
    this.searchSubjectDriver.pipe(debounceTime(500)).subscribe((e: string) => {
      console.log(e);
      this.DriverList(e);
    });
    this.vehiclesFrom.get('vehicleTypeId').valueChanges.subscribe((res:any)=>{
      this.VehicleTypeIds = res.id;
      console.log(this.VehicleTypeIds);
      if(res.isPermitRequired){
        // alert("true");
        this.vehiclesFrom.controls['nationalPermit'].get('expireDate').addValidators(Validators.required);
        this.vehiclesFrom.controls['nationalPermit'].get('expireDate').updateValueAndValidity();
        // this.vehiclesFrom.controls['nationalPermit'].get('expireDate').u.updateValueAndValidity()
        this.vehiclesFrom.controls['rcPermit'].get('expireDate').setValidators(Validators.required);
        this.vehiclesFrom.controls['rcPermit'].get('expireDate').updateValueAndValidity();
    }else{
      // alert("false");
      this.vehiclesFrom.controls['nationalPermit'].get('expireDate').removeValidators(Validators.required);
      this.vehiclesFrom.controls['nationalPermit'].get('expireDate').updateValueAndValidity();
      this.vehiclesFrom.controls['rcPermit'].get('expireDate').removeValidators(Validators.required);
      this.vehiclesFrom.controls['rcPermit'].get('expireDate').updateValueAndValidity();
    }    
  })
}
setExpireDate(e){
  console.log(e);  
  const regData = new Date(e.value);
      // console.log(regData.setFullYear(regData.getFullYear() + 15));     
      this.vehiclesFrom.get('vehiclesAge').get('expireDate').setValue(new Date(regData.setFullYear(regData.getFullYear() + 15)));
}
  measurementUnits(){
    this.loader = true;
    this.measurementUnitsServices.measurementUnitsList().subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.measurementUnitLists = success;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }

  createItem(): FormGroup {
    return new FormGroup({
      documentName: new FormControl(null, Validators.required),
      documentNumber: new FormControl(null, Validators.required),
      expireDate: new FormControl(null, Validators.required)
    });
  }
  addItem(){
    this.otherDocumentStatus = true;
    // if(this.vehiclesFrom.get('others').length < 5){
      const add = this.vehiclesFrom.get('others') as FormArray;
      console.log(add);
      add.push(this.createItem());

    // }
  }
  deleteOtherInformation(index){
    console.log(index);
    const remove  = this.vehiclesFrom.get('others') as FormArray;
    remove.removeAt(index);
  }




  displayFn(user): string {
    return user && user.name ? user.name : '';
  }
  vehiclesTypeChange(event){
    console.log(event.source.value.id);
    // this.vehiclesFrom.value['vehicleTypeId'] = event.source.value.id;
    this.vehiclesType = event.source.value.id;
    // this.vehiclesFrom.get('vehicleTypeId').setValue(event.source.value.id);
  }
  vehiclesVariantChange(event){
    console.log(event.source.value.id);
    this.vehicleVariant = event.source.value.id;
  }
  displayFn2(user): string {
    return user && user.name ? user.name : '';
  }

  //

  remove(fruit: any): void {
    const index = this.fruits.findIndex( e=> e.id === fruit.id);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  addLicenseClass(event: MatChipInputEvent): void {
    console.log(event);
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.licenseClassSetList.push(value);
    }
    // Clear the input value
    event.input.value=""
    this.editDriverId.setValue(null);
  }
  removeLicenceClass(className: any): void {
    console.log(className);

    const index = this.licenseClassSetList.findIndex(e=>e.id === className.id);

    if (index >= 0) {
      this.licenseClassSetList.splice(index, 1);
    }
    const licenceClassIds = this.licenseClassSetList.map(e=>e.id);
    this.vehiclesFrom.get('licenceClasses').setValue(licenceClassIds);
  }
  selectedLicenceClass(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.licenseClassSetList.push(event.option.value)
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    const licenceClassIds = this.licenseClassSetList.map(e=>e.id);
    this.vehiclesFrom.get('licenceClasses').setValue(licenceClassIds);
  }
  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }



  licenceClassList() {
    this.loader = true;
    this.licenceClassService.licenceClassList().subscribe(
      (success: any) => {
        console.log(success);
        this.licenceClass = success;
        if(this.activeRouter.snapshot.paramMap.get('id')){
          this.licenseClassSetList = this.licenceClass.filter(e=>e.id === this.licenceClassListIds.find(ele=>ele == e.id));
        }
        this.loader = false;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }

  get licenceClassListData(){
    return this.licenceClass.filter(e=>e.id !== this.licenseClassSetList.find(ele=>ele.id === e.id)?.id);
  }

  ownerList(searchString){
    this.loader = true;
    this.ownerListService.ownerList(1,10,searchString).subscribe(
      (success: any)=>{
        this.OwnerOptions = success.result;
        // console.log(this.OwnerOptions);
        this.loader = false;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    );
  }
  ownerFilter(value){
    // console.log(event);
    this.searchSubject.next(value);
  }


  brokerList(searchString){
    this.brokerLoader = true;
    this.brokerServices.brokerList(1, 10, searchString).pipe(finalize(() => {
      this.brokerLoader = false;
      })).subscribe(
      (res:any)=>{
       console.log(res);
       this.brokersOption = res.result;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
  brokerFilter(value){
    console.log(value);
    this.searchSubjectBroker.next(value);
  }
  driverList(searchString){
    this.brokerLoader = true;
    this.driverServices.driverSearchList(1, 10, searchString).pipe(finalize(() => {
      this.brokerLoader = false;
      })).subscribe(
      (res:any)=>{
       console.log(res.result);
       this.driverOption = res.result;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }
  driverFilter(value){
    console.log(value);
    this.searchSubjectDriver.next(value);
  }


  vehicleType(){
    this.loader = true;
    this.vehiclesTypeService.VehiclesTypeBrandList().subscribe(
      (res)=>{
        console.log(res);
        this.vehicleTypeList = res;
        this.loader = false;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }


  vehiclesVariantList(){
    this.loader = true;
    this.vehiclesVariantService.vehiclesVariantList().subscribe(
      (res:any)=>{
        // console.log(res);
        this.vehiclesVariantListed = res;
        this.loader = false;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }

  vehiclesFromAdd(stepper: MatStepper){
    this.loader = true;
    // this.vehiclesFrom.patchValue({
    //   vehicleTypeId: this.VehicleTypeIds      
    // });
    console.log(this.vehiclesFrom.value);
    this.vehicleListService.addVehicles(this.vehiclesFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.vehiclesId = success['id'];
        this.vehiclesMedia = this.vehiclesFrom.value.media;
        this.vehicalData = success;
        this.loader = false;
        this.isComplete = true;
        setTimeout(() => {
          stepper.next();
        }, 10);
        // this._router.navigateByUrl('dashboard/vehicles/vehiclesList');
      },(error)=>{
        console.log(error);
        this.loader = false;
        this.isComplete = false;
      }
    )
  }
  getUrl(){
    this.loader = true;
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.vehiclesId = id;
    if(!id) return;
    console.log(id);
    this.editVehiclesId = Number(id);
    this.vehicleListService.vehiclesGet(this.editVehiclesId).subscribe(
      (success: any)=>{
        this.loader = false;
        console.log(success, success.meta.emiGroup.isEmi);
        if(success.meta.emiGroup.isEmi){
          const emiGroup: FormGroup = this.vehiclesFrom.get('emiGroup') as FormGroup;
          this.emiStatus = true;
          this.checkStatus = true;
          emiGroup.addControl('emiNumber', new FormControl(null));
          emiGroup.addControl('emiMonths', new FormControl(null));
          emiGroup.addControl('emiPaidMonths', new FormControl(null));
          emiGroup.addControl('LastEmiPaymentDate', new FormControl(null, Validators.required));
          // return this.vehiclesFrom.updateValueAndValidity();          
        }
        this.vehicalData = success;
        this.vehicleType();
        this.vehiclesVariantList();
        this.licenceClassList();
        this.ownerList('');
        this.brokerList('');
        this.driverList('');
        this.measurementUnits();
        // this.addItem();
        this.otherDocumentStatus = true;
        this.licenceClassListIds = success['licenceClasses'];
        // this.vehiclesType.setValue(this.vehiclesFrom.value['vehicleTypeId']);
        this.vehiclesTypeService.VehiclesTypeBrandList().subscribe(
          (res)=>{
            this.vehicleTypeList = res;
            let findVehiclesTypeId = this.vehicleTypeList.find((item:any)=> item.id == success.vehicleTypeId);
            this.vehiclesFrom.patchValue({
              vehicleTypeId: findVehiclesTypeId,
            })
            this.loader = false;
          },(error)=>{
            console.log(error);
            this.loader = false;
          }
        )
        this.vehiclesFrom.patchValue({
          vehicleTypeId: success['vehicleTypeId'],
          vehicleVariantId : success['vehicleVariantId'],
          ownership : success['ownership'],
          ownerId : success['ownerId'],
          driverId : success['driverId'],
          licenceClasses : success['licenceClasses'],
          engineNo : success['engineNo'],
          // plateNo : success['plateNo'],
          chassisNo : success['chassisNo'],
          isActive: success['isActive'],
          driver:{
            driverId: success['meta']?.driver?.driverId,
          },
          vehiclesAge: {
            registerNumber: success['meta']?.vehiclesAge?.registerNumber,
            registerDate: success['meta']?.vehiclesAge?.registerDate,
            expireDate: success['meta']?.vehiclesAge?.expireDate,
          },

          broker: {
            brokerId : success['meta']?.broker.brokerId,
            // orderNumber: success['meta']?.broker.orderNumber,
          },

          fitnessCertificated:{
            fitnessNumber : success['meta']?.fitnessCertificated.fitnessNumber,
            expireDate: success['meta']?.fitnessCertificated.expireDate,
          },
          insuranceNumber: success['meta']?.insuranceNumber,
          rcPermit: success['meta']?.RCPermit,

          nationalPermit: {
            nationalNumber : success['meta']?.nationalPermit.nationalNumber,
            expireDate: success['meta']?.nationalPermit.expireDate,
          },
          roadTax: {
            roadNumber : success['meta']?.roadTax.roadNumber,
            expireDate: success['meta']?.roadTax.expireDate,
          },
          pollutionNumber:{
            certifiedNumber : success['meta']?.pollutionNumber.certifiedNumber,
            expireDate: success['meta']?.pollutionNumber.expireDate,
          },
          emiGroup: {
            emiNumber : success['meta']?.emiGroup.emiNumber,
            emiMonths: success['meta']?.emiGroup.emiMonths,
            emiPaidMonths: success['meta']?.emiGroup.emiPaidMonths,
            LastEmiPaymentDate: success['meta']?.emiGroup.LastEmiPaymentDate,
          },
        }
        );
        for(let i=0;i< success['meta'].others.length; i++){
          const add = this.vehiclesFrom.get('others') as FormArray;
          console.log(add);
          add.push(new FormGroup({
            documentName: new FormControl(success['meta'].others[i].documentName, Validators.required),
            documentNumber: new FormControl(success['meta'].others[i].documentNumber, Validators.required),
            expireDate: new FormControl(success['meta'].others[i].expireDate, Validators.required)
          }));
        }
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )

  }
  VehiclesEdit(stepper: MatStepper){
    this.loader = true;
    this.vehiclesFrom.patchValue({
      id: this.editVehiclesId,
    })
    this.vehiclesFrom.patchValue({
      vehicleTypeId: this.VehicleTypeIds      
    });

    const editdata = this.vehiclesFrom.value;
    editdata.meta = {
      driver:{
        driverId: this.vehiclesFrom.value['driver'].driverId,
      },
      driverId: this.vehiclesFrom.value['driverId'],
      RCPermit: this.vehiclesFrom.value['rcPermit'],
      broker:{
        brokerId : this.vehiclesFrom.value['broker'].brokerId,
        orderNumber: this.vehiclesFrom.value['broker'].orderNumber,
      },
      emiGroup: {
        isEmi: this.vehiclesFrom.value['emiGroup'].isEmi,
        emiNumber : this.vehiclesFrom.value['emiGroup'].emiNumber,
        emiMonths: this.vehiclesFrom.value['emiGroup'].emiMonths,
        emiPaidMonths: this.vehiclesFrom.value['emiGroup'].emiPaidMonths,
        LastEmiPaymentDate: this.vehiclesFrom.value['emiGroup'].LastEmiPaymentDate,
      },
    fitnessCertificated: {
      fitnessNumber : this.vehiclesFrom.value['fitnessCertificated'].fitnessNumber,
      expireDate: this.vehiclesFrom.value['fitnessCertificated'].expireDate,
    },

    insuranceNumber: this.vehiclesFrom.value['insuranceNumber'],
    nationalPermit: {
      nationalNumber : this.vehiclesFrom.value['nationalPermit'].nationalNumber,
      expireDate: this.vehiclesFrom.value['nationalPermit'].expireDate,
    },
    others: this.vehiclesFrom.value['others'],
    pollutionNumber: {
      certifiedNumber : this.vehiclesFrom.value['pollutionNumber'].certifiedNumber,
      expireDate: this.vehiclesFrom.value['pollutionNumber'].expireDate,
    },
    roadTax: {
      roadNumber : this.vehiclesFrom.value['roadTax'].roadNumber,
      expireDate: this.vehiclesFrom.value['roadTax'].expireDate,
    },

    vehiclesAge: {
      registerNumber : this.vehiclesFrom.value['vehiclesAge'].registerNumber,
      registerDate: this.vehiclesFrom.value['vehiclesAge'].registerDate,
      expireDate: this.vehiclesFrom.value['vehiclesAge'].expireDate,
    },
   }
    console.log(this.vehiclesFrom.value); 
    this.vehicleListService.vehiclesEdit(this.editVehiclesId, this.vehiclesFrom.value).subscribe(
      (success)=>{
        this.loader = false;
        console.log(success);
        this.vehicalData = success;
        setTimeout(() => {
          stepper.next();
        }, 10);
        this.isComplete = true;
      },(error)=>{
        console.log(error);
        this.isComplete = false;
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }

  get vehicalAgeinYear(): string{
    let today = new Date();
    const rDate = new Date(this.vehiclesFrom.value.vehiclesAge?.registerDate);
    // console.log(rDate);
    let DOB = new Date(rDate);
    let totalMonths = (today.getFullYear() - DOB.getFullYear()) * 12 + today.getMonth() - DOB.getMonth();
    totalMonths += today.getDay() < DOB.getDay() ? -1 : 0;
    let years:number = today.getFullYear() - DOB.getFullYear();
    if (DOB.getMonth() > today.getMonth())
        years = years - 1;
    else if (DOB.getMonth() === today.getMonth())
        if (DOB.getDate() > today.getDate())
            years = years - 1;

    let days: number;
    let months: number;

    if (DOB.getDate() > today.getDate()) {
        months = (totalMonths % 12);
        if (months == 0)
            months = 11;
        let x = today.getMonth();
        switch (x) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12: {
                let a = DOB.getDate() - today.getDate();
                days = 31 - a;
                break;
            }
            default: {
                let a = DOB.getDate() - today.getDate();
                days = 30 - a;
                break;
            }
        }

    }
    else {
        days = today.getDate() - DOB.getDate();
        if (DOB.getMonth() === today.getMonth())
            months = (totalMonths % 12);
        else
            months = (totalMonths % 12) + 1;
    }
    if(!isNaN(years) && !isNaN(months) && !isNaN(days)){
      let age = years + ' years ' + months + ' months ' + days + ' days';
      // console.log(years, months, days);
      return age;
    }
    return '';


  }
  emiGroupdd(status:MatSlideToggleChange){
    const emiGroup: FormGroup = this.vehiclesFrom.get('emiGroup') as FormGroup;
    if(status.checked == true){
      // console.log(status, this.vehiclesFrom.get('isEmi'));
      this.emiStatus = true;
      this.vehiclesFrom.patchValue({ isEmi: true });
      emiGroup.addControl('emiNumber', new FormControl(null));
      emiGroup.addControl('emiMonths', new FormControl(null));
      emiGroup.addControl('emiPaidMonths', new FormControl(null));
      emiGroup.addControl('LastEmiPaymentDate', new FormControl(null, Validators.required));
      return this.vehiclesFrom.updateValueAndValidity();
    }else{
      // console.log(status, this.vehiclesFrom.get('isEmi'));
      this.emiStatus = false;
      this.vehiclesFrom.patchValue({isEmi: false})
      emiGroup.removeControl('emiNumber');
      emiGroup.removeControl('emiMonths');
      emiGroup.removeControl('emiPaidMonths');
      emiGroup.removeControl('LastEmiPaymentDate');
      return this.vehiclesFrom.updateValueAndValidity();
    }
  }
}