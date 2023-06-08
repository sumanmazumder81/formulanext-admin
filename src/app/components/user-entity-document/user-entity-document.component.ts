import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { UploadImageInterface } from 'src/app/interface/UploadImageInterface';
import { UploadImageService } from 'src/app/services/upload-image.service';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-entity-document',
  templateUrl: './user-entity-document.component.html',
  styleUrls: ['./user-entity-document.component.scss']
})
export class UserEntityDocumentComponent implements OnInit {

  public filteredImageList: UploadImageInterface[] = [];
  @Input('entityType') entityType: vendorEntityType;
  @Input('entityId') entityId: string;
  @Input('ownerData') ownerData: any;
  @Input('vehiclesMedia') vehiclesMedia: any;
  public loader: boolean = false;
  public imageUploadForm: FormData = new FormData();
  public uploadImageList:UploadImageInterface[] = [
    {
      label: 'Aadhar Front',
      key: 'aadhar_front_photo',
      imageUrl: '',
      entityType: [vendorEntityType.OWNER, vendorEntityType.BROKER, vendorEntityType.DRIVER],
  },
  {
      label: 'Aadhar Back',
      key: 'aadhar_back_photo',
      imageUrl: '',
      entityType: [vendorEntityType.OWNER, vendorEntityType.BROKER, vendorEntityType.DRIVER],
  },
  {
    label: 'Selfie Holding Aadhar',
    key: 'selfie_holding_aadhar_photo',
    imageUrl: '',
    entityType: [vendorEntityType.OWNER, vendorEntityType.BROKER, vendorEntityType.DRIVER],
  },
  {
    label: 'Self',
    key: 'self_photo',
    imageUrl: '',
    entityType: [vendorEntityType.OWNER, vendorEntityType.BROKER, vendorEntityType.DRIVER],
  },
  {
    label: 'Pan',
    key: 'pan_photo',
    imageUrl: '',
    entityType: [vendorEntityType.OWNER, vendorEntityType.BROKER, vendorEntityType.DRIVER],
  },
  {
    label: 'Vehicle Front',
    key: 'vehicle_front_photo',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'Vehicle Back',
    key: 'vehicle_back_photo',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'Vehicle Side',
    key: 'vehicle_side_photo',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'RC Card',
    key: 'rc_card_photo',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'Licence Front',
    key: 'licence_front_photo',
    imageUrl: '',
    entityType: [vendorEntityType.DRIVER],
  },
  {
    label: 'Licence Back',
    key: 'licence_back_photo',
    imageUrl: '',
    entityType: [vendorEntityType.DRIVER],
  },
  {
    label: 'Selfie Holding Licence',
    key: 'selfie_holding_licence_photo',
    imageUrl: '',
    entityType: [vendorEntityType.DRIVER],
  },
  {
    label: 'Registration Certificate',
    key: 'registration_certificate_photo',
    imageUrl: '',
    entityType: [vendorEntityType.COMPANY],
  },
  {
    label: 'Road Tax',
    key: 'road_tax',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'National Permit Number',
    key: 'national_permit_number',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'Fitness Certificated',
    key: 'fitness_certificated',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'Insurance',
    key: 'insurance',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'EMI Group',
    key: 'emi_group',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  {
    label: 'Pollution number',
    key: 'pollution_number',
    imageUrl: '',
    entityType: [vendorEntityType.VEHICLE],
  },
  ];

  isComesFromCreate: boolean;

  constructor(
    private uploadocumentService: UploadImageService,
    private toastr: ToastrService,
    private location: Location, 
    private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.entityType,this.entityId);
    console.log(this.activeRouter.snapshot.paramMap.get("id"))
    this.isComesFromCreate = (this.activeRouter.snapshot.paramMap.get("id") || this.activeRouter.snapshot.paramMap.get('userEntityId')) ? false : true; 
    this.imageUploadForm.append("entity_type", this.entityType);
    // this.imageUploadForm.append("entity_id", this.entityId);
    this.filteredImageList = this.uploadImageList.filter(e=> e.entityType.includes(this.entityType));

  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    if(changes.entityId && changes.entityId.currentValue){
      this.imageUploadForm.append("entity_id", this.entityId);
    }
    if(changes.ownerData && changes.ownerData.currentValue){
      console.log(this.entityType, vendorEntityType.VEHICLE);
      
      if(this.entityType === vendorEntityType.VEHICLE){
        this.filteredImageList = this.uploadImageList.filter(e=> {
          if(this.ownerData.meta.emiGroup.isEmi){
            return e.entityType.includes(this.entityType);
          }else{
            return e.entityType.includes(this.entityType) && e.key !== "emi_group" ;
          }
        });
        if(changes.ownerData.currentValue?.meta?.others && changes.ownerData.currentValue?.meta?.others.length){
          console.log(changes.ownerData.currentValue?.meta?.others);
          changes.ownerData.currentValue?.meta?.others.forEach(e=>{
            this.filteredImageList.push({
              label: e.documentName ,
              key: `other_documents_${e.documentName.trim().replace(/\s+/g, '_')}`,
              imageUrl: '',
              entityType: [vendorEntityType.VEHICLE],
            })
          })
        }
        const mediaList = changes.ownerData.currentValue.allMediaKeys;
        this.setImageUrl(mediaList);
      } else {
        const mediaList = changes.ownerData.currentValue.allMediaKeys;
        this.setImageUrl(mediaList);
      }
    }
  }

  setImageUrl(mediaList){
    console.log(mediaList);
      mediaList?.forEach(media=>{
        this.filteredImageList.forEach(e=>{
          if(media === e.key){
            e.imageUrl = `https://dev.formulanextexpress.com/api/Photos?entityType=${this.entityType}&entityId=${this.entityId}&photoKey=${e.key}`
            }
          })
        console.log(this.filteredImageList)
      })
  }

  saveDocument(){
    if(this.isComesFromCreate) {
      let hasNotImage: boolean;
      this.filteredImageList.forEach(e=>{
        console.log(this.imageUploadForm.has(e.key));
        if(!this.imageUploadForm.has(e.key)){
          hasNotImage = true;
        }
      })
      if(hasNotImage){
        return this.toastr.error('Upload all the images');
      }
    }
    this.loader = true;
    this.uploadocumentService.uploadDdocumnts(this.imageUploadForm).subscribe(
      (e: any)=>{
      console.log(e);
      this.toastr.success('Image Uploadd successfully');
      this.location.back();
      this.loader = false;
    }
  ), (error)=>{
    this.loader = false;
  }
  }
}
