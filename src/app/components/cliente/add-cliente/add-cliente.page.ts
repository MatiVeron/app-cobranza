import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Cliente, } from 'src/app/interfaces/cliente';
import{Cuota} from 'src/app/interfaces/cuota';
import { CuotasService } from 'src/app/services/cuotas.service';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  fechaIngreso:Date;
  nombre:string;
  apellido:string;
  direccion:string;
  dni:number;
  cel:number;
  recomendado:string;
  celComprado:string;
  celPartePago:string;
  entrega:number;
  valorCuota:number;
  cuotas:number;

 contadorCuotas:number = 0 //iterador

  public cuota = []

  

  constructor(
    private clientesService:ClientesService,
    public toastController: ToastController,
    private router:Router,
    private cuotasService:CuotasService
    
    ) { }

  ngOnInit() {
  }


  onAddCliente(){
    this.clientesService.addCliente({
     nombre:this.nombre,
     apellido:this.apellido,
     direccion:this.direccion,
     dni:this.dni,
     cel:this.cel,
     recomendado:this.recomendado,
     celComprado:this.celComprado,
     celPartePago:this.celPartePago,
     entrega:this.entrega,
     valorCuota:this.valorCuota,
     cuotas:this.cuotas,
    }).then(r =>{
      console.log(r)
      this.generarCuotas(r.id)
      this.clienteAgregado(),
      this.router.navigateByUrl('/');
    });
  
    
  }


  async clienteAgregado(){
    const toast = await this.toastController.create({
      message: 'Cliente agregado',
      duration: 2000
  
    });
    toast.present();

  }


  generarCuotas(idCliente){ 
    this.contadorCuotas = 1;
    
    while (this.contadorCuotas <= this.cuotas) {
      this.cuotasService.addCuota({
        numeroCuota:this.contadorCuotas,
        monto: this.valorCuota,
        estado:'pendiente',
        idCliente:idCliente
        
        
      }).then(c=> console.log('cuota agregada'))

      this.contadorCuotas++
    }

    console.log('cuotas agregadas')

      
  }


}
