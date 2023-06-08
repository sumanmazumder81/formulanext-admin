import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, HostBinding, Component, OnInit, ViewChild, } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { MeasurementUnitsService } from '../../../services/measurement-units.service';
import { VehicleBrandService } from '../../../services/vehicle-brand.service';
import { LicenceClassService } from '../../../services/licence-class.service';

import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipList} from '@angular/material/chips';
import { Observable } from 'rxjs';
import { VehiclesTypeService } from '../../../services/vehicles-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import {MatDialog} from '@angular/material/dialog';
import { DimensionDialogComponent } from '../dimension-dialog/dimension-dialog.component';



@Component({
  selector: 'app-type-entities',
  templateUrl: './type-entities.component.html',
  styleUrls: ['./type-entities.component.scss'],
  // providers: [{ provide: MatFormFieldControl, useExisting: TypeEntitiesComponent }] 
})
export class TypeEntitiesComponent implements OnInit {
  public TypeEntitiesId: string;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  licenceClasses = new FormControl('', Validators.required);
  filteredFruits: Observable<string[]>;
  fruits: any[] = [];
  allFruits: any;
  licenceClass : any[] = [];
  licenseClassSetList :any[] = [];
  private licenceClassListIds: number[]=[];
  public loader: boolean = false;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('chipList') chipList: MatChipList;
  public optionLoader: boolean = false;
  
  public units: any;
  public vehiclesBrand: any;
  // public resentValue : number = 0;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  public vehiclesTypeFrom: FormGroup;
  get getLoadCapacity(): string | number {
    const ulwData = this.vehiclesTypeFrom.get('loadCapacity').get('ulw').value;
      const gvwData = this.vehiclesTypeFrom.get('loadCapacity').get('gvw').value;
      // console.log(ulwData, gvwData)
      // console.log(!isNaN(ulwData) && !isNaN(gvwData))
      if(ulwData && gvwData && !isNaN(ulwData) && !isNaN(gvwData)){
        return gvwData - ulwData;
      }else{
        return null;
      }
  }
  
  constructor(
    private measurementUnitsService: MeasurementUnitsService,
    private vehicleBrandService: VehicleBrandService,
    private licenceClassService: LicenceClassService,
    private typeEntityService : VehiclesTypeService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private notification: NotificationService,
    private dialog: MatDialog,
  ){
    
    this.vehiclesTypeFrom = new FormGroup({
      model: new FormControl('', [Validators.required]),
      loadCapacity: new FormGroup({
        ulw: new FormControl( null, Validators.required),
        gvw: new FormControl('', Validators.required),
        loadCapacity: new FormControl('', Validators.required),
        unit: new FormControl('KG', Validators.required),
      }),
      dimension: new FormGroup({
        Height: new FormControl('', Validators.required),
        width: new FormControl('', Validators.required),
        depth: new FormControl('', Validators.required),
        unit: new FormControl('Feet', Validators.required),
      }),
      vehicleBrandId: new FormControl('', Validators.required),
      licenceClasses : new FormControl('', Validators.required),
      meta: new FormControl(null),
      isActive: new FormControl(true),
      isPermitRequired: new FormControl(false),
    });
    
  }


  ngOnInit(): void {
    this.vehiclesTypeFrom.valueChanges.subscribe(()=>{
      // console.log(this.vehiclesTypeFrom);
    });
    this.measurementUnitList();
    this.vehiclesBrandList();
    this.licenceClassList();
    this.getUrl();
    let capacityCalculate;
    this.vehiclesTypeFrom.get('loadCapacity').get('loadCapacity').disable();

    // if(this.vehiclesTypeFrom.get('licenceClasses').value == ""){
    //   this.vehiclesTypeFrom.get('licenceClasses').status === 'INVALID'
    // }
    
    console.log(this.vehiclesTypeFrom.get('licenceClasses'));
    this.vehiclesTypeFrom.get('licenceClasses').statusChanges.subscribe(
      // status => this.chipList.errorState = status === 'INVALID'
      (res:any)=>{
        console.log(res);
      }
      
    );
  }
  measurementUnitList() {
    this.optionLoader = true;
    this.measurementUnitsService.measurementUnitsList().subscribe(
      (success: any) => {
        this.units = success;
        this.optionLoader = false;
        console.log(this.units);
      },(error)=>{
        console.log(error);
        
      }
    )
  }

