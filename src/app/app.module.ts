import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//services
import { httpInterceptorProviders } from './http-interceptors/index';

// directive
import { AddClassDirective } from './directives/add-class.directive';

// components
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

// common module
import { localModule } from './module/common/local.module';

// internetconnection check
import { OnlineStatusModule } from 'ngx-online-status';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { OwnerViewDetailsComponent } from './components/owner-view-details/owner-view-details.component';
import { DotsDirective } from './directives/dots.directive';

// import { OwnerVehiclesComponent } from './components/owner-vehicles/owner-vehicles.component';




const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMMM YYYY',
  },
  display: {
    dateInput: 'DD MMMM YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    SidePanelComponent,
    AddClassDirective,
    LoginComponent,
    OwnerViewDetailsComponent,
    DotsDirective,
    // OwnerVehiclesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    localModule,
    OnlineStatusModule,
    
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
