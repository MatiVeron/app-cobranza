import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute } from '@angular/router';
import { NavController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.page.html',
  styleUrls: ['./detalle-cliente.page.scss'],
})
export class DetalleClientePage implements OnInit {

  mostrarCuotas:boolean = false;
  mostrarDatosCliente:boolean=false;
  mostrarDetalleVenta:boolean = false;
  cliente:Cliente= {
    nombre:'',
    apellido:'',
    direccion:'',
    dni:0,
    cel:0,
    recomendado:'',
    celComprado:'',
    celPartePago:'',
    entrega:0,
    valorCuota:0,
    cuotas:0,
  };
  clienteId = null;

  constructor(
    private clientesService:ClientesService,
    private route:ActivatedRoute,
    private nav:NavController,
    private loadingController:LoadingController,
  ) { }

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
    if(this.clienteId){
      this.loadCliente()
    }

  }


  async loadCliente(){
    const loading = await this.loadingController.create({
      message:'Cargando...',
      spinner:'circular',
      duration:2000,
    });

    await loading.present();
    this.clientesService.getCliente(this.clienteId).subscribe( res=>{
      
    
      console.log(res),
      this.cliente = res;
    });
  }




}