  vehiclesBrandList() {
    this.optionLoader = true;
    this.vehicleBrandService.brandList().subscribe(
      (success: any) => {
        console.log(success);
        this.vehiclesBrand = success;
        this.optionLoader = false;
      },(error)=>{
        console.log(error);        
      }
    )
  }
  licenceClassList() {
    this.loader = true;
    this.licenceClassService.licenceClassList().subscribe(
      (success: any) => {
        console.log(success);
        this.licenceClass = success;
        if(this.TypeEntitiesId){
          this.vehiclesTypeFrom.get('licenceClasses').setValue(this.licenceClassListIds)
          this.licenseClassSetList = this.licenceClass.filter(e=>e.id === this.licenceClassListIds.find(ele=>ele == e.id));
        }
        this.loader = false;
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
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
    // this.editDriverId.setValue(null);
  }
  removeLicenceClass(className: any): void {
    console.log(className);
    const index = this.licenseClassSetList.findIndex(e=>e.id === className.id);
    if (index >= 0) {
      this.licenseClassSetList.splice(index, 1);
    }
    const licenceClassIds = this.licenseClassSetList.map(e=>e.id);
    this.vehiclesTypeFrom.get('licenceClasses').setValue(licenceClassIds);
  }
  selectedLicenceClass(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    this.licenseClassSetList.push(event.option.value)
    this.fruitInput.nativeElement.value = '';
    this.licenceClasses.setValue(null);
    const licenceClassIds = this.licenseClassSetList.map(e=>e.id); 
    this.vehiclesTypeFrom.get('licenceClasses').setValue(licenceClassIds);
  }
  get licenceClassListData(){
    return this.licenceClass.filter(e=>e.id !== this.licenseClassSetList.find(ele=>ele.id === e.id)?.id);
  }


  vehiclesTypeAdd() {
    this.loader = true;
    console.log(this.vehiclesTypeFrom.value);
    this.typeEntityService.addVehiclesType(this.vehiclesTypeFrom.value).subscribe(
      (res)=>{
        console.log(res);
        this.loader = false;
        this.notification.showSuccess('Add', 'Successfully');
        this.router.navigateByUrl('dashboard/vehicles/vehiclesType/vehiclesTypeList')
      },(error)=>{
        console.log(error);
        this.loader = false;
        
      }
    )
    
  }
  getUrl(){
    this.TypeEntitiesId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.TypeEntitiesId);
    
    if(this.TypeEntitiesId){
      this.loader = true;
      this.typeEntityService.vehiclesTypeGetData(this.TypeEntitiesId).subscribe(
        (success)=>{
          console.log(success['meta'].GVW);
          this.loader = false;
          this.licenceClassList();
          this.licenceClassListIds = success['licenceClasses'];
          this.vehiclesTypeFrom.patchValue(success);
          this.vehiclesTypeFrom.patchValue({
            loadCapacity:{
              gvw: success['meta']?.GVW,
              ulw: success['meta']?.ULW,
              loadCapacity: success['meta']?.LoadCapacity,
              unit: success['meta']?.Unit,
            }
          })
        },(error)=>{
          console.log(error); 
          this.loader = false;             
        }
      )
    }
        

  }
  // licenceClasses : success['licenceClasses'],
  editVehiclesType(){
    this.loader = true;
    Object.assign(this.vehiclesTypeFrom.value, {'id': parseInt(this.TypeEntitiesId) });
    console.log(this.vehiclesTypeFrom.value);
    // this.vehiclesTypeFrom.get('licenceClasses').setValue(this.licenceClassIds)
    this.typeEntityService.vehiclesTypeEdit(this.TypeEntitiesId, this.vehiclesTypeFrom.value).subscribe(
      (success)=>{
        console.log(success);
        this.loader = false;
        this.notification.showSuccess('Update', 'Successfully');
        this.router.navigateByUrl('dashboard/vehicles/vehiclesType/vehiclesTypeList');
      },(error)=>{
        console.log(error);
        this.loader = false;
      }
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(DimensionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
