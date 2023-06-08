import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { OwnerAddService } from '../../services/owner-add.service';
import { OwnerInterface } from '../../interface/owner';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserEntitiesService } from '../../services/user-entities.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
// import { Observable } from 'rxjs-compat/observable';
// import {Observable} from 'rxjs';
// import 'rxjs/add/operator/flatMap';
// import 'rxjs/add/operator/map';
import { map, flatMap, mergeMap, startWith, debounceTime, finalize } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { PostUserEntityManagerService } from '../../services/post-user-entity-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BrokerService } from '../../services/broker.service';
import { DriverService } from '../../services/driver.service';
import { LicenceClassService } from '../../services/licence-class.service';
import { OwnerListService } from '../../services/owner-list.service';
// import 'rxjs/add/operator/mergeMap';
// import { map, filter, mergeMap } from "rxjs/operators";

export interface User {
  id: number;
  userEntity: {
    fullName: string;
  }
}

@Component({
  selector: 'app-user-entity',
  templateUrl: './user-entity.component.html',
  styleUrls: ['./user-entity.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class UserEntityComponent implements OnInit {

  public pointer: string = "pointer";

  @Input('ownerFrom') ownerFrom: FormGroup;
  @Input('whichPage') whichPage: any;
  @Input('editId') editId: number;
  @Input('searchRelatedEntitys') searchRelatedEntitys:any;
  @Input('licenceClassListdata') licenceClassListdata: any[] = [];
  @Input('isEditable') isEditable: boolean;
  @Input('tradeLicenceThere') tradeLicenceThere: boolean;
  @Input('userEntitId') userEntitId: number | string;
  @Output() ownerIdSend: EventEmitter<boolean> = new EventEmitter();
  @Output() licenceClass: EventEmitter<any> = new EventEmitter();
  @Output() editBrokerList: EventEmitter<any> = new EventEmitter();
  @Output() editDriverList: EventEmitter<any> = new EventEmitter();
  @Output() companyStatusSend: EventEmitter<boolean> = new EventEmitter();

  private searchSubjectBroker : Subject<string> = new Subject();
  public brokerLoader : boolean = false;
  // autocomplete with mat-chiplist
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: any[] = [];
  allFruits: any;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;


  primary: FormArray;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  public ownerData: OwnerInterface;
  // public isActive: boolean = true;
  // public userEntatityId: number;
  public param: any;
  public ownerObj: any = {};
  public brokerObj: any = {};
  public driverObj: any = {};
  private userEntityId: number;
  public licenceClassListed: any;
  licenceClasses: any[] = [];
  private licenceClassListIds: number[]=[];

  public isChecked = true;

  public accountType: any[] = [
    { value: 'saving', viewValue: 'Saving' },
    { value: 'Current accounts', viewValue: 'Current' },
    { value: 'Salary account', viewValue: 'Salary account' },
    { value: 'Fixed deposit account', viewValue: 'Fixed deposit account' },
    { value: 'Recurring deposit account', viewValue: 'Recurring deposit account' },
    { value: 'NRI accounts', viewValue: 'NRI accounts' },
  ];
  public urlData: any;


  public brokerLists: any[] = [];
  public brokersOption: any[] = [];
  public ownerLists: any[] = [];
  public driverLists: any[] = [];
  public OwnerEditBrokerList: any[] =[];
  public OwnerEditDriversList: any[] =[];
  licenseClassSetList :any[] = [];

  // options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;
  ownerId = new FormControl();
  private searchSubject: Subject<string> = new Subject();
  

  //editOwnerBrokerList
  editBrokerId = new FormControl();
  filteredBrokerList: Observable<string[]>;
  showBrokrList: any[] = [];
  @ViewChild('brokerInput') brokerInput: ElementRef<HTMLInputElement>;

  //editOwnerDriverList
  editDriverId = new FormControl();
  filteredDriverList: Observable<string[]>;
  DriverListEdit: any[] = [];
  showDriverList: any[] = [];
  @ViewChild('driverInput') driverInput: ElementRef<HTMLInputElement>;

  public presentAddress : boolean = false;
  public tradeLicencehide : boolean = false;
  public checkStatus: boolean = false;
  public checkStatus02: boolean = false;
  public companyDetails: boolean = false;

  addressMatchValidator(element:any): ValidatorFn {
    console.log(element);
    return (controls: AbstractControl): any | null => {
      console.log(controls);
      if(!controls.value){
        return null;
      }
       if(this.ownerFrom?.get('userEntity')?.get('address')?.get('primary')?.get(element).value.toLowerCase() == controls.value.toLowerCase()){
         return { 'vatMatchesName': true };
       }
        else {
         return null;
       }
    }
  }
  // contactMatch(element): ValidatorFn{
  //   return (controls: AbstractControl): any | null => {
  //     if(!controls.value){
  //       return null;
  //     }
  //     for(let i= 0; i < this.ownerFrom?.get('userEntity')?.get('contact').value.length; i++){
  //       console.log(this.ownerFrom?.get('userEntity')?.get('contact').value[i]?.[element], controls.value);
  //       if(this.ownerFrom?.get('userEntity')?.get('contact').value[i]?.[element] === controls.value){
  //         return {'contactCheck': true}
  //       }else{
  //         return null;
  //       }
  //     }
  //   }
  // }

  // hasContactNumberexist(contactNumber): boolean {
  //   for(let i= 0; i< this.ownerFrom?.get('userEntity')?.get('contact').value.length; i++) {
  //     // console.log(this.ownerFrom?.get('userEntity')?.get('contact'));
  //     for(let j=0; j< this.ownerFrom?.get('userEntity')?.get('contact').value[i]['contactList'].length; j++){
  //       console.log(this.ownerFrom?.get('userEntity')?.get('contact').value[i]['contactList'][j].contactNo, contactNumber);
  //       if(this.ownerFrom?.get('userEntity')?.get('contact').value?.[i]['contactList'][j]?.contactNo == contactNumber){
  //         console.log(this.ownerFrom?.get('userEntity')?.get('contact').value?.[i]['contactList'][j]);
  //         return true;
  //       }
  //     }
  //   }
  // }


  // contactNumerListMatch: ValidatorFn = (controls: AbstractControl): any | null => {
  //     console.log(controls);
  //     if(!controls.value){
  //       return null;
  //     }
  //     console.log(this.ownerFrom?.get('userEntity')?.get('contact').value);
  //     if(this.hasContactNumberexist(controls.value)){
  //       return { contactNoCheck: true };
  //     }
  //     return null;
  //   }

  constructor(
    private licenceClassService: LicenceClassService,
    private activeRouter: ActivatedRoute,
    private ownerListService: OwnerListService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private brokerService: BrokerService,
    private driverServices: DriverService

  ) {
    // autocomplete with mat-chiplist
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._licenceFilter(fruit) : this.allFruits.slice())),
    );
    // console.log(this.filteredFruits);

    //editOwnerBrokerList
    this.filteredBrokerList = this.editBrokerId.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterBrokerList(fruit) : this.allFruits.slice())),
    );
    //editOwnerDriverList
    this.filteredDriverList = this.editBrokerId.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filterDriverList(fruit) : this.allFruits.slice())),
    );
  }
  ngOnInit(): void {
    
    this.ownerFrom.valueChanges.subscribe(()=>{
      // console.log(this.ownerFrom);
    })
    this.getUrl()
    this.licenceClassList();
    this.ownerList('');
    this.filteredOptions = this.ownerId.valueChanges.pipe(
      startWith(null),
      // map(value => (typeof value === 'string' ? value : value.userEntity.fullName)),
      // map(name => (name ? this._filter(user) : this.ownerLists.slice())),
    );
    this.searchSubject.pipe(debounceTime(500)).subscribe((e: string) => {
      this.ownerList(e);
    })
    this.searchSubject.pipe(debounceTime(500)).subscribe((e: string) => {
      this.brokerList(e);
    })

    // this.licenceClassList();
    this.searchSubjectBroker.pipe(debounceTime(500)).subscribe((e: string) => {
      // // console.log(e);
      this.brokerList(e);
    });
    
  }

  ngOnChanges(changes: SimpleChanges){
    
    console.log(changes);
    // console.log(this.ownerIdSend);

    // this.licenseClassSetList = this.ownerFrom.value['licenceClasses'];
    if(changes?.searchRelatedEntitys?.currentValue){
      // console.log(changes.searchRelatedEntitys.currentValue);
      if(changes?.searchRelatedEntitys?.currentValue.brokers){
        this.OwnerEditBrokerList = changes.searchRelatedEntitys.currentValue.brokers?.dataList ? changes.searchRelatedEntitys.currentValue.brokers?.dataList : [];
        this.OwnerEditDriversList = changes.searchRelatedEntitys.currentValue?.drivers?.dataList ? changes.searchRelatedEntitys.currentValue?.drivers?.dataList : [];
        // const dataId = this.OwnerEditBrokerList.map(e=> e.id)
        // this.ownerFrom.get('brokers').setValue(dataId);
        // const dataId2 = this.OwnerEditDriversList.map(e=> e.id)
        // this.ownerFrom.get('drivers').setValue(dataId2);
      }
    }

    if(changes?.licenceClassListdata?.currentValue){
        this.licenceClassListIds = changes.licenceClassListdata.currentValue;
        // console.log(this.licenceClassListIds);
    }
    if(this.tradeLicenceThere){
      // console.log(this.ownerFrom);
      this.tradeLicencehide = true;
      this.checkStatus = true;
    }
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }
    // Clear the input value
    event.input.value=""
    this.fruitCtrl.setValue(null);
  }

  removeBroker(event){
    // console.log(event);
    const index = this.OwnerEditBrokerList.findIndex(e=>e.id == event.id);
    // console.log(index);

    if(index > -1){
      this.OwnerEditBrokerList.splice(index, 1);
      const dataId = this.OwnerEditBrokerList.map(e=> e.id)
      this.ownerFrom.get('brokers').setValue(dataId);
    }
  }

  get getbrokerListsData() {
    return this.brokerLists.filter(e=> e.id !==  this.OwnerEditBrokerList.find(ele=> ele.id === e.id)?.id);
  }



  OwnerEditBrokerListAdd(event){
    // console.log(event);
    this.ownerFrom.get('brokers').setValue([event.value]);
    // console.log(event.value);
    // const data = this.brock.find(e=>e.userEntity.id == event.value);
    // // console.log(this.brokerLists);
    // if(data){
    //   this.OwnerEditBrokerList.push(data);
    //   const dataId = this.OwnerEditBrokerList.map(e=> e.id)
    //   // console.log(dataId);
    //   this.ownerFrom.get('brokers').setValue(dataId);
    // }
  }

