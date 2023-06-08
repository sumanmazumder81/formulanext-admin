import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterComponent } from './master.component';
import { MasterRoutingModule } from './master-routing.module';
import { LicenceClassListComponent } from './licence-class-list/licence-class-list.component';
import { LicenceClassEntityComponent } from './licence-class-entity/licence-class-entity.component';
import { MeasurementUnitsEntityComponent } from './measurement-units-entity/measurement-units-entity.component';
import { MeasurementUnitsListComponent } from './measurement-units-list/measurement-units-list.component';
import { localModule } from '../common/local.module';


@NgModule({
  declarations: [
    MasterComponent,
    LicenceClassListComponent,
    LicenceClassEntityComponent,
    MeasurementUnitsEntityComponent,
    MeasurementUnitsListComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    localModule,
  ],
})
export class MasterModule { }
