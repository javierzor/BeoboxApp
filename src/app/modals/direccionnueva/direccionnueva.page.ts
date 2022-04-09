import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-direccionnueva',
  templateUrl: './direccionnueva.page.html',
  styleUrls: ['./direccionnueva.page.scss'],
})
export class DireccionnuevaPage implements OnInit {
  tipo_direccion: any;
  direccion: any;
  secretKey = "123456&Descryption";
  informacion_perfil: any;
  direccionesderetiro: any;


  constructor(
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

  ) { }

  ngOnInit() {
    this.obtenerdirecciones();
  }

  obtenerdirecciones(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    var databeoboxobtenerdirecciones = {
      nombre_solicitud: 'beoboxobtenerdirecciones',
      id_user: this.informacion_perfil.id
    }
     this.variosservicios.variasfunciones(databeoboxobtenerdirecciones).subscribe(async( res: any ) =>{
       console.log('respuesta de beoboxobtenerdirecciones', res);
       this.direccionesderetiro=res;
     });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }
  
  dismissyactualiza() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.varios.loading2segundos('Agregando, Porfavor espere...');
  }


  agregardireccion(){

    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    var databeoboxobtenerdirecciones = {
      nombre_solicitud: 'beoboxobtenerdirecciones',
      id_user: this.informacion_perfil.id
    }
     this.variosservicios.variasfunciones(databeoboxobtenerdirecciones).subscribe(async( res: any ) =>{
       console.log('respuesta de beoboxobtenerdirecciones', res);
       this.direccionesderetiro=res;
       if (this.direccionesderetiro.length<1){
         console.log('puede agregar');

         var databeoboxagregardireccion = {
          nombre_solicitud: 'beoboxagregardireccion',
          id_user: this.informacion_perfil.id,
          tipo_direccion:this.tipo_direccion,
          direccion_data:this.direccion,
        }
         this.variosservicios.variasfunciones(databeoboxagregardireccion).subscribe(async( res: any ) =>{
           console.log('respuesta de beoboxagregardireccion', res);
           this.dismissyactualiza();
          });

       }
       else {
         this.variosservicios.presentToast("..::Disculpe, solo puede agregar una dirección de retiro.::..");
         this.dismissyactualiza();
        }
     });

  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }


  

}
