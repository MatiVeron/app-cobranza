import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientesService } from  '../services/clientes.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Cliente } from '../interfaces/cliente';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public clientes =[]
  // public clientes$:Observable<any>;


  constructor(
    private clientesService : ClientesService,
    public loading:LoadingController,
    private alertController:AlertController,
    ) {}

  ngOnInit(){
    this.loadClientes();
  
  }



  

  async presentLoading() {
    const loading = await this.loading.create({
      spinner: "circular",
      cssClass: 'my-custom-class',
      message: 'Cargando clientes...',
      
    });

     return await loading.present();

  }

  loadClientes(){
     this.presentLoading().then(()=>{
       this.clientesService.getClientes().subscribe(res=>{
          this.loading.dismiss();
          this.clientes = res;});
      });

    }
    
      

  async onRemove(idCliente) {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cuidado',
      message: '¿Seguro que quiere borrar el cliente?',
      buttons: [
        {
        text:'SI',
        handler:()=> 
          this.clientesService.removeCliente(idCliente) //console.log(idCliente)
        },
        {
          text:'Cancelar',
          handler:()=>{alert.dismiss()}

        }
      
      ]
    });

    await alert.present();

    

    
  }






  



}


