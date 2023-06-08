import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-owner-view',
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.scss']
})
export class OwnerViewComponent implements OnInit {

  constructor(
    public router: ActivatedRoute

  ) { }

  ngOnInit(): void {
    
  }
  getData(){
    this.router.queryParams.subscribe(
      (passData)=>{
        console.log(passData);
      }
    )
  }
}
