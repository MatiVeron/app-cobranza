import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AngularFirestore,AngularFirestoreCollection} from '@angular/fire/firestore';
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


  getCuotas(idCliente){
    return this.cuota$.pipe(
      filter(cuota =>cuota.idCliente = idCliente)
 
       );
  
  }

}
