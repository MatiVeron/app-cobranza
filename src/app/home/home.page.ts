import { Component } from '@angular/core';
import { ClientesService } from  '../services/clientes.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public clientes =[]
  constructor(private clientesService : ClientesService) {}

  ngOnInit(){
    this.clientes = this.clientesService.getClientes()
  
  }



}


