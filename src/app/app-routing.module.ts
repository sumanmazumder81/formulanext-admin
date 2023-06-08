import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';




const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', data: {title: 'Login'}},
  { path: 'login', component: LoginComponent, data: { title: 'Login' }},
  {path: 'dashboard', component: DashboardComponent, children:[
    {path: 'vendors', loadChildren: () => import('./module/vendors/vendors.module').then(m => m.VendorModule) },
    {path: 'vehicles', loadChildren: () => import('./module/vehicles/vehicles.module').then(m => m.VehicleModule) },
    {path: 'master', loadChildren: () => import('./module/master/master.module').then(m => m.MasterModule) },
  ], data: {title: 'Dashboard'}},
  
  {path: '**', component: NotFoundComponent, data: { title: 'Page Not Found' } },
  {path: '**', component:NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
