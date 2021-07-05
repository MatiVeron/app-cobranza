import { Injectable } from '@angular/core';
import{interval}from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() {
    console.log('Servicio de clientes iniciado')
   }


  getClientes(){
    return [{
      id: 0,
      name: 'Walter',
      surname: 'Ovejero',
      address:'Calle 8',
      dni: 87543135,
      recomendedTo: 'Damian',
    },
    {
      id: 2,
      name: 'Matias',
      surname: 'Veron',
      address:'Calle 12',
      dni: 9785835,
      recomendedTo: 'Alguien',
    },
  
      {
        id: 3,
        name: 'Mauro',
        surname: 'Lobos',
        address:'Calle 200',
        dni: 1012014,
        recomendedTo: 'Algun otro',
      }];
  }



}