// Driver list call when owner edit
  driverList(searchString) {
    this.driverServices.driverSearchList(1, 10, searchString).subscribe(
      (success: any) => {
        // console.log(success);
        this.driverLists = success.result;
      }, (error) => {
        // console.log(error);

      }
    )
  }
  OwnerEditDriverListAdd(event){
    // console.log(event.value);
    const data = this.driverLists.find(e=>e.userEntity.id == event.value);
    // console.log(this.driverLists);
    if(data){
      this.OwnerEditDriversList.push(data);
      const dataId = this.OwnerEditDriversList.map(e=> e.id)
      this.ownerFrom.get('drivers').setValue(dataId);
    }
  }
  removeDriver(event){
    // console.log(event);
    const index = this.OwnerEditDriversList.findIndex(e=>e.id == event.id);
    // console.log(index);

    if(index > -1){
      this.OwnerEditDriversList.splice(index, 1);
      const dataId = this.OwnerEditDriversList.map(e=> e.id)
      this.ownerFrom.get('drivers').setValue(dataId);
    }
  }
  get getDriverListsData() {
    return this.driverLists.filter(e=> e.id !==  this.OwnerEditDriversList.find(ele=> ele.id === e.id)?.id);
  }


// owner list call when driver edit
  ownerList(searchString) {
    this.ownerListService.ownerList(1, 10, searchString).subscribe(
      (success: any) => {
        this.ownerLists = success.result;
      }, (error) => {
        console.log(error);
      }
    )
  }
  // removeOwner(event){
  //   // console.log(event);
  //   const index = this.OwnerEditBrokerList.findIndex(e=>e.id == event.id);
  //   // console.log(index);

  //   if(index > -1){
  //     this.OwnerEditBrokerList.splice(index, 1);
  //     const dataId = this.OwnerEditBrokerList.map(e=> e.id)
  //     this.ownerFrom.get('brokers').setValue(dataId);
  //   }
  // }
  // driverEditOwnerListAdd(event){
  //   if(event.value){
  //     console.log(event.value);
  //     this.ownerFrom.get('ownerId').setValue(event.value);
  //   }
  // }
  get getOwnerListsData() {
    return this.ownerLists.filter(e=> e.id !==  this.ownerLists.find(ele=> ele.id === e.id)?.id);
  }




  licenceClassList() {
    this.licenceClassService.licenceClassList().subscribe(
      (success: any) => {
        // console.log(success);
        this.licenceClasses = success;
        if(this.activeRouter.snapshot.paramMap.get('id')){
          // // console.log(this.licenceClassListIds);
          this.licenseClassSetList = this.licenceClasses.filter(e=>e.id === this.licenceClassListIds.find(ele=>ele == e.id));
          // // console.log(this.licenseClassSetList);

        }
      },(error)=>{
        // console.log(error);
      }
    )
  }
  addLicenseClass(event: MatChipInputEvent): void {
    // console.log(event);
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
    // console.log(className);

    const index = this.licenseClassSetList.findIndex(e=>e.id === className.id);

    if (index >= 0) {
      this.licenseClassSetList.splice(index, 1);
    }
    const licenceClassIds = this.licenseClassSetList.map(e=>e.id);
    this.ownerFrom.get('licenceClasses').setValue(licenceClassIds);
  }
  selectedLicenceClass(event: MatAutocompleteSelectedEvent): void {
    // console.log(event);
    this.licenseClassSetList.push(event.option.value)
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    const licenceClassIds = this.licenseClassSetList.map(e=>e.id);
    this.licenceClass.emit(licenceClassIds);
    // this.ownerData.get('licenceClasses').setValue(licenceClassIds);
  }

  get licenceClassListData(){
    return this.licenceClasses.filter(e=>e.id !== this.licenseClassSetList.find(ele=>ele.id === e.id)?.id);
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.licenceClass.emit(this.fruits);
  }
  private _licenceFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }



