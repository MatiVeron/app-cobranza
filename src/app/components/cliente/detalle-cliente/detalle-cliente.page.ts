import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.page.html',
  styleUrls: ['./detalle-cliente.page.scss'],
})
export class DetalleClientePage implements OnInit {

  mostrarCuotas:boolean = false;
  mostrarDatosCliente:boolean=false;
  mostrarDetalleVenta:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
