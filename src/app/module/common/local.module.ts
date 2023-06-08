import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Mat modules

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatRippleModule, MatNativeDateModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { ListOfTableComponent } from '../../components/list-of-table/list-of-table.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserEntityComponent } from '../../components/user-entity/user-entity.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSortModule } from '@angular/material/sort';
import { SafeHtmlPipe } from './safe-html.pipe';
import { FilterPipe } from './filter.pipe';

import { UserEntityDocumentComponent } from '../../components/user-entity-document/user-entity-document.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UploadImageComponent } from 'src/app/components/upload-image/upload-image.component';
import { OnlyNumberDirective } from '../../directives/only-number.directive';
import { OwnerVehiclesComponent } from '../../components/owner-vehicles/owner-vehicles.component';
// import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DatePickerFormatDirective } from '../../directives/date-picker-format.directive';

@NgModule({
  declarations: [
    ListOfTableComponent,
    LoaderComponent,
    SafeHtmlPipe,
    FilterPipe,
    UserEntityDocumentComponent,
    UploadImageComponent,
    // UserEntityComponent,
    OnlyNumberDirective,
    OwnerVehiclesComponent,
    DatePickerFormatDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule.forRoot(),
    RouterModule,
    HttpClientModule,

    // Material modules
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatRippleModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatMomentDateModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    HttpClientModule,

    // Componnts
    ListOfTableComponent,
    LoaderComponent,

    // Material modules
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatIconModule,
    MatStepperModule,
    MatRippleModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    ToastrModule,
    SafeHtmlPipe,
    FilterPipe,
    UserEntityDocumentComponent,
    UploadImageComponent,
    // UserEntityComponent,
    MatDialogModule,
    OnlyNumberDirective,
    MatMomentDateModule,
    DatePickerFormatDirective,
  ],
  entryComponents:[
    OwnerVehiclesComponent,
  ]
})
export class localModule { }
