import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { ImageService } from '../service/image.service';
import { Image } from './../models/image.model';
import { PaisesService } from '../service/paises.service';
import { AlertController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { DireccionnuevaPage } from '../modals/direccionnueva/direccionnueva.page';
import { ModalController } from '@ionic/angular';
import { NuevacompraPage } from '../modals/nuevacompra/nuevacompra.page';
import { VisualizadorimagenesPage } from '../modals/visualizadorimagenes/visualizadorimagenes.page';
import { VerconversacionPage } from '../modals/verconversacion/verconversacion.page';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  countryData: { id: number; name: string; }[];
  informacion_perfil: any;
  step:any;
  languages_active: any;
  tickets: any;
  tituloticketparaenviarcorreo: any;

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private variosservicios: VariosService,
    private router: Router,
    private menu: MenuController,
    private imageService: ImageService,
    private paises: PaisesService,
    public alertController: AlertController
  )
  {
    this.countryData=this.paises.countryData;    
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.step='1';
  }

  ionViewWillEnter(){
    this.menu.enable(true);
    this.variosservicios.activar_realtime_user_conversaciones=true;
    this.ConRealTime();
  }
  
  async ngOnInit() {
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.step='1';
    this.obtenertickets(); 
  }

  funcionverificarlogin(){
    this.verificarloginemail=localStorage.getItem('email');
    this.verificarloginemail= this.decrypt(this.verificarloginemail);
    console.log('this.verificarlogin', this.verificarloginemail);
    if(this.verificarloginemail!=null||this.verificarloginemail!='false')
     {
      console.log('Bienvenido:',this.verificarloginemail);
    }
  }

async ObtenerProfileInfo(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    console.log('informacion de perfil en Perfil', this.informacion_perfil);
  }
  ONCHANGEmenuderechosuperior(){
    if(this.menuderechosuperior==false)   {this.menuderechosuperior=true;}
    else{this.menuderechosuperior=false;}
  }
  ONCHANGEclickenelcontent(){
    this.menuderechosuperior=false;
  }
  iramiperfilDelMenuDerechoSuperior(){
    this.router.navigate(['perfil']);
    this.menuderechosuperior=false;
  }
  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
//Termina menu superior y sus ONCHANGE

obtenertickets(){
  this.informacion_perfil=localStorage.getItem('profileInfo');
  this.informacion_perfil=this.decrypt(this.informacion_perfil);
  this.informacion_perfil=JSON.parse(this.informacion_perfil);
  var databeoboxobteneruserconversaciones = {
    nombre_solicitud: 'beoboxobteneruserconversaciones',
    id_user: this.informacion_perfil.id
  }
   this.variosservicios.variasfunciones(databeoboxobteneruserconversaciones).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxobteneruserconversaciones', res);
     this.tickets=res;
   });
}

ConRealTime(){
  
  setTimeout(() => 
  {
    if(this.variosservicios.activar_realtime_user_conversaciones==true){
      this.obtenertickets(); 
      this.ConRealTime();  //se repite
    } 
    },
      8000);
}

  async crearticket(){


    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Crear ticket de soporte',
      inputs: [
        {
          name: 'asunto',
          type: 'text',
          // value: this.asunto,
          placeholder: 'Asunto:'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {

            if(alertData.asunto&&alertData.asunto!=''){
              this.tituloticketparaenviarcorreo=alertData.asunto;
              this.informacion_perfil=localStorage.getItem('profileInfo');
              this.informacion_perfil=this.decrypt(this.informacion_perfil);
              this.informacion_perfil=JSON.parse(this.informacion_perfil);
              var databeoboxcrearticket = {
                nombre_solicitud: 'beoboxcrearticket',
                id_user: this.informacion_perfil.id,
                asunto:alertData.asunto,
              }
               this.variosservicios.variasfunciones(databeoboxcrearticket).subscribe(async( res: any ) =>{
                 console.log('respuesta de beoboxcrearticket', res);
                 this.obtenertickets();
                 this.leermensajes(res);
                 this.EnviarMailPorCreacionDeTicket();
                });

            }
            else{
              this.variosservicios.presentToast('Debe ingresar un asunto!');
            }

            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  

}

async EnviarMailPorCreacionDeTicket(){

  var strdedia = new Date();
  var datestring = strdedia.toString();

  this.informacion_perfil=localStorage.getItem('profileInfo');
  this.informacion_perfil=this.decrypt(this.informacion_perfil);
  this.informacion_perfil=JSON.parse(this.informacion_perfil);

  var databeoboxenviaremailticket = {
    nombre_solicitud: 'beoboxenviaremailticket',
    nombre_autor_ticket: this.informacion_perfil.name+' '+this.informacion_perfil.lastname,
    id_publico_autor_ticket: this.informacion_perfil.id_publico,
    tituloticket: this.tituloticketparaenviarcorreo,
    datestring: datestring,
  }
   console.log('data a enviar',databeoboxenviaremailticket);
   this.variosservicios.variasfunciones(databeoboxenviaremailticket).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxenviaremailticket', res);
    });

  }


async leermensajes(ticket) {
  const modal = await this.modalController.create({
    component: VerconversacionPage,
    componentProps: { 
      dataparaelmodal:ticket
    }
    });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
      if(data.data.dismissed==true){
        this.variosservicios.activar_realtime_user_conversaciones=true;
        this.ConRealTime();
      }
    });


  return await modal.present();
}






ionViewWillLeave(){
  this.variosservicios.activar_realtime_user_conversaciones=false;
}


}