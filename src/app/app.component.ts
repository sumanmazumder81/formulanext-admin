import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { Router, NavigationEnd, ActivatedRoute, ActivationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'formula-next';
  status: OnlineStatusType; //Enum provided by ngx-online-status
  onlineStatusCheck: any = OnlineStatusType;
  
  constructor(
    private onlineStatusService: OnlineStatusService,
    private router : Router,
    private titleServices: Title,
    private activePage: ActivatedRoute,
    // private ActivationStart : ActivationStart,
  ) {
    
  }
  ngOnInit(): void {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status; 
      console.log(this.status);
    });
    this.titleServices.setTitle('Formula Next Application');
    this.changeTitle();
    // this.router.events
    // .pipe(filter((event)=> event instanceof NavigationEnd)).subscribe(
    //   (event: NavigationEnd)=>{
    //     console.log(event);
    //   }
    // )
  }
  changeTitle(){
    this.router.events
    .pipe(filter((event)=> event instanceof ActivationStart)).subscribe(
      (event)=>{
        // console.log(event instanceof ActivationStart);
        if(event instanceof ActivationStart){
          console.log(event.snapshot.data['title']);
          this.titleServices.setTitle(event.snapshot.data['title']);
        }
      }
    )   
  }
}
