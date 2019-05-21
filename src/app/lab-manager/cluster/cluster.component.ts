import { Component } from '@angular/core';

@Component({
  templateUrl: 'cluster.component.html'
})
export class ClusterComponent {

  //for the spawning (animation)
  dynamic: number;
  type: string;
  max: number = 200;


  // para atualizar tabela a cada segundo quanto 
  // start(): void {
  //   if(!this.active) return;

  //   setTimeout(this.updateRandom.bind(this), 50);
  // }
  constructor() {
    this.dynamic = 0;
    this.type = "Spawning";
   }


}
