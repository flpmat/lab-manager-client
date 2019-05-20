// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ClusterComponent } from './cluster/cluster.component';

// Components Routing
import { LabManagerRoutingModule } from './lab-manager-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LabManagerRoutingModule
  ],
  declarations: [
   ClusterComponent,
  ]
})
export class LabManagerModule { }
