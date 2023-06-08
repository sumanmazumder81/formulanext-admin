import { Component, OnInit, ChangeDetectorRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnChanges {

  showSpinner = false;
  @Input() paginationData : any;
  @Input() columns : any;
  public row = new Array();
  public column :any[]= [];
  constructor(
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) { 
  }

  ngOnInit(): void {
    this.cdRef.detectChanges();
    // console.log(this.columns);
    for(let index = 0; index < this.columns; index++){
      this.column.push(index);
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.paginationData);
    if(changes.paginationData.currentValue){

      this.fillInNumber(changes.paginationData.currentValue);
    }
  }
  fillInNumber(n){
    // console.log(n);
    return Array(n).fill(0).map((value, index)=>{
      this.row.push(index);
      return index + 1;
    })
  }
  
}
