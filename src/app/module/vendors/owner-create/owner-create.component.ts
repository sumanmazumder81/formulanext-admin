import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, ValidatorFn, AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { UserEntitiesService } from '../../../services/user-entities.service';
import { OwnerAddService } from '../../../services/owner-add.service';
import { map, flatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { OwnerListService } from '../../../services/owner-list.service';
import { Location } from '@angular/common';
import { MatStepper } from '../../../../../node_modules/@angular/material/stepper';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.scss']
})

export class OwnerCreateComponent implements OnInit {

  isComplete: boolean = false;
  public loader: boolean = false;
  public ownerId: number = 0;

  // public param: any;
  public ownerObj: any = {};
  public ownerPage: string = vendorEntityType.OWNER;


  public isActive: boolean = false;
  public userEntityId: number = 0;
  public ownerDataGet: any;
  public searchRelatedEntitys: any;
  public brokersList: any;
  public driverList: any;
  public ownerFrom: FormGroup;
  public isEditable: boolean = true;
  public companyStatus: boolean = false;


   // Address match data
  gstPanMatching: ValidatorFn = (c: AbstractControl): any | null => {
      if(this.companyStatus){
      const gstNumber = (c.get('userEntity').get('company').get('primary').get('gstNumber').value).toLowerCase();
      const panNumber = (c.get('userEntity').get('pan').value).toLowerCase();
      return gstNumber.substr(2, 10) !== panNumber && gstNumber ? { notSame: true } : null
    }
    else if(!this.companyStatus){
      console.log("match function call false");
      // const companyDetails: FormGroup = this.brokerFrom.get('userEntity').get('company').get('primary') as FormGroup;
      // companyDetails.removeControl("companyName");
      // companyDetails.removeControl("gstNumber");
      // return this.brokerFrom.updateValueAndValidity();
    }
  }
  
  companyStatusSend(status:any){
    const companyDetails: FormGroup = this.ownerFrom.get('userEntity').get('company').get('primary') as FormGroup;
    if(status){
      console.log("status true", status);
      this.companyStatus = status;
      // return this.brokerFrom.updateValueAndValidity();
     
    }else if(!status){
      console.log("status false", status);
      this.companyStatus = false;
      // companyDetails.removeControl("companyName");
      // companyDetails.removeControl("gstNumber");
      // return this.brokerFrom.updateValueAndValidity();
    }
  }

  // Contact match data
  // contactMatchValidator: ValidatorFn = (controls: FormGroup): any | null => {

