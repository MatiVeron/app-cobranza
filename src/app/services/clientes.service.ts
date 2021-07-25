import { Injectable } from '@angular/core';
import{BehaviorSubject, interval}from "rxjs";
import {map, switchMap, switchMapTo} from 'rxjs/operators'
import{AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public clientes$ = new BehaviorSubject(null);
  public allClientes$;
  constructor(
    private db:AngularFirestore
  ) {
    console.log('Servicio de clientes iniciado')

    this.allClientes$ = this.clientes$.pipe( 
      switchMap(()=>{ 
         return this.db.collection('clientes').valueChanges();
      })
    )
   
  }

  addCliente(cliente){
    this.db.collection('clientes').add({
      ...cliente,
      fecha:firebase.firestore.FieldValue.serverTimestamp(),
      
      
    })
  }

  getClienteById(id){
    return this.db.collection('clientes').doc(id).valueChanges();
  }





  // getClientes(){
  //   return [{
  //     id: 0,
  //     name: 'Walter',
  //     surname: 'Ovejero',
  //     address:'Calle 8',
  //     dni: 87543135,
  //     recomendedTo: 'Damian',
  //   },
  //   {
  //     id: 2,
  //     name: 'Matias',
  //     surname: 'Veron',
  //     address:'Calle 12',
  //     dni: 9785835,
  //     recomendedTo: 'Alguien',
  //   },
  
  //     {
  //       id: 3,
  //       name: 'Mauro',
  //       surname: 'Lobos',
  //       address:'Calle 200',
  //       dni: 1012014,
  //       recomendedTo: 'Algun otro',
  //     }];
  // }


  


}
