import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientesService } from  '../services/clientes.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //public clientes =[]
  public clientes$:Observable<any>;

  constructor(
    private clientesService : ClientesService,
    public loading:LoadingController,
    ) {}

  ngOnInit(){
    this.presentLoading(),
    this.clientes$ = this.clientesService.allClientes$
  
  }


  async presentLoading() {
    const loading = await this.loading.create({
      spinner: "circular",
      cssClass: 'my-custom-class',
      message: 'Cargando clientes',
      duration: 5000
    });
    await loading.present();

  }


  getId(){

  }
  



}


