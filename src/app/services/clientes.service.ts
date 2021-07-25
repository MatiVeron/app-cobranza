import { Injectable } from '@angular/core';
import{BehaviorSubject, interval, Observable}from "rxjs";
import {map, switchMap} from 'rxjs/operators'
import{AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import firebase from 'firebase';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // public clientes$ = new BehaviorSubject(null);
  // public allClientes$;

  private clientesCollection:AngularFirestoreCollection<Cliente>;
  private cliente$: Observable<Cliente[]>;

  
  constructor(
    private db:AngularFirestore
  ) {
    console.log('Servicio de clientes iniciado')

    this.clientesCollection = this.db.collection<Cliente>('clientes');
    this.cliente$ = this.clientesCollection.snapshotChanges().pipe(
       map(actions=>{
         return actions.map(a=>{
           const data = a.payload.doc.data();
           const id= a.payload.doc.id;
           return {id,...data}
         })
       })
    )



    // this.allClientes$ = this.clientes$.pipe( 
    //   switchMap(()=>{ 
    //      return this.db.collection('clientes').valueChanges()
    //   }));
      
  

   
  } //fin del constructor

  getClientes(){
    return this.cliente$;
  }

  getCliente(id:string){
    return this.clientesCollection.doc<Cliente>(id).valueChanges();
  }


  updateCliente(cliente:Cliente,id:string){
    return this.clientesCollection.doc(id).update(cliente);
  }

  addCliente(cliente:Cliente){
    return this.clientesCollection.add(cliente);
  }

  removeCliente(id:string){
    return this.clientesCollection.doc(id).delete();
  }

  // addCliente(cliente){
  //   const id = this.db.createId();
  //   this.db.collection('clientes').add({
  //     id,
  //     ...cliente,
  //     fecha:firebase.firestore.FieldValue.serverTimestamp(),
      
      
  //   })
  // }



  // getClienteById(id){
  //   return this.db.collection('clientes').doc(id).valueChanges();
  // }





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
