import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { Cuota } from 'src/app/interfaces/cuota';
import { ActivatedRoute } from '@angular/router';
import { NavController,LoadingController } from '@ionic/angular';
import { CuotasService } from 'src/app/services/cuotas.service';

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
  // cuotas:Cuota= {
  //   numeroCuota:0,
  //   monto:0,
  //   estado:'',
  //   fechaIncio:new Date
  // };
  cuotas = null;

  constructor(
    private clientesService:ClientesService,
    private route:ActivatedRoute,
    private nav:NavController,
    private loadingController:LoadingController,
    private cuotasService:CuotasService
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
    this.clientesService.getCliente(this.clienteId).subscribe({
      next:(res)=>{
        this.cliente = res
        this.loadCuotas(this.clienteId)

      },
      error:(e)=>console.log("Error al cargar clientes",e)
      
    
      // console.log(res),

      // this.cliente = res;
      // this.loadCuotas(this.clienteId)

    });
  }

  loadCuotas(idCliente){
    return this.cuotasService.getCuotas(idCliente).subscribe({
      next:(res)=>{
        this.cuotas = res
      },
      error:(error)=> console.log('Error en las cuotas',error)  
      // console.log(res),
      // this.cuotas = res;
    });
  }
    

}