import { Component, OnInit, ViewChild, Input, SimpleChanges, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// import { LicenceClassListComponent } from '.././../module/master/licence-class-list/licence-class-list.component'
import get from "lodash/get";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subject, debounceTime } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-of-table',
  templateUrl: './list-of-table.component.html',
  styleUrls: ['./list-of-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: "*" })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListOfTableComponent implements OnInit {
  public btn_condition:boolean = false;
  @Input('pageTitle') pageTitle: string;
  @Input('allTableData') tabledata: any;
  @Input('tableHeaderData') tableHeaderData: any[] = [];
  @Input('expandRow') expandRow: boolean = false;
  @Input('isCallFromBackend') isCallFromBackend: boolean = false;
  @Input('pageIndex') pageIndex: number;
  @Input('dataLength') dataLength: number;
  @Input('pageSize') pageSize: number = 5;
  @Input('entityType') entityType: string;
  // loader neeed variable
  public loader:boolean = true;
  public columnData : any;
  pageEvent: PageEvent;
  public deletePopup : boolean = false;
  public deleteId: number;

  // loader neeed variable
  displayedColumns: string[] =[];
  public actionDiv: boolean = true;

  licenceClassTable = new MatTableDataSource<interfacTableData>(tableData);

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  private searchSubject: Subject<string> = new Subject();

  // data pass to parent component

  @Output() tableDeleteId : EventEmitter<number> = new EventEmitter();
  @Output() tableEditId : EventEmitter<number> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() setpagination: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() userEntityIdSendParent: EventEmitter<any> = new EventEmitter;
  constructor(
    private routers: Router,
  ) { }

  ngOnInit(): void {
    // console.log(this.displayedColumns)
    this.displayedColumns = this.tableHeaderData.map( element=> {
      return element.key
    });
    //loader
    this.columnData = this.displayedColumns.length;
    this.searchSubject.pipe(debounceTime(500)).subscribe((e: string)=>{
    this.search.emit(e);
    })
    // console.log(this.entityType);
    
  }
  ngOnChanges(changes: SimpleChanges){
    // console.log(this.tabledata);
    if(changes?.tabledata?.currentValue && (changes?.tabledata?.currentValue.length > 0 || changes?.tabledata?.currentValue.length === 0)){
      this.loader = false;
      this.licenceClassTable = new MatTableDataSource<interfacTableData>(changes.tabledata.currentValue);
      setTimeout(() => {
        this.licenceClassTable.sort = this.sort;
      }, 500);
      if(!this.isCallFromBackend){
        this.licenceClassTable.paginator = this.paginator;
      } else{
        this.paginator.pageIndex = this.pageIndex - 1;
        this.paginator.length = this.dataLength;
        this.paginator.pageSize = this.pageSize;
      }
      console.log(this.licenceClassTable);

    }

  }

  ngAfterViewInit() {
    // this.pageSize = 10;
  }
  onChangePage(pe:PageEvent) {
    if(this.isCallFromBackend){
      this.loader = true;
      this.licenceClassTable.data = []
      this.setpagination.emit({pageIndex: pe.pageIndex, pageSize: pe.pageSize})
    }
  }
  applyFilter(event) {
    console.log(event);
    if(this.isCallFromBackend) {
      this.loader = true;
      this.licenceClassTable.data = [];
      this.searchSubject.next(event);
    }else{
      // this.search.emit(event.target.value)
      // const filterValue = (event.target as HTMLInputElement).value;
      this.licenceClassTable.filter = event.trim().toLowerCase();
    }
  }

  delete(id: number): void{
    this.deletePopup = true;
    this.deleteId = id;
  }
  yes(data: boolean){
    if(data == true){
      this.delete(this.deleteId);
      this.tableDeleteId.emit(this.deleteId);
      this.deletePopup = false;
    }else{
      this.deletePopup = false;
    }
  }
  edit(id: number): void{
    this.tableEditId.emit(id);
    console.log(id);
  }
  getSellData(element, key){
    // console.log(element);
    if(element.brokers || element.drivers || element.vehicles){
      this.btn_condition = true;
    }
    return get(element, key) ? get(element, key) : '';
  }
  view(id){
    console.log(id);
    this.routers.navigate([`dashboard/vendors/ownerViewDetails/${id}`]);
  }

  createBroker(userEntityId){
    console.log(userEntityId);
    this.routers.navigate([`dashboard/vendors/broker/brokerCreateFromothers/${userEntityId}`]);
  }
  createDriver(userEntityId){
    console.log(userEntityId);
    this.routers.navigate([`dashboard/vendors/driver/driverCreateFromothers/${userEntityId}`]);
  }
  createOwner(userEntityId){
    console.log(userEntityId);
    this.routers.navigate([`dashboard/vendors/owner/ownerCreateFromothers/${userEntityId}`]);
  }
  selectEntity(status, id){
    // console.log(status, id);
    this.userEntityIdSendParent.emit({status, id}); 
  }
}
export interface interfacTableData {
  id?: number;
  className?: string;
  status?: boolean;
  associatedWeight?: number;
  unit?: string;
  name?: string;
  model?: string;
  capacity?: string;
  dimension?: string;
  brokerName?: string;
  contactNo?: number;
  driverName?: string;
  action?: any;
}
const tableData: interfacTableData[] = [
  // {id: 1, name: 'Hydrogen'},
];
