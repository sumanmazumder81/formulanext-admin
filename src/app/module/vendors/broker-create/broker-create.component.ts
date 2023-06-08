import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { map, flatMap, mergeMap } from 'rxjs/operators';
import { BrokerService } from '../../../services/broker.service';
import { UserEntitiesService } from '../../../services/user-entities.service';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Location } from '@angular/common';
import { MatStepper } from '../../../../../node_modules/@angular/material/stepper';
import { NotificationService } from '../../../notification.service';




@Component({
  selector: 'app-broker-create',
  templateUrl: './broker-create.component.html',
  styleUrls: ['./broker-create.component.scss']
})
export class BrokerCreateComponent implements OnInit {




  












  public loader: boolean = false;
  isComplete: boolean = false;

  public brokerId: string;
  public brokerObj: any = {};
  public brokerPage: string = vendorEntityType.BROKER;

  // public isActive: boolean;
  public brokerFrom: FormGroup;
  public brokerDataGet: any;
  public isEditable: boolean = true;
  public tradeLicenceThere : boolean = false;
  public stepper: MatStepper;
  public companyStatus: boolean = false;
  public isLinear: boolean = true;



  
  // Address match data
  gstPanMatching: ValidatorFn = (c: AbstractControl): any | null => {
    // alert("loaded");
    console.log("Company status", this.companyStatus);
    if(this.companyStatus){
        console.log("match function call true");
        const gstNumber = (c?.get('userEntity')?.get('company')?.get('primary')?.get('gstNumber').value).toLowerCase();
        const panNumber = (c?.get('userEntity')?.get('pan')?.value).toLowerCase();
        return gstNumber.substr(2, 10) !== panNumber && gstNumber ? { notSame: true } : null;
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
    console.log("status===============", status);
    const companyDetails: FormGroup = this.brokerFrom.get('userEntity').get('company').get('primary') as FormGroup;
    if(status){
      // console.log("status true", status);
      this.companyStatus = status;
      console.log(this.companyStatus);
      // companyDetails.addControl('companyName', new FormControl(''));
      // companyDetails.addControl('gstNumber', new FormControl('', [Validators.maxLength(15), Validators.minLength(15)]));
      // return this.brokerFrom.updateValueAndValidity();
     
    }else if(!status){
      console.log("status false", status);
      this.companyStatus = false;
      console.log(this.companyStatus);
      
    }
  }

  constructor(
    private userEntitieService: UserEntitiesService,
    private brokerService: BrokerService,
    private activeRouter: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) {
    this.brokerFrom = new FormGroup({
      id: new FormControl(''),
      notes: new FormControl(''),
      isActive: new FormControl(true),
      meta: new FormControl(),
      createdDate: new FormControl(),
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
        aadhaar: new FormControl('', Validators.required),
        isCompany: new FormControl(),
        contact: new FormArray([]),
        company: new FormGroup({
          primary: new FormGroup({
            // companyName: new FormControl(''),
            // gstNumber: new FormControl('', [Validators.maxLength(15), Validators.minLength(15)]),
            // tradeLicenceNumber: new FormControl(null),
            // expireDate: new FormControl(null, Validators.required),
          }),
        }),
        address: new FormGroup({
          primary: new FormGroup({
            streetNo: new FormControl('', Validators.required),
            streetName: new FormControl('', Validators.required),
            landmark: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            zipCode: new FormControl('', Validators.required),
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
        // media: new FormGroup({
        //   primary: new FormGroup({
        //     media: new FormControl(''),
        //   }),
        // }),
      }),
    }, { validators: [this.gstPanMatching] });
  }


 



  contact: FormGroup = new FormGroup({
    contactPersonName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
      // Validators.email,
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

  public userEntitId: number | string;
  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get("id");
    const userEntitId = this.activeRouter.snapshot.paramMap.get("userEntityId");
    this.userEntitId = userEntitId;
    this.brokerId = id;
    if (id) {
      this.getUrl(id)
    } else if (userEntitId) {
      this.brokerCopy(userEntitId, this.stepper);
    } else {
      const contacts = this.brokerFrom.get("userEntity").get("contact") as FormArray;
      contacts.push(this.contact);
      const contactList = contacts.controls[0]['controls'].contactList as FormArray;
      contactList.push(this.contactList)
      this.brokerFrom.controls['userEntity']['controls']["contact"].updateValueAndValidity();
    }
  }
  
  saveBrokerAdd(stepper: MatStepper) {
    
    // if(this.companyStatus){
      console.log(!!this.brokerFrom.get('userEntity')?.get('company')?.get('primary').get('companyName'));
      if(!!this.brokerFrom.get('userEntity')?.get('company')?.get('primary').get('companyName')){
        this.brokerFrom.patchValue({
          userEntity:{
            isCompany: true,
          }
        });

      }else{
        this.brokerFrom.patchValue({
          userEntity:{
            isCompany: false,
          }
        });
      }
    // }
    // console.log(this.brokerFrom.value.userEntity);
    console.log(this.brokerFrom.value.userEntity);
    if(this.userEntitId){
      this.loader = true;
      const brokerObj = {
        userEntityId: this.userEntitId,
        notes: this.brokerFrom.value['notes'],
      }
      this.brokerService.brokerAdd(brokerObj).subscribe((data: any)=>{
        console.log(data);
        this.loader = false;
        this.brokerId = data.id;
        this.brokerDataGet =data;
      }, err=>{
        this.loader = false;
      })
    } else {
      this.loader = true;
      if(!this.brokerId){
        this.userEntitieService.userEntities(this.brokerFrom.value.userEntity).pipe(
          map((resp: any) => {
            this.brokerObj = {
              userEntityId: resp.id,
              notes: this.brokerFrom.value['notes'],
            }
            return resp;
          }),
          flatMap(param => {
            // console.log(this.brokerObj)
            return this.brokerService.brokerAdd(this.brokerObj).pipe(
              map(resp => {
                return resp;
              })
            )
          })
        ).subscribe(
          (resp: any) => {
            this.loader = false;
            this.isComplete = true;
            // console.log(resp);
            this.brokerId = resp.id;
            this.brokerDataGet = resp;
            // setTimeout(() => {
            //   stepper.next();
            // }, 100);
            this.location.replaceState(`/dashboard/vendors/broker/brokerCreate/${resp.id}`);
            this.notificationService.showSuccess("Saved successfully", 'Owner');
            // this.postUserEntityMamager.sendMessageObj({ Message: "UECreated", UE_id: 'resp.id', caller: this.Userentitieseervice.getCaller('owner') })
            // this._router.navigateByUrl('dashboard/vendor/brokerList');
            this.isLinear = false;
          },
          (error) => {
            console.log(error);
            this.loader = false;
            this.isComplete = false;
          }, () => {
            this.loader = false
          }
        )
      }
    }
  }

  patchData(data: any) {
    console.log("Dataaaaaaaaaaaaaaaaaaaaaa", data);
    //Edit data upi list
    for (let i = 1; i < data.userEntity.bankDetail.primary.upiList.length; i++) {
      const add = this.brokerFrom.get('userEntity').get('bankDetail').get('primary').get('upiList') as FormArray;
      add.push(this.formBuilder.group({
        UPIId: new FormControl(''),
      }));
    }
    //Edit data contact List
    for (let i = 0; i < data.userEntity.contact.length; i++) {
      const add = this.brokerFrom.get('userEntity').get('contact') as FormArray;
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
      streetNo: new FormControl(''),
      streetName: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl('', [Validators.minLength(6), Validators.maxLength(6)]),
    });
    const addressFormGroup: FormGroup = this.brokerFrom.get('userEntity').get('address') as FormGroup;
    if(!data.userEntity.isPresentAddressSameAsPrimary){
      this.brokerFrom.get('userEntity').get('isPresentAddressSameAsPrimary').setValue(false);
      addressFormGroup.addControl('present', presentAddressControl);
    }else{
      this.brokerFrom.get('userEntity').get('isPresentAddressSameAsPrimary').setValue(true);
      addressFormGroup.removeControl('present')
    }
    console.log(this.brokerFrom);
    this.brokerFrom.patchValue(data);
  }

  getcontactListArrayData(data:any): any[] {
    const contactList = [];
    for (let i = 0; i < data.length; i++) {
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
  getUrl(id:any) {
    this.loader = true;
    this.brokerService.brokerGetData(id).subscribe(
      (success: any) => {
        this.loader = false;
        this.isComplete = true;
        // console.log(success);
        this.isEditable = success['meta'].IsEditable;
        // this.isEditable = false;
        this.brokerDataGet = success;
        if (this.isEditable) {
          this.brokerFrom.enable();
        } else {
          this.brokerFrom.disable();
        }
        // if(this.brokerFrom.get('userEntity').get('isPresentAddressSameAsPrimary').value){
        //   alert("value");
        //   console.log(this.brokerFrom.get('userEntity').get('isPresentAddressSameAsPrimary').setValue(true));
        //   this.brokerFrom.get('userEntity').get('isPresentAddressSameAsPrimary').setValue(false);
        // }
        if(success.userEntity.company.primary.expireDate){
          this.tradeLicenceThere = true;
          const tradeLicence: FormGroup = this.brokerFrom.get('userEntity').get('company').get('primary') as FormGroup;
          tradeLicence.addControl('tradeLicenceNumber', new FormControl(''));
          tradeLicence.addControl('expireDate', new FormControl('', Validators.required));
          this.brokerFrom.updateValueAndValidity(); 
        }
        this.patchData(success);
        // console.log(success.userEntity.bankDetail.primary.upiList);              
      }
    ), (error:any) => {
      console.log(error);
      this.isComplete = true;
      this.loader = false;
    }, () => {
      this.loader = false;
    }
  }


  editBrokerEntity(stepper: MatStepper) {
    this.loader = true;
    console.log(this.brokerFrom.get('isActive').value);
    this.brokerFrom.patchValue({
      id: this.brokerId,
      // isActive: this.brokerFrom.value.isActive,
      // notes: this.brokerFrom.value.notes,
    });
    this.brokerFrom.patchValue({
      userEntity:{
        isCompany: !!this.brokerFrom.get('userEntity').get('company').get('primary'),
      }
    });
    // console.log(this.brokerFrom.value);
    this.brokerService.brokerEdit(this.brokerId, this.brokerFrom.value).subscribe(
      (success) => {
        console.log(success);
        this.loader = false;
        this.notificationService.showSuccess("Update successfully", 'Owner');
        setTimeout(() => {
          stepper.next();
        }, 10);
        this.isComplete = true;
        // this._router.navigateByUrl('dashboard/master/licenceClassList');
      }, (error) => {
        console.log(error);
        this.loader = false;
        this.isComplete = false;
      }
    )
  }

  brokerCopy(userEntitId, stepper: MatStepper) {
        this.loader = true;
        this.userEntitieService.getUserData(userEntitId).subscribe(
          (success: any) => {
            console.log(success);
            this.patchData({userEntity: success, allMediaKeys: success?.allMediaKeys});
            this.brokerFrom.get('userEntity').disable();
            this.brokerFrom.get('notes').disable();
            setTimeout(() => {
              stepper.next();
            }, 10);
            this.isComplete = true;
            this.loader = false;
            
          }, (error: any) => {
            this.loader = false;
          }, () => {
            this.loader = false;
          }
        )
  }
}
