import { AfterViewInit, Component, ViewChild, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { MatSort } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { OwnerListService } from '../../../services/owner-list.service';
import { UserEntitiesService } from '../../../services/user-entities.service';
import { map, flatMap, mergeMap } from 'rxjs/operators';
import { vendorEntityType } from 'src/app/enums/vendorsEntity.enum';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: "*" })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class OwnerListComponent implements OnInit {

  public userEntiteData: any = [];
  public userEntityId: any;

  public loader:boolean = false;
  public paginationData: any;
  public columns : any;
  public searchString: string = '';
  public pageIndex: number = 1;
  public pageSize: number = 5;
  public dataLength: number;


  // dataSource: MatTableDataSource
  ownerListed: any;

  public pageTitle: string = vendorEntityType.OWNER;
  public allTableData:any;
  displayedColumns = [
      {label: 'Vendor Code', key: 'meta.VendorCode'},
      {label: 'Owner Name', key: 'userEntity.fullName'},
      {label: 'Contact No', key: 'userEntity.contact[0].[contactList][0].contactNo'},
      {label: 'Status', key: 'isActive'},
      {label: 'action', key: 'action'},
];


  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;


  constructor(
    public router: Router,
    private ownerListService: OwnerListService,
    private UserEntitiesService: UserEntitiesService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.ownerList(this.pageIndex, this.pageSize, this.searchString);
    console.log(this.displayedColumns.length);
    this.columns = this.displayedColumns.length;
  }

  addOwner() {
    this.router.navigate(['/dashboard/vendors/owner/ownerCreate']);
  }

  ownerList(page, pageSize, searchString){
    this.ownerListService.ownerList(page, pageSize, searchString).subscribe(
      (success: any) => {
        this.loader = false;
        console.log(success);
        this.allTableData = success.result;
        this.allTableData.map(e=> {
          e.isActive = e.isActive? '<span class="success">Active</span>' : '<span class="danger">Inactive</span>';
          return e;
        })
        this.pageIndex = success.currentPage;
        this.pageSize = success.pageSize;
        this.dataLength = success.totalCount;
      },(error)=>{
        console.log(error);
      }
    )
  }


  onChangePage($event){
    console.log($event.pageSize);
    this.paginationData = $event.pageSize;
  }


  // delete owner list
  delete(id) {
    console.log(id);
    this.loader = true;
    this.ownerListService.ownerDelete(id).subscribe(
      (success) => {
        console.log(success);
        this.ownerList(this.pageIndex, this.pageSize, this.searchString);
        this.loader = false;
        this.notification.showSuccess('Delete', 'Successfully');
      },
      (error) => {
        console.log(error);
        this.loader = false;
      }
    )

  }
  // view owner
  edit(id) {
    console.log(id);
    this.router.navigate([`./dashboard/vendors/owner/ownerCreate/${id}`]);
  }

  search(event){
    this.searchString = event;
    this.pageIndex = 1;
    this.ownerList(this.pageIndex, this.pageSize, this.searchString);
  }
  setPegination(event: {pageIndex: number, pageSize: number}){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.ownerList(event.pageIndex +1, event.pageSize, this.searchString);
  }
}