  //   for(let i=1; i < (controls.get('userEntity')?.get('contact')['controls'].length); i++){
  //     if(controls.get('userEntity')?.get('contact')['controls'].every(ele => ele.contactPersonName == controls.get('userEntity')?.get('contact')['controls'][i].contactPersonName)){
  //       console.log(controls.get('userEntity')?.get('contact')['controls'][i].get('contactPersonName').setErrors({'contactPersonName': true}));
  //       // console.log (controls.get('userEntity')?.get('contact')['controls'][i].get('contactPersonName'));  
  //       return {}  
  //     }else{
  //       console.log(controls.get('userEntity')?.get('contact')['controls'][i].get('contactPersonName').setErrors(null));
  //     }
  //   }
  // }
  constructor(
    private userEntitieService: UserEntitiesService,
    private ownerService: OwnerAddService,
    private activeRouter: ActivatedRoute,
    private ownerListService: OwnerListService,
    private location: Location,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) {
    // this.ownerFrom.setValidators(this.PanGstValidation())
    this.ownerFrom = new FormGroup({
      id: new FormControl(''),
      // media: new FormControl(),
      createdDate: new FormControl(),
      meta: new FormControl(),
      notes: new FormControl(''),
      isActive: new FormControl(),
      tags: new FormArray([]),
      brokers: new FormControl(''),
      // drivers: new FormControl(''),
      // vehicles: new FormArray([]),
      subUsers: new FormArray([]),
      licenceClasses: new FormArray([]),

      userEntity: new FormGroup({
        isPresentAddressSameAsPrimary: new FormControl(true),
        fullName: new FormControl('', Validators.required),
        pan: new FormControl('',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
          ],
        ),
        aadhaar: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(12)]),
        isCompany: new FormControl(''),
        contact: new FormArray([]),
        company: new FormGroup({
          primary: new FormGroup({}),
        }),
        address: new FormGroup({
          primary: new FormGroup({
            streetNo: new FormControl('', Validators.required),
            streetName: new FormControl('', Validators.required),
            landmark: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            zipCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
          }),
        }),
        bankDetail: new FormGroup({
          primary: new FormGroup({
            accountHolderName: new FormControl('', Validators.required),
            nickName: new FormControl('', Validators.required),
            bankName: new FormControl('', Validators.required),
            IFSCCode: new FormControl('', Validators.required),
            accountNumber: new FormControl('', Validators.required),
            accountType: new FormControl('', Validators.required),
            upiList: new FormArray([
              new FormGroup({
                UPIId: new FormControl(''),
              })
            ]),
          }),
        }),
        meta: new FormGroup({}),
      },
      ),
    },
      { validators: this.gstPanMatching }
    );
  }
  contact: FormGroup = new FormGroup({
    contactPersonName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    contactList: new FormArray([]),
    primary: new FormControl(true),
  })
  contactList: FormGroup = new FormGroup({
    contactNo: new FormControl('', [
      Validators.required,
      Validators.min(1000000000), Validators.max(99999999999)
    ]),
    whatappStatus: new FormControl(false),
  });
  private userEntitId: number | string;
  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get("id");
    const userEntitId = this.activeRouter.snapshot.paramMap.get("userEntityId");
    this.userEntitId = userEntitId;
    console.log(userEntitId);
    this.ownerId = Number(id);
    if (id) {
      this.getUrl();
    } else if (userEntitId) {
      this.ownwrCopy(userEntitId);
    } else {
      const contacts = this.ownerFrom.get("userEntity").get("contact") as FormArray;
      contacts.push(this.contact);
      const contactList = contacts.controls[0]['controls'].contactList as FormArray;
      contactList.push(this.contactList)
      this.ownerFrom.controls['userEntity']['controls']["contact"].updateValueAndValidity();
    }
  }
  
  saveOwnerAdd(stepper: MatStepper) {
    console.log(this.ownerFrom.value);
    for(let i=0; i < this.ownerFrom.get('userEntity').get('contact')['controls'].length; i++){
      console.log(this.ownerFrom.get('userEntity')?.get('contact')['controls'][i].get('contactList'));
      let contactListed = this.ownerFrom.get('userEntity')?.get('contact')['controls'][i]?.get('contactList') as FormArray;
      for(let j=0; j < contactListed.value.length; j++){
        console.log('matched');
      }

      if(this.ownerFrom.get('userEntity')?.get('contact')['controls'][i]?.get('contactPersonName').value === this.ownerFrom.get('userEntity')?.get('contact')['controls'][1]?.get('contactPersonName').value){
        alert('Contact person name matched');
        this.ownerFrom.get('userEntity')?.get('contact')['controls'][i]?.get('contactPersonName').setErrors({'contactCheck': true})
      }
      if(this.ownerFrom.get('userEntity')?.get('contact')['controls'][i]?.get('email').value === this.ownerFrom.get('userEntity')?.get('contact')['controls'][1]?.get('email').value){
        this.ownerFrom.get('userEntity').get('contact')['controls'][i].get('email').setErrors({'contactCheck': true})
        
      }
      else{
        this.ownerFrom.get('userEntity').get('contact')['controls'][i].get('contactPersonName').setErrors(null)
        this.ownerFrom.get('userEntity').get('contact')['controls'][i].get('email').setErrors(null)
      }
    }
    
    // this.ownerFrom.patchValue({
    //   userEntity: {
    //     isCompany: !!this.ownerFrom.get('userEntity').get('company').get('primary').get('companyName').value,
    //   }
    // });
    console.log(!!this.ownerFrom.get('userEntity')?.get('company')?.get('primary').get('companyName'));
      if(!!this.ownerFrom.get('userEntity')?.get('company')?.get('primary').get('companyName')){
        this.ownerFrom.patchValue({
          userEntity:{
            isCompany: true,
          }
        });

      }else{
        this.ownerFrom.patchValue({
          userEntity:{
            isCompany: false,
          }
        });
      }
    console.log(this.ownerFrom.value.userEntity);
    if (this.userEntitId) {
      this.loader = true;
      const ownerObj = {
        userEntityId: this.userEntitId,
        notes: this.ownerFrom.value['notes'],
        brokers: this.ownerFrom.value.brokers ? this.ownerFrom.value.brokers : 0,
      }
      this.ownerService.ownerAdd(ownerObj).subscribe((data: any) => {
        console.log(data);
        this.ownerDataGet = data;
        this.ownerId = data.id;
        this.userEntityId = data.id;
        this.loader = false;
      }, err => {
        this.loader = false;
      })
    } else {
      this.loader = true;
      this.userEntitieService.userEntities(this.ownerFrom.value.userEntity).pipe(
        map((resp: any) => {
          console.log(this.userEntityId);
          this.ownerObj = {
            userEntityId: resp.id,
            notes: this.ownerFrom.value['notes'],
            brokers: this.ownerFrom.value.brokers ? this.ownerFrom.value.brokers : 0,
          }
          return resp;
        }),
        flatMap(param => {
          console.log(this.ownerObj);
          return this.ownerService.ownerAdd(this.ownerObj).pipe(
            map(resp => {
              return resp;
            })
          )
        })
      ).subscribe(
        (resp: any) => {
          this.loader = false;
          this.ownerDataGet = resp;
          this.userEntityId = resp.id;
          this.isComplete = true;
          console.log(resp);
          setTimeout(() => {
            stepper.next();
          }, 10);
          this.location.replaceState(`/dashboard/vendors/owner/ownerCreate/${resp.id}`);
          this.notificationService.showSuccess("Saved successfully", 'Owner');
        },
        (error) => {
          this.loader = false;
          this.isComplete = false;
        }
      )
    }
  }
  patchData(data: any) {
    //Edit data upi list
    for (let i = 1; i < data.userEntity.bankDetail.primary.upiList.length; i++) {
      const add = this.ownerFrom.get('userEntity').get('bankDetail').get('primary').get('upiList') as FormArray;
      add.push(this.formBuilder.group({
        UPIId: new FormControl(''),
      }));
    }
    //Edit data contact list
    for (let i = 0; i < data.userEntity.contact.length; i++) {
      const add = this.ownerFrom.get('userEntity').get('contact') as FormArray;
      add.push(new FormGroup({
        contactPersonName: new FormControl('', Validators.required),
        email: new FormControl('', [
          Validators.required,
          // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
          Validators.email,
        ]),
        contactList: new FormArray(this.getcontactListArrayData(data.userEntity.contact[i].contactList)),
        primary: new FormControl(true),
      }))
    }
    //Edit data address list
    console.log(data['userEntity'].isPresentAddressSameAsPrimary);
    let presentAddressControl = new FormGroup({
      streetNo: new FormControl('', Validators.required),
      streetName: new FormControl('', Validators.required),
      landmark: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    });
    const addressFormGroup: FormGroup = this.ownerFrom.get('userEntity').get('address') as FormGroup;
    if (!data.userEntity.isPresentAddressSameAsPrimary) {
      this.ownerFrom.get('userEntity').get('isPresentAddressSameAsPrimary').setValue(false);
      addressFormGroup.addControl('present', presentAddressControl);
    } else {
      this.ownerFrom.get('userEntity').get('isPresentAddressSameAsPrimary').setValue(true);
      addressFormGroup.removeControl('present')
    }
    console.log(this.ownerFrom);
    this.ownerFrom.patchValue(data);
  }

  getcontactListArrayData(data): any[] {
    const contactList = [];
    for (let i = 0; i < data ?.length; i++) {
      contactList.push(new FormGroup({
        contactNo: new FormControl('', [
          Validators.required,
          Validators.min(1000000000), Validators.max(99999999999)
        ]),
        whatappStatus: new FormControl(false),
      }));
    }
    return contactList;
  }
  getUrl() {
    this.loader = false;
    const id = this.activeRouter.snapshot.paramMap.get('id');
    this.ownerId = Number(id);
    this.userEntityId = Number(id);
    if (id) {
      this.loader = true;
      const one = this.ownerListService.ownerGetData(id);
      const two = this.ownerListService.ownerGetSearchRelatedEntities(id);
      forkJoin([one, two]).subscribe(
        (success) => {
          this.loader = false;
          console.log(success);
          this.isEditable = success[0]['meta'] ?.IsEditable;
          if (success[0]['meta'].IsEditable) {
            this.ownerFrom.enable();
          } else {
            this.ownerFrom.disable();
          }
          this.ownerDataGet = success[0];
          this.patchData(success[0]);
          this.ownerFrom.get('brokers').setValue(success[0]['brokers'][0]);
          console.log(this.ownerFrom);

          this.searchRelatedEntitys = success[1];
          console.log(this.ownerFrom);

        }, (error) => {
          this.loader = false;
          console.log(error);
        }
      )
    }
  }
  editBrokerList(data) {
    console.log(data);
    this.brokersList = data;
  }
  editDriverList(data) {
    console.log(data);
    this.driverList = data;
  }

  editOwnerEntity(stepper: MatStepper): void {
    this.loader = true;
    console.log(this.ownerDataGet);
    console.log(this.ownerFrom.value);
    const data = this.ownerFrom.value;
    data.brokers = [this.ownerFrom.value.brokers]
    console.log(data, this.ownerFrom);
    this.ownerFrom.patchValue({
      userEntity: {
        isCompany: !!this.ownerFrom.get('userEntity').get('company').get('primary').get('companyName').value,
      }
    });
    this.ownerListService.ownerEdit(this.userEntityId, data).subscribe(
      (success) => {
        console.log(success);
        this.loader = false;
        this.notificationService.showSuccess("Update successfully", 'Owner');
        setTimeout(() => {
          stepper.next();
        }, 10);
        this.isComplete = true;
      }, (error) => {
        console.log(error);
        this.loader = false;
        this.isComplete = false;
      }, () => {
        this.loader = false;
      }
    )
  }
  ownwrCopy(userEntitId) {
    this.loader = true;
    this.userEntitieService.getUserData(userEntitId).subscribe(
      (success: any) => {
        console.log(success);
        this.patchData({ userEntity: success, allMediaKeys: success ?.allMediaKeys});
        this.ownerDataGet = { userEntity: success, allMediaKeys: success ?.allMediaKeys};
        this.loader = false;
      }, (error: any) => {
        this.loader = false;
      }, () => {
        this.loader = false;
      }
    )
  }
}

function Validateaddress(control: AbstractControl): {[key: string]: any} | null  {
  console.log(control);
  // if (control.value && control.value.length != 10) {
    return { 'vatMatchesName': true };
  // }
  return null;
}
