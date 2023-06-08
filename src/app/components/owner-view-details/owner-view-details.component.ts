import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { OwnerListService } from 'src/app/services/owner-list.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { OwnerVehiclesComponent } from '../../components/owner-vehicles/owner-vehicles.component';
import { MatTabGroup } from '../../../../node_modules/@angular/material/tabs';
@Component({
  selector: 'app-owner-view-details',
  templateUrl: './owner-view-details.component.html',
  styleUrls: ['./owner-view-details.component.scss']
})
export class OwnerViewDetailsComponent implements OnInit {
  public totalOwnerData:any;
  public driverTableData:any;
  public brokerTableData:any;
  public vehiclesTableData:any;
  public loader : boolean = false;
  public pageSize: number = 5;
  public pageIndex: number = 1;
  public dataLength: number;
  // public pageTitle: string = "";
  private dialogConfig = new MatDialogConfig();

  displayedColumns: any[] = [
    {label: 'Select', key: 'checkBox'},
    {label: 'Id', key: 'id'},
    {label: 'Driver Name', key: 'userEntity.fullName'},
    {label: 'Contact No', key: 'userEntity.contact[0].contactList[0]contactNo'},
    {label: 'status', key: 'isActive'},
    
  ];
  displayedColumnsBroker: any[] = [
    {label: 'Id', key: 'id'},
    {label: 'Broker Name', key: 'userEntity.fullName'},
    {label: 'Contact No', key: 'userEntity.contact[0].contactList[0]contactNo'},
    {label: 'status', key: 'isActive'},
    
  ];
  displayedColumnsVehicles: any[] = [
    {label: 'Select', key: 'checkBox'},
    {label: 'Id', key: 'id'},
    {label: 'Engine No', key: 'engineNo'},
    {label: 'Chassis No', key: 'chassisNo'},
    {label: 'status', key: 'isActive'},
    
  ];
  public myDialog = new MatDialogConfig();
  public searchString: string = '';
  public deleteArrayUserEntity = [];
  public totalVehiclesId: number[] = [];
  public totalDriverId: number[] = [];
  public refreshArray: any;
  public ownerId : string;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  public deletePopup: boolean = false;
  public userType : string = "";
  constructor(
    private OwnerListService: OwnerListService,
    private activeRouter: ActivatedRoute,
    public dialog: MatDialog,
  ) { 
    this.dialogConfig.disableClose = true;
    this.dialogConfig.width = '100%';
    this.dialogConfig.height = '100%';
    this.dialogConfig.maxHeight = '100vh';
    this.dialogConfig.maxWidth = '100vw';;
  }

  ngOnInit(): void {
    this.getUrl(this.pageIndex, this.pageSize, this.searchString);
  }


  

  delete(id){
    console.log(id);
    this.loader = false;
    // this.brokerService.brokerDelete(id).subscribe(
    //   (success) => {
    //     console.log(success);
    //     this.brokerList(this.pageIndex, this.pageSize, this.searchString);
    //     this.loader = false;
    //     this.notification.showSuccess('Delete', 'Successfully');
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }
  getUrl(page, pageSize, searchString){
    const id = this.activeRouter.snapshot.paramMap.get('id');
    console.log(id);
    this.ownerId = id;
    this.OwnerListService.ownerGetSearchRelatedEntities(id).subscribe(
      (success:any)=>{
        console.log(success);
        this.totalOwnerData = success;
        if(success['brokers']){
          this.brokerTableData = success['brokers'].dataList;
          this.pageIndex = success['brokers'].pageInfo.pageNo;
          this.pageSize = success['brokers'].pageInfo.displayCount;
          this.dataLength = success['brokers'].pageInfo.totalCount;
          this.brokerTableData.map(e=> {
            e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
            return e;
          })
          this.brokerTableData.map(e=> {
            e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
            return e;
          })
          // alert("brokers");
        }if(success['drivers']){
          this.driverTableData = success['drivers'].dataList;        
          this.pageIndex = success['drivers'].pageInfo.pageNo;
          this.pageSize = success['drivers'].pageInfo.displayCount;
          this.dataLength = success['drivers'].pageInfo.totalCount;
          this.driverTableData.map(e=> {
            e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
            return e;
          });
          this.driverTableData.forEach(element => {
            this.totalDriverId.push(element.id);
          });
        }if(success['vehicles']){
          this.vehiclesTableData = success['vehicles'].dataList;
          this.pageIndex = success['vehicles'].pageInfo.pageNo;
          this.pageSize = success['vehicles'].pageInfo.displayCount;
          this.dataLength = success['vehicles'].pageInfo.totalCount;
          this.vehiclesTableData.map(e=> {
            e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
            return e;
          });
          this.vehiclesTableData.forEach(element => {
            this.totalVehiclesId.push(element.id);
          });
        }
      }, (error)=>{
        console.log(error);        
      }, ()=>{
        this.loader = false;
      }
    )
    
  }
  setPegination(event: {pageIndex: number, pageSize: number}){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.getUrl(event.pageIndex +1, event.pageSize, this.searchString);
  }
  searchFrom(){
    this.loader = true;
    let type : string;
    if(this.tabGroup.selectedIndex === 0){
      type = vendorEntityType.DRIVER
    }
    if(this.tabGroup.selectedIndex === 1){
      type = vendorEntityType.BROKER
    }
    if(this.tabGroup.selectedIndex === 2){
      type = vendorEntityType.VEHICLE
    }
    this.OwnerListService.searchApiCallForOwnerData(this.ownerId, type, this.pageSize, this.pageIndex, this.searchString).subscribe(
      (success:any)=>{
        console.log(success);
        if(type == vendorEntityType.VEHICLE){
          this.vehiclesTableData = success.dataList;
          this.pageIndex = success.pageInfo.pageNo;
          this.pageSize = success.pageInfo.displayCount;
          this.dataLength = success.pageInfo.totalCount;
          this.vehiclesTableData.map(e=> {
            e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
            return e;
          });
          this.vehiclesTableData.forEach(element => {
            this.totalVehiclesId.push(element.id);
          });
        }
        if(type == vendorEntityType.DRIVER){
          this.driverTableData = success.dataList;        
          this.pageIndex = success.pageInfo.pageNo;
          this.pageSize = success.pageInfo.displayCount;
          this.dataLength = success.pageInfo.totalCount;
          this.driverTableData.map(e=> {
            e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
            return e;
          });
        }
        this.loader = false;
      },(error)=>{
        this.loader = false;
      },()=>{
        this.loader = false;
      }
    )
  }
  search(event){
    console.log(this.tabGroup);    
    console.log(event);
    this.searchString = event;
    this.pageIndex = 1;
    this.searchFrom();
  }
  //check box select for driver
  driveruserEntityDelete(data){
    console.log(data); 
    if(data.status === true){
      this.deleteArrayUserEntity.push(data.id);
      console.log(this.deleteArrayUserEntity.length);    
    }else if(data.status === false){
      console.log(this.deleteArrayUserEntity.indexOf(data.id));      
      this.deleteArrayUserEntity.splice(this.deleteArrayUserEntity.indexOf(data.id), 1);    
    }
    const spreaded = [...this.deleteArrayUserEntity, ...this.totalDriverId];
    this.refreshArray = spreaded.filter((ele:any)=>{
      return !(this.deleteArrayUserEntity.includes(ele) && this.totalDriverId.includes(ele))
    });
    // this.refreshArray =this.totalVehiclesId.filter((ele:any)=>{
    //   return this.deleteArrayUserEntity.includes(ele.id);
    // })
    console.log(this.refreshArray);
  }

