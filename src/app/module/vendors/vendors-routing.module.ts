import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { BrokerListComponent } from './broker-list/broker-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';

import { VendorComponent } from './vendors.component';

import { UserEntityComponent } from '../../components/user-entity/user-entity.component';
import { OwnerViewComponent } from './owner-view/owner-view.component';
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { DriverCreateComponent } from './driver-create/driver-create.component';
import { BrokerCreateComponent } from './broker-create/broker-create.component';
import { OwnerViewDetailsComponent } from 'src/app/components/owner-view-details/owner-view-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'broker', pathMatch: 'full'},

  
  
  {path: 'owner', children: [
    {path: '', redirectTo: 'ownerList', pathMatch: 'full'},
    {path: 'ownerList', component: OwnerListComponent, data: {title: 'Owner List'}},
    {path: 'ownerCreate/:id', component: OwnerCreateComponent, data: {title: 'Owner Edit'}},
    {path: 'ownerCreate', component: OwnerCreateComponent, data: {title: 'Owner Create'}},
    {path: 'ownerCreateFromothers/:userEntityId', component: OwnerCreateComponent, data: {title: 'Owner Edit'}},
  ] },
  {path: 'broker', children: [
    {path: '', redirectTo: 'brokerList', pathMatch: 'full'},
    {path: 'brokerList', component: BrokerListComponent, data: {title: 'Broker List'}},
    {path: 'brokerCreateFromothers/:userEntityId', component: BrokerCreateComponent, data: {title: 'Broker List'}},
    {path: 'brokerCreate/:id', component: BrokerCreateComponent, data: {title: 'Broker Edit'}},
    {path: 'brokerCreate', component: BrokerCreateComponent, data: {title: 'Broker Create'}},
  ]},
  {path: 'driver', children: [
    {path: '', redirectTo: 'driverList', pathMatch: 'full'},
    {path: 'driverList', component: DriverListComponent, data: {title: 'Driver List'}},
    {path: 'driverCreateFromothers/:userEntityId', component: DriverCreateComponent, data: {title: 'Driver Edit'}},
    {path: 'driverCreate/:id', component: DriverCreateComponent, data: {title: 'Driver Edit'}},
    {path: 'driverCreate', component: DriverCreateComponent, data: {title: 'Driver Create'}},
  ]},

  {path: 'userEntity', component: UserEntityComponent, },

  {path: 'ownerView', component: OwnerViewComponent, data: {title: 'Owner View'}},
  {path: 'ownerViewDetails', component: OwnerViewDetailsComponent, data: {title: 'Ownwr View Details'}},
  {path: 'ownerViewDetails/:id', component: OwnerViewDetailsComponent, data: {title: 'Ownwr View Edit'}},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  // declarations: [VehicleListComponent, OwnerListComponent, BrokerListComponent, DriverListComponent],
  exports: [RouterModule],
})
export class VendorRoutingModule { }
