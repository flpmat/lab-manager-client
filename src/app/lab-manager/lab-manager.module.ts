// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ClusterComponent } from './cluster/cluster.component';

// Components Routing
import { LabManagerRoutingModule } from './lab-manager-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LabManagerRoutingModule,
    NgxDatatableModule,
    BsDropdownModule,    
    ProgressbarModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
   ClusterComponent,
  ]
})
export class LabManagerModule { }