//editOwnerBrokerList
brokerList(searchString){
  this.brokerLoader = true;
  this.brokerService.brokerList(1, 10, searchString).pipe(finalize(() => {
    this.brokerLoader = false;
    })).subscribe(
    (res:any)=>{
     console.log(res);
     this.brokersOption = res.result;
    },(error)=>{
      // console.log(error);
      // this.loader = false;
    }
  )
}
brokerFilter(value){
  // // console.log(value);
  this.searchSubjectBroker.next(value);
}

selectedBrokers(event: MatAutocompleteSelectedEvent): void {
  this.showBrokrList.push(event.option.value.userEntity.fullName)
  this.brokerInput.nativeElement.value = '';
  this.editBrokerId.setValue(null);
  // console.log(this.showBrokrList);
  this.editBrokerList.emit(this.showBrokrList);
}
private _filterBrokerList(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
}
get brokerListData(){
  return this.brokerLists.filter(e=>e.id !== this.showBrokrList.find(ele=>ele.id === e.id)?.id);
}

//editOwnerDriverList
addDriverList(event: MatChipInputEvent): void {
  // console.log(event);
  const value = (event.value || '').trim();
  // Add our fruit
  if (value) {
    this.DriverListEdit.push(value);
  }
  // Clear the input value
  event.input.value=""
  this.editDriverId.setValue(null);
}
selectedDrivers(event: MatAutocompleteSelectedEvent): void {
  this.DriverListEdit.push(event.option.value.id);
  this.showDriverList.push(event.option.value.userEntity.fullName)
  this.driverInput.nativeElement.value = '';
  this.editDriverId.setValue(null);
  // console.log(this.DriverListEdit, this.showDriverList);
  this.editDriverList.emit(this.DriverListEdit);
}
private _filterDriverList(value: string): string[] {
  const filterValue = value.toLowerCase();
  return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
}

  getUrl() {
    this.activeRouter.queryParams.subscribe(
      passData => {
        // console.log(passData);
        this.urlData = passData.brokerAdd;
        this.brokerList('');
        this.driverList('');
      }
    )
  }



  // contact add & removed
  createItem(): FormGroup {
    // console.log(this.whichPage);
    // if(this.whichPage == 'Driver'){
      return this.formBuilder.group({
        contactPersonName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email,]),
        contactList: new FormArray([
          new FormGroup({
            contactNo: new FormControl('', [
              Validators.required,
              Validators.min(1000000000), Validators.max(99999999999)]),
            whatappStatus: new FormControl(false),
          }),
        ])
      });
    // }else{
    //   return this.formBuilder.group({
    //     contactPersonName: new FormControl('', Validators.required),
    //     email: new FormControl('', [
    //       Validators.email
    //     ]),
    //     contactList: new FormArray([
    //       new FormGroup({
    //         contactNo: new FormControl('', [
    //           Validators.required,
    //           Validators.min(1000000000), Validators.max(99999999999)
    //         ]),
    //         whatappStatus: new FormControl(false),
    //       }),
    //     ])
    //   });
    // }
  }
  addItem(): void {
    if (this.ownerFrom.get('userEntity').get('contact')['controls'].length < 5) {
      const add = this.ownerFrom.get('userEntity').get('contact') as FormArray;
      add.push(this.createItem());

    }
  }
  deleteContactGroup(i: number) {
    const add = this.ownerFrom.get('userEntity').get('contact') as FormArray;
    add.removeAt(i);

  }
  contactsList(): FormGroup{
    return this.formBuilder.group({
      contactNo: new FormControl('', [
        Validators.required,
        Validators.min(1000000000), Validators.max(99999999999)]),
      whatappStatus: new FormControl(false),
    })
  };
  contactNumberAdd(item){
    const adds = item.get('contactList') as FormArray;
    adds.push(this.contactsList());
  }
  deleteContactList(item, index){
    console.log(item, index);
    const adds = item.get('contactList') as FormArray;
    adds.removeAt(index);
    
  }

  createUpiId(): FormGroup{
    return this.formBuilder.group({
      UPIId: new FormControl(''),
    })
  }
  
  addUPIId(): void{
    const add = this.ownerFrom.get('userEntity').get('bankDetail').get('primary').get('upiList') as FormArray;
    add.push(this.createUpiId());
  }
  deleteUpi(i:number){
    const add = this.ownerFrom.get('userEntity').get('bankDetail').get('primary').get('upiList') as FormArray;
    add.removeAt(i);
  }


  ownerFn(user: User): string {
    return user && user.userEntity.fullName ? user.userEntity.fullName : '';
  }

  applyFilter(event) {
    this.searchSubject.next(event.target.value);
  }
  onSelectionChange(event) {
    console.log(event);

    this.ownerIdSend.emit(event.option.value);
  }

  presentAddressControl = new FormGroup({
    streetNo: new FormControl('', [this.addressMatchValidator('streetNo')]),
    streetName: new FormControl('', [this.addressMatchValidator('streetName')]),
    landmark: new FormControl('', [this.addressMatchValidator('landmark')]),
    city: new FormControl(''),
    state: new FormControl(''),
    zipCode: new FormControl('', [Validators.minLength(6), Validators.maxLength(6)]),
  });
  addressChange(value:any){
    const addressFormGroup: FormGroup = this.ownerFrom.get('userEntity').get('address') as FormGroup;
    if(value.checked){
      addressFormGroup.removeControl('present');
    }else{
      addressFormGroup.addControl('present', this.presentAddressControl);
    }
    console.log(this.ownerFrom.value);
  }
  tradeLicenceStatus(event:any){
    // 
    const tradeLicence: FormGroup = this.ownerFrom.get('userEntity').get('company').get('primary') as FormGroup;
    if(event.checked){
      this.tradeLicencehide = true;
      tradeLicence.addControl('tradeLicenceNumber', new FormControl(null));
      tradeLicence.addControl('expireDate', new FormControl(null, Validators.required));
      console.log(this.ownerFrom.get('userEntity').get('company').get('primary'));
      return this.ownerFrom.updateValueAndValidity();     
    }
    else{
      this.tradeLicencehide = false;
      tradeLicence.removeControl('tradeLicenceNumber');
      tradeLicence.removeControl('expireDate');
      return this.ownerFrom.updateValueAndValidity(); 
    }
  }
  companyStatus(event:any){
    const companyDetails: FormGroup = this.ownerFrom.get('userEntity').get('company').get('primary') as FormGroup;
    if(event.checked){
      console.log("ttttttttttttttttttttttttttt");
      this.companyDetails = true;
      companyDetails.addControl('companyName', new FormControl(''));
      companyDetails.addControl('gstNumber', new FormControl('', [Validators.maxLength(15), Validators.minLength(15)]));
      console.log(this.ownerFrom.get('userEntity').get('company').get('primary'));
      this.companyStatusSend.emit(true);
    }else{
      console.log("fffffffffffffffffffffffffff");
      console.log("status", event.checked);
      this.companyStatusSend.emit(false);
      this.companyDetails = false;
      companyDetails.removeControl('companyName');
      companyDetails.removeControl('gstNumber');
      return this.ownerFrom.updateValueAndValidity();
    }
  }
   
}

