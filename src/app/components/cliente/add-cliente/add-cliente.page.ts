import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
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

  constructor(
    private clientesService:ClientesService,
    public toastController: ToastController,
    private router:Router
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
    }
    )
    this.clienteAgregado();
    this.router.navigateByUrl('/')
    
    
    
    
  }


  async clienteAgregado() {
    const toast = await this.toastController.create({
      message: 'Cliente agregado',
      duration: 2000
    });
    toast.present();

  }




}
