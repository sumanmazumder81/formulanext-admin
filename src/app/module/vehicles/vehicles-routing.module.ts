import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { VehiclesBrandComponent } from '../../module/vehicles/vehicles-brand-list/vehicles-brand.component';
import { VehiclesTypeComponent } from '../../module/vehicles/vehicles-type-list/vehicles-type.component';
import { VehiclesVariantComponent } from '../../module/vehicles/vehicles-variant-list/vehicles-variant.component';
import { VehiclesListComponent } from '../../module/vehicles/vehicles-list/vehicles-list.component';
import { BrandEntitiesComponent } from './brand-entities/brand-entities.component';
import { TypeEntitiesComponent } from './type-entities/type-entities.component';
import { VehicleEntitiesComponent } from './vehicle-entities/vehicle-entities.component';
import { VariantEntityComponent } from './variant-entity/variant-entity.component';

const routes: Routes = [

  {path: '', redirectTo: 'vehicles', pathMatch: 'full'},
  {path: 'vehiclesBrand', children:[
    {path: '', redirectTo: 'vehiclesBrandList', pathMatch:"full"},
    {path: 'vehiclesBrandList', component: VehiclesBrandComponent, data:{title: 'vehicles Brand List',}
  },
    {path: 'brandEntities', component: BrandEntitiesComponent, data: {title: 'Brand Form'}},
    {path: 'brandEntities/:id', component: BrandEntitiesComponent, data: {title: 'Brand Edit'}},
  ]},

  {path: 'vehiclesType', children:[
    {path: '', redirectTo: 'vehiclesTypeList', pathMatch:"full"},
    {path: 'vehiclesTypeList', component: VehiclesTypeComponent, data: {title: 'Vehicles Type List'}},
    {path: 'typeEntity', component: TypeEntitiesComponent, data: {title: 'Vehicles Type Form'}},
    {path: 'typeEntity/:id', component: TypeEntitiesComponent, data: {title: 'Vehicles Type Edit'}},
  ], data: {title: 'Vehicles Type'}},

  {path: 'vehiclesVariant', children:[
    {path: '', redirectTo: 'vehiclesVariantList', pathMatch:"full"},
    {path: 'vehiclesVariantList', component: VehiclesVariantComponent, data: {title: 'Vehicles Varient List'}},
    {path: 'variantEntity/:id', component: VariantEntityComponent, data: {title: 'Vehicles Varient Edit'}},
    {path: 'variantEntity', component: VariantEntityComponent, data: {title: 'Vehicles Varient Form'}},

  ], data: {title: 'Vehicles Variant'}},

  {path: 'vehicles', children:[
    {path: '', redirectTo: 'vehiclesList', pathMatch:"full"},
    {path: 'vehiclesList', component: VehiclesListComponent, data: {title: 'Vehicles List'}},
    {path: 'vehicleEntities/:id', component: VehicleEntitiesComponent, data: {title: 'Vehicles Edit'}},
    {path: 'vehicleEntities', component: VehicleEntitiesComponent, data: {title: 'Vehicles Form'}},
  ], data: {title: 'vehicles'}},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // declarations: [VehicleListComponent, OwnerListComponent, BrokerListComponent, DriverListComponent],
  exports: [RouterModule],
})
export class VehiclesRoutingModule { }
