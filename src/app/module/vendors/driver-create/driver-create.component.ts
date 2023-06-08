import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { map, flatMap, mergeMap } from "rxjs/operators";
import { UserEntitiesService } from "../../../services/user-entities.service";
import { DriverService } from "../../../services/driver.service";
import { vendorEntityType } from "src/app/enums/vendorsEntity.enum";
import { ActivatedRoute } from "../../../../../node_modules/@angular/router";
import { Location } from "@angular/common";
import { MatStepper } from '../../../../../node_modules/@angular/material/stepper';

@Component({
  selector: "app-driver-create",
  templateUrl: "./driver-create.component.html",
  styleUrls: ["./driver-create.component.scss"],
})
export class DriverCreateComponent implements OnInit {
  public isLinear: boolean = true;
  public loader: boolean = false;
  public driverId: number | string = 0;
  public driverObj: any = {};
  public driverPage: string = vendorEntityType.DRIVER;

  // public isCompany: boolean = true;
  public isActive: boolean = true;
  public ownerId: number;
  public licenceClasses: any;
  public licenceClassListData: any[] = [];
  public driverFrom: FormGroup;
  public driverDataGet: any;
  public isEditable: boolean = true;
  isComplete: boolean = false;
  public stepper: MatStepper;
  passwordConfirming: ValidatorFn = (c: AbstractControl): any | null => {
    const gstNumber = c
      .get("userEntity")
      .get("company")
      .get("primary")
      .get("gstNumber").value;
    const panNumber = c.get("userEntity").get("pan").value;
    return gstNumber.substr(2, 10) !== panNumber && gstNumber
      ? { notSame: true }
      : null;
  };
  // Driver form Group
  constructor(
    private userEntitieService: UserEntitiesService,
    private driverService: DriverService,
    private activeRouter: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.driverFrom = new FormGroup(
      {
        id: new FormControl(""),
        notes: new FormControl(""),
        isActive: new FormControl(),
        createdDate: new FormControl(),
        licenceExpiry: new FormControl('', Validators.required),
        licenceNo: new FormControl('', Validators.required),
        ownerId: new FormControl(null),
        licenceClasses: new FormControl(Validators.required),
        userEntity: new FormGroup({
          isPresentAddressSameAsPrimary: new FormControl(true),
          fullName: new FormControl("", Validators.required),
          // pan: new FormControl("", [
          //   Validators.maxLength(10),
          //   Validators.minLength(10),
          // ]),
          // aadhaar: new FormControl("", [
          //   Validators.required,
          //   Validators.maxLength(12),
          //   Validators.minLength(12),
          // ]),
          // isCompany: new FormControl(),

          contact: new FormArray([]),
          // company: new FormGroup({
          //   primary: new FormGroup({
          //     // companyName: new FormControl(""),
          //     // gstNumber: new FormControl(
          //     //   "",
          //     //   Validators.compose([
          //     //     Validators.maxLength(15),
          //     //     Validators.minLength(15),
          //     //   ])
          //     // ),
          //     tradeLicenceNumber: new FormControl(""),
          //   }),
          // }),
          address: new FormGroup({
            primary: new FormGroup({
              streetNo: new FormControl("", Validators.required),
              streetName: new FormControl("", Validators.required),
              landmark: new FormControl("", Validators.required),
              city: new FormControl("", Validators.required),
              state: new FormControl("", Validators.required),
              zipCode: new FormControl("", [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6),
              ]),
            }),
          }),
          bankDetail: new FormGroup({
            primary: new FormGroup({
              accountHolderName: new FormControl(""),
              nickName: new FormControl(""),
              bankName: new FormControl(""),
              IFSCCode: new FormControl(""),
              accountNumber: new FormControl(""),
              accountType: new FormControl(""),
              upiList: new FormArray([
                new FormGroup({
                  UPIId: new FormControl(""),
                }),
              ]),
            }),
          }),
          // meta: new FormGroup({
          //   ownerId: new FormControl(null),
          //   IsEditable: new FormControl(),
          //   VendorCode: new FormControl(),
          // }),
        }),
        meta: new FormGroup({
            ownerId: new FormControl(null),
          }),
      },
      // this.passwordConfirming
    );
  }
  contact: FormGroup = new FormGroup({
    contactPersonName: new FormControl("", Validators.required),
    email: new FormControl("", [
      Validators.email,
    ]),
    contactList: new FormArray([]),
    primary: new FormControl(true),
  });
  contactList: FormGroup = new FormGroup({
    contactNo: new FormControl("", [
      Validators.required,
      Validators.min(1000000000),
      Validators.max(99999999999),
    ]),
    whatappStatus: new FormControl(false),
  });
  private userEntitId: number | string;
  ngOnInit(): void {
    // console.log(this.driverPage);
    const id = this.activeRouter.snapshot.paramMap.get("id");
    const userEntitId = this.activeRouter.snapshot.paramMap.get("userEntityId");
    this.userEntitId = userEntitId;
    this.driverId = id;
    if (id) {
      this.getUrl(id);
    } else if (userEntitId) {
      this.driverCopy(userEntitId, this.stepper);
    } else {
      // this.driverFrom.get("userEntity").get("contact")["controls"].push(this.contact);
      // this.driverFrom.get("userEntity").get("contact")["controls"][0].get("contactList").push(this.contactList);
      const contacts = this.driverFrom.get("userEntity").get("contact") as FormArray;
      contacts.push(this.contact);
      const contactList = contacts.controls[0]['controls'].contactList as FormArray;
      contactList.push(this.contactList)
      this.driverFrom.controls['userEntity']['controls']["contact"].updateValueAndValidity();
    }
    console.log(this.driverFrom);
  }
  ownerIdSend(data) {
    console.log(data);
    this.ownerId = data;
  }
  // isCompanyIndifier(data: boolean) {
  //   console.log(data);
  //   if (data == true) {
  //     this.isCompany = true;
  //     console.log(this.isCompany);
  //   }
  // }
  saveDriverAdd(stepper: MatStepper) {
    console.log(this.driverFrom.value,);
    // this.driverFrom.patchValue({
    //   userEntity: {
    //     isCompany: this.isCompany,
    //   },
    // });

    // this.driverFrom.patchValue({
    //   licenceClasses: this.licenceClasses,
    // });
    this.driverFrom.removeControl('meta');
    console.log(this.driverFrom.value);
    if(this.userEntitId){
      this.loader = true;
      const driverObj = {
        userEntityId: this.userEntitId,
        ownerId: this.driverFrom.value.ownerId ? this.driverFrom.value.ownerId : 0,
        notes: this.driverFrom.value["notes"],
        licenceClasses: this.licenceClasses
      };
      this.driverService.driverAdd(driverObj).subscribe((data: any)=>{
        console.log(data);
        this.driverDataGet = data;
        this.driverId = data.id;
        this.loader = false;
      }, err=>{
        this.loader = false;
      });
    } else {
      this.loader = true;
      this.userEntitieService
        .userEntities(this.driverFrom.value.userEntity)
        .pipe(
          map((resp: any) => {
            console.log(resp);
            this.driverObj = {
              userEntityId: resp.id,
              ownerId: this.driverFrom.value.ownerId ? this.driverFrom.value.ownerId : 0,
              notes: this.driverFrom.value["notes"],
              licenceNo: this.driverFrom.value['licenceNo'],
              licenceExpiry: this.driverFrom.value['licenceExpiry'],
              licenceClasses: this.licenceClasses
            };
            console.log(this.driverObj);
            return resp;
          }),
          flatMap((param) => {
            console.log(this.driverObj);
            return this.driverService.driverAdd(this.driverObj).pipe(
              map((resp) => {
                return resp;
              })
            );
          })
        )
        .subscribe(
          (resp: any) => {
            console.log(resp);
            this.loader = false;
            this.driverId = resp.id;
            this.driverDataGet = resp;
            this.isComplete = true;
            setTimeout(() => {
              stepper.next();
            }, 10);
            this.location.replaceState(
              `/dashboard/vendors/driver/driverCreate/${resp.id}`
            );
            // this.postUserEntityMamager.sendMessageObj({ Message: "UECreated", UE_id: 'resp.id', caller: this.Userentitieseervice.getCaller('owner') })
            // this._router.navigateByUrl('dashboard/vendor/ownerList');
          },
          (error) => {
            console.log(error);
            this.loader = false;
            this.isComplete = false;
          }
        );
    }
  }

  patchData(data:any){
    //Edit data upi list
    for(let i=1; i<data.userEntity.bankDetail.primary.upiList.length; i++){
      const add = this.driverFrom.get('userEntity').get('bankDetail').get('primary').get('upiList') as FormArray;
      add.push(this.formBuilder.group({
        UPIId: new FormControl(''),
      }));
    }
    //Edit data contact List
    for(let i=0; i<data.userEntity.contact.length; i++){
      const add = this.driverFrom.get('userEntity').get('contact') as FormArray;
      add.push(new FormGroup({
        contactPersonName: new FormControl('', Validators.required),
        email: new FormControl('', [
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
    const addressFormGroup: FormGroup = this.driverFrom.get('userEntity').get('address') as FormGroup;
    if(!data.userEntity.isPresentAddressSameAsPrimary){
      this.driverFrom.get('userEntity').get('isPresentAddressSameAsPrimary').setValue(false);
      addressFormGroup.addControl('present', presentAddressControl);
    }else{
      this.driverFrom.get('userEntity').get('isPresentAddressSameAsPrimary').setValue(true);
      addressFormGroup.removeControl('present')
    }
    console.log(this.driverFrom);
    this.driverFrom.patchValue(data);
  }

  getcontactListArrayData(data):any[]{
    const contactList = []; 
    for(let i=0; i< data?.length; i++){
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
  getUrl(id) {
    this.loader = true;
    this.driverService.driverGetData(id).subscribe((success: any) => {
      this.loader = false;
      console.log(this.driverFrom);
      this.driverFrom.get("ownerId").setValue(Number(success["meta"]?.ownerId));
      this.driverFrom.get("ownerId").disable();
      this.driverDataGet = success;
      this.isEditable = success["meta"]?.IsEditable;
      if (success["meta"]?.IsEditable) {
        this.driverFrom.enable();
      } else {
        this.driverFrom.disable();
      }
      this.patchData(success);
      
      this.licenceClassListData =
        success?.licenceClasses && success?.licenceClasses.length
          ? success.licenceClasses
          : [];
    }),
      (error) => {
        this.loader = false;
      },
      () => {
        this.loader = false;
      };
  }
  licenceClass(data) {
    console.log(data);
    this.licenceClasses = data;
  }
  editDriver(stepper: MatStepper) {
    console.log(this.driverFrom.get('ownerId').value);    
    this.loader = true;
    this.driverFrom.patchValue({
      meta:{
        ownerId: this.driverFrom.get('ownerId').value
      },
      licenceClasses: this.licenceClasses,
    });
    // this.driverFrom.get('meta').get('ownerId').setValue(this.driverFrom.value.ownerId)
    console.log(this.driverFrom.value);
    this.driverService
      .driverEdit(this.driverId, this.driverFrom.value)
      .subscribe(
        (success) => {
          console.log(success);
          this.loader = false;
          setTimeout(() => {
            stepper.next();
          }, 10);
          this.isComplete = true;
          // this._router.navigateByUrl('dashboard/master/licenceClassList');
        },
        (error) => {
          console.log(error);
          this.loader = false;
          this.isComplete = false;
        }
      );
  }
  driverCopy(userEntityId, stepper) {
    this.loader = true;
    this.userEntitieService.getUserData(userEntityId).subscribe(
      (success: any) => {
        console.log(success);
        this.patchData({userEntity: success, allMediaKeys: success?.allMediaKeys});
        this.driverDataGet = {userEntity: success, allMediaKeys: success?.allMediaKeys};
        this.driverFrom.patchValue({
          meta:{
            ownerId: this.driverFrom.get('ownerId').value
          },
          licenceClasses: this.licenceClasses,
        });
        this.driverFrom.get('userEntity').disable();
        this.driverFrom.get('notes').disable();
          setTimeout(() => {
            stepper.next();
          }, 10);
          this.isComplete = true;
        this.loader = false;
      },
      (error: any) => {
        this.loader = false;
      },
      () => {
        this.loader = false;
      }
    );
  }
}
