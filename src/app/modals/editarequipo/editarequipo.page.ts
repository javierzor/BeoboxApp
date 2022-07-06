import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-editarequipo',
  templateUrl: './editarequipo.page.html',
  styleUrls: ['./editarequipo.page.scss'],
})
export class EditarequipoPage implements OnInit {
  respuestabeoboxtraerusuariosadministradores: any;
  informacion_perfil: any;
  secretKey = "123456&Descryption";
  step: any = '1';
  tipo_cuenta: any;
  constructor(
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

  ) 
  
  {

  }

  ngOnInit() {
    this.obteneradministracion();    
  }

  dismissyactualiza() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.varios.loading2segundos('Agregando, Porfavor espere...');
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }

  obteneradministracion(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);

    var databeoboxtraerusuariosadministradores = {
      tipo_cuenta:this.informacion_perfil.tipo_cuenta,
      nombre_solicitud: 'beoboxtraerusuariosadministradores'
    }
    this.variosservicios.variasfunciones(databeoboxtraerusuariosadministradores).subscribe(async( res: any ) =>{
      console.log('respuesta de beoboxtraerusuariosadministradores', res);
      this.respuestabeoboxtraerusuariosadministradores=res;
  });
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
  step1(){
    this.step='1';
  }

  step2(){
    this.step='2';
  }


}
