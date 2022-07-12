import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';
import { MenuController,LoadingController } from '@ionic/angular';
import { PaisesService } from 'src/app/service/paises.service';

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
  name: any;
  lastname: any;
  paisID: any;
  paisnombre: any;
  email: any;
  password: any;
  referidor: any;
  countrySelected:any;
  countryData: any;
  respuestabeoboxactualizarticketsmails: any;
  paisdataseleccionado: any;

  constructor(
    private paises: PaisesService,
    private loadingController: LoadingController,
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

  ) 
  
  {
     this.countryData=this.paises.countryData;    

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

  async cambiotickets(cadaadminticketsmail, cadaadminid){

    const actualizando = await this.loadingController.create({
      message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
      });
      actualizando.present();

    if(cadaadminticketsmail){
      console.log('desactivando');
      var databeoboxactualizarticketsmails = {
        id:cadaadminid,
        nombre_solicitud: 'beoboxactualizarticketsmails1'
      }
      this.variosservicios.variasfunciones(databeoboxactualizarticketsmails).subscribe(async( res: any ) =>{
        console.log('respuesta de beoboxactualizarticketsmails', res);
        actualizando.dismiss();
        this.obteneradministracion();

    });

    }
    else{
      console.log('activando');
      var databeoboxactualizarticketsmails2 = {
        id:cadaadminid,
        nombre_solicitud: 'beoboxactualizarticketsmails2'
      }
      this.variosservicios.variasfunciones(databeoboxactualizarticketsmails2).subscribe(async( res: any ) =>{
        console.log('respuesta de beoboxactualizarticketsmails2', res);
        actualizando.dismiss();
        this.obteneradministracion();

    });
    }
  }

  ONCHANGEPAIS(event){
    console.log('index', event.target.value);
    this.paisdataseleccionado= this.countryData[event.target.value];
    console.log('paisData',this.paisdataseleccionado);
  }


  agregaradmin(){
    this.variosservicios.loading2segundos("Creando espere...");
    console.log('Agregando admin o moderador');
    var databeoboxactualizarticketsmails = {
      nombre_solicitud: 'beoboxcreateuser',
      create_date: new Date(),
      username:this.email,
      password:this.password,
      tipo_cuenta:this.tipo_cuenta,
      email:this.email,
      name:this.name,
      lastname:this.lastname,
      paisnombre:this.paisdataseleccionado.name,
      paisID:this.paisdataseleccionado.id,
      referidor: this.referidor
    }
    this.variosservicios.variasfunciones(databeoboxactualizarticketsmails).subscribe(async( res: any ) =>{
      console.log('respuesta de beoboxcreateuser', res);
      this.step='1';
      this.variosservicios.presentToast("..::Creacion de cuenta especial exitoso::..");
      this.obteneradministracion();
  });
  }


}
