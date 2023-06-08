import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

import { MasterComponent } from './master.component';
import { LicenceClassListComponent } from './licence-class-list/licence-class-list.component';
import { LicenceClassEntityComponent } from './licence-class-entity/licence-class-entity.component';
import { MeasurementUnitsListComponent } from './measurement-units-list/measurement-units-list.component';
import { MeasurementUnitsEntityComponent } from './measurement-units-entity/measurement-units-entity.component';
const routes: Routes = [
  {path: '', redirectTo: 'licenceClass', pathMatch: 'full'},

  {path: 'licenceClass', children:[
    {path : '', redirectTo: 'licenceClassList', pathMatch: "full"},
    {path:"licenceClassList", component: LicenceClassListComponent, data:{title: 'Licence Class List'}},
    {path: 'licenceClassEntity', component:LicenceClassEntityComponent, data: {title:'Licence Class Form'}},
    {path: 'licenceClassEntity/:id', component:LicenceClassEntityComponent, data: {title:'Licence Class Edit'}},
  ]},

  {path: 'measurementUnits', children:[
    {path : '', redirectTo: 'measurementUnitsList', pathMatch: "full"},
    {path:"measurementUnitsList", component: MeasurementUnitsListComponent, data: {title:'Measurement Units List'}},
    {path: 'measurementUnitsEntity', component:MeasurementUnitsEntityComponent, data: {title: 'Measurement Units Form'}},
    {path: 'measurementUnitsEntity/:id', component:MeasurementUnitsEntityComponent, data: {title: 'Measurement Units Edit'}},
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  // declarations: [VehicleListComponent, OwnerListComponent, BrokerListComponent, DriverListComponent],
  exports: [RouterModule],
})
export class MasterRoutingModule { }
