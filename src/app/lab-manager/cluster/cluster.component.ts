import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Services } from '../../shared/services/service.service';
import { interval, Observable } from 'rxjs';

@Component({
  templateUrl: 'cluster.component.html'
})
export class ClusterComponent {


  form: FormGroup;
  images: any[];
  flavors: any[];
  servers: any[];
  //for the spawning (animation)
  dynamic: number;
  type: string;
  max: number = 200;
  ticks: any;
  progressing: boolean = false;

  consultaSubscription: any;

  // para atualizar tabela a cada segundo quanto 
  // start(): void {
  //   if(!this.active) return;

  //   setTimeout(this.updateRandom.bind(this), 50);
  // }
  constructor(private Services: Services, private fb: FormBuilder) {
    this.formInit();
    this.dynamic = 0;
    this.type = "Spawning";
  }

  formInit() {
    this.form = this.fb.group({
      idCluster: 0,
      idImage: [0, Validators.compose([
        Validators.required
      ])],
      idFlavor: [0, Validators.compose([
        Validators.required
      ])],
      nomeCluster: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    this.loadImages();
    this.loadFlavors();
    this.consultar();


  }

  ngAfterViewInit() {

  }


  parseFormBusca(form_directive: any) {
    return form_directive.value;
  }


  carregarCluster(obj: any) {
    this.form.setValue({
      idCluster: obj.idCluster,
      idImage: obj.idImagem,
      idFlavor: obj.idFlavor,
      nomeCluster: obj.nomeCluster,
    });
  }

  submit() {
    console.log("teste");
    this.consultaSubscription.unsubscribe();
    if (this.form.value.idCluster == '' || this.form.value.idCluster == null) {
      this.salvarCluster();
    } else {
      this.editarCluster();
    }
  }

  salvarCluster() {

    this.Services.post('Cluster', this.form.value, null)
      .then(res => {
        // this.consultaSubscription = interval(1000)
        //   .subscribe((val) => { this.consultar; this.isProgress() });
        this.consultar();
        // this.handleReset();
      }).catch(err => {
        alert(err);
      })
  }

  editarCluster() {
    this.Services.put('Cluster', this.form.value, this.form.value.idTipoAtividade)
      .then(res => {
        // this.consultar();
        // this.handleReset();
      }).catch(err => {
        alert(err);
      });
  }

  excluirCluster(id: any) {
    this.form.controls['idCluster'].setValue(null);
    this.Services.delete('Cluster', id)
      .then(res => {
        this.handleReset();
        // this.consultar();
      })
      .catch(err => {
        alert(err);
      })
  }

  consultar(): void {
    this.Services.get('Cluster/GetAllServers')
      .then(res => {
        console.log(res);
        this.servers = res;
        // this.consultaSubscription = interval(1000)
        //   .subscribe((val) => { this.consultar(); });
        this.isProgress()
      }).catch(err => {
        alert(err);
      })
  }
  loadImages(): void {
    this.Services.get('Cluster/GetAllImages')
      .then(res => {
        this.images = res;
      }).catch(err => {
        alert(err);
      })
  }

  loadFlavors(): void {
    this.Services.get('Cluster/GetAllFlavors')
      .then(res => {
        this.flavors = res;
      }).catch(err => {
        alert(err);
      })
  }

  rebootCluster(id: any): void {
    console.log(id);
    this.Services.get('Cluster/RecbootServer/' + id)
      .then(res => {
        this.consultar();
      }).catch(err => {
        alert(err);
      })
  }

  stopCluster(id: any): void {
    this.Services.get('Cluster/StopServer/' + id)
      .then(res => {
        this.consultar();
      }).catch(err => {
        alert(err);
      })
  }

  startCluster(id: any): void {
    console.log(id);
    this.Services.get('Cluster/StartServer/' + id)
      .then(res => {
        this.consultar();
      }).catch(err => {
        alert(err);
      })
  }

  handleReset() {
    console.log("reset");

    this.form.reset();
    this.formInit();
  }



  isProgress() {
    this.progressing = false;
    for (const s of this.servers) {
      if (s.task_state != null) {
        this.progressing = true;
        this.consultar();
        break;
      }
    }
    // if (progressing == false) {
    //   this.consultaSubscription.unsubscribe();
    // }
  }
}
