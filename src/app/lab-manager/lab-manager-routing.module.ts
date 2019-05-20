import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClusterComponent } from './cluster/cluster.component';





const routes: Routes = [
  {
    path: '',
    data: {
      title: 'LabManager'
    },
    children: [
      {
        path: 'cluster',
        component: ClusterComponent,
        data: {
          title: 'Cluster'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabManagerRoutingModule {}
