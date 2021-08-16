import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { filter, map, switchMap, switchMapTo } from 'rxjs/operators';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import{Cuota} from 'src/app/interfaces/cuota';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CuotasService {

  private cuotasCollection:AngularFirestoreCollection<Cuota>
  private cuota$:Observable<any>

  constructor(
    private db:AngularFirestore
    ) {

      console.log('Servicio cuota inicializado')

      this.cuotasCollection = this.db.collection<Cuota>('cuotas');
      this.cuota$ = this.cuotasCollection.snapshotChanges().pipe(
         map(actions=>{
           return actions.map(a=>{
             const data = a.payload.doc.data();
             const id= a.payload.doc.id;
             return {id,...data}
           })
         })

      )
   }// fin del constructor


   addCuota(cuota){

    return this.cuotasCollection.add({
      ...cuota,
      fechaInicio:firebase.firestore.FieldValue.serverTimestamp(),
      
    })
  }



  
  //https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md ---> querys dinamicas
  //https://www.youtube.com/watch?v=pHYy3wowGoc, https://firebase.google.com/docs/firestore/query-data/index-overview?hl=es-419 ---> indices de busquedas anidados y compuestas firebase
  getCuotas(idCliente){
    return this.cuota$=this.db.collection('cuotas',ref=>ref.orderBy('numeroCuota','asc').where('idCliente','==',idCliente)).valueChanges()
 

  }


}
