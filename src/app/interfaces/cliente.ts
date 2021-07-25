export interface Cliente {
    id?:string
    //fechaIngreso:Date;
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
}
