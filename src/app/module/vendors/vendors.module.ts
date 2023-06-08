import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { BrokerListComponent } from './broker-list/broker-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { VendorRoutingModule } from './vendors-routing.module';
import { UserEntityComponent } from '../../components/user-entity/user-entity.component';
import { VendorComponent } from './vendors.component'
import { OwnerViewComponent } from './owner-view/owner-view.component';

import { UserEntityDocumentComponent } from '../../components/user-entity-document/user-entity-document.component';
import { localModule } from '../common/local.module';
import { UploadImageComponent } from '../../components/upload-image/upload-image.component';
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { DriverCreateComponent } from './driver-create/driver-create.component';
import { BrokerCreateComponent } from './broker-create/broker-create.component';

@NgModule({
  declarations: [
    OwnerListComponent,
    BrokerListComponent,
    DriverListComponent,
    VendorComponent,
    UserEntityComponent,
    OwnerViewComponent,
    // UserEntityDocumentComponent,
    // UploadImageComponent,
    OwnerCreateComponent,
    DriverCreateComponent,
    BrokerCreateComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    localModule,
  ],
})
export class VendorModule { }