  // check box select for vehicles
  vehiclesUserEntityDelete(data){
    console.log(data);
    if(data.status === true){
      this.deleteArrayUserEntity.push(data.id);
      console.log(this.deleteArrayUserEntity.length);    
    }else if(data.status === false){
      console.log(this.deleteArrayUserEntity.indexOf(data.id));      
      this.deleteArrayUserEntity.splice(this.deleteArrayUserEntity.indexOf(data.id), 1);    
    }
    const spreaded = [...this.deleteArrayUserEntity, ...this.totalVehiclesId];
    this.refreshArray = spreaded.filter((ele:any)=>{
      return !(this.deleteArrayUserEntity.includes(ele) && this.totalVehiclesId.includes(ele))
    });
    // this.refreshArray =this.totalVehiclesId.filter((ele:any)=>{
    //   return this.deleteArrayUserEntity.includes(ele.id);
    // })
    console.log(this.refreshArray);
  }
  yes(data: boolean){
    if(data == true){
      this.loader = true;
      this.OwnerListService.updateRelatedEntitiys(this.refreshArray, this.ownerId, this.userType).subscribe(
        (success:any)=>{
          this.loader = false;
          console.log(success);
          this.deleteArrayUserEntity.length = 0;
          this.getUrl(this.pageIndex, this.pageSize, this.searchString);
          this.deletePopup = false;
        },(error:any)=>{
          console.log(error);
          this.loader = false;
          this.deleteArrayUserEntity.length = 0;
          this.deletePopup = false;  
        },()=>{
          this.loader = false;
          this.deleteArrayUserEntity.length = 0;
          this.deletePopup = false;
        }
      )
    }else{
      this.deletePopup = false;
    }
  }
  deleteList(type){
    console.log(type);
    this.userType = type;
    this.deletePopup = true;
  }
  addDrivers(){
    let sendModalObject = {
      id: this.ownerId,
      data: this.driverTableData.map((element:any)=> element.id),
      type: vendorEntityType.DRIVER
    }
    this.dialogConfig.data = sendModalObject;
  
    const dialogRef = this.dialog.open(OwnerVehiclesComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log(result);
      this.getUrl(this.pageIndex, this.pageSize, this.searchString);
    })
  }
  
  addVehicles(){
    let sendModalObject = {
      id: this.ownerId,
      data: this.vehiclesTableData.map((element:any)=> element.id),
      type: vendorEntityType.VEHICLE
    }
    this.dialogConfig.data = sendModalObject;
    let dialogRef;
    if(this.vehiclesTableData){
      dialogRef = this.dialog.open(OwnerVehiclesComponent, this.dialogConfig);
    }
    dialogRef.afterClosed().subscribe((result:any)=>{
      console.log(result);
      this.getUrl(this.pageIndex, this.pageSize, this.searchString);
    })
  }
}
