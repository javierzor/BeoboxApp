import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { ToastController, LoadingController } from "@ionic/angular";
import { VisualizadorimagenesPage } from '../modals/visualizadorimagenes/visualizadorimagenes.page';
import { ModalController } from '@ionic/angular';
import { NuevafasePage } from '../modals/nuevafase/nuevafase.page';
import { NuevacompraPage } from '../modals/nuevacompra/nuevacompra.page';
import { ActualizardireccionPage } from '../modals/actualizardireccion/actualizardireccion.page';
import { DatePipe } from '@angular/common'
import { ActualizarretirooficinaPage } from '../modals/actualizarretirooficina/actualizarretirooficina.page';
import { VerconversacionPage } from '../modals/verconversacion/verconversacion.page';
import { AdminverconversacionPage } from '../modals/adminverconversacion/adminverconversacion.page';
import { EditarequipoPage } from '../modals/editarequipo/editarequipo.page';


@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.page.html',
  styleUrls: ['./paneladmin.page.scss'],
})



export class PaneladminPage implements OnInit {
  segmentModel: any;
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  imageProfile: any = null;
  informacion_perfil: any;
  respuestadebeoboxadminobtenermovimientos: any;
  respuestadebeoboxadminobtenerlistadeuduarios: any;
  ModalAggFaseAbierto: boolean=false;
  respuestabeoboxanuncios: any;
  respuestabeoboxobteneradmindirecciones: any;
  cambiarestado_a: any;
  fecha_inicio: string;
  fecha_fin: string;
  estado: any;
  reportederegistros: any;
  cambioelselector: boolean=false;
  listasdechat: any;
  filterTerm: string;


  constructor(
    private datepipe : DatePipe,
    private alertController: AlertController,
    private variosservicios: VariosService,
    private modalController: ModalController,
    public varios: VariosService,
    private router: Router,
    private menu: MenuController,
    private loadingController: LoadingController,
  )
   {
    // this.progress=0;
   }
  ionViewWillEnter(){
    this.menu.enable(true);
    this.ObtenerProfileInfo();
    this.variosservicios.activar_realtime_admin_conversaciones=true;
  }
  async ngOnInit() {
    this.segmentModel=null;
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.ModalAggFaseAbierto=false;

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

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  //terminan las funciones del menu superior derecho

  async segmentChanged(){

    const actualizando = await this.loadingController.create({
    message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
    });
    console.log(this.segmentModel);
    if(this.segmentModel!='chatdesoporte'){
      actualizando.present();
      this.varios.activar_realtime_admin_conversaciones=false;
    }
    
if(this.segmentModel=='solicitudesdecompras'){
  var databeoboxadminobtenermovimientos = {
    nombre_solicitud: 'beoboxadminobtenermovimientos',
    id_user: this.informacion_perfil.id
  }
   this.variosservicios.variasfunciones(databeoboxadminobtenermovimientos).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxadminobtenermovimientos', res);
     this.respuestadebeoboxadminobtenermovimientos=res;
     actualizando.dismiss();
   });
}


if(this.segmentModel=='activardesacusuario'){
  var databeoboxadminobtenerlistadeuduarios = {
    nombre_solicitud: 'beoboxadminobtenerlistadeuduarios'
  }
   this.variosservicios.variasfunciones(databeoboxadminobtenerlistadeuduarios).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxadminobtenerlistadeuduarios', res);
     this.respuestadebeoboxadminobtenerlistadeuduarios=res;
     actualizando.dismiss();
   });
}

if(this.segmentModel=='veraumentarfase'){
  var databeoboxanuncios = {
    nombre_solicitud: 'beoboxanuncios'
  }
   this.variosservicios.variasfunciones(databeoboxanuncios).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxanuncios', res);
     this.respuestabeoboxanuncios=res;
     actualizando.dismiss();
   });
}

if(this.segmentModel=='direcciones'){
  var databeoboxobteneradmindirecciones = {
    nombre_solicitud: 'beoboxobteneradmindirecciones',
    id_user: this.informacion_perfil.id
  }
   this.variosservicios.variasfunciones(databeoboxobteneradmindirecciones).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxobteneradmindirecciones', res);
     this.respuestabeoboxobteneradmindirecciones=res;
     actualizando.dismiss();
   });
}

if(this.segmentModel=='reportes'){
   actualizando.dismiss();
}

if(this.segmentModel=='chatdesoporte'){
  actualizando.dismiss();
  this.varios.activar_realtime_admin_conversaciones=true;
  if(this.varios.activar_realtime_admin_conversaciones==true&&this.varios.activar_real_time_modal_ver_conversacion_chat==false){
    
    setTimeout(()=>{ 
          this.FuncionObtenerlistasdechat();
          // this.segmentModel='chatdesoporte';
          this.segmentChanged();
          },8000);
      }
}


}

async EditarEquipox() {
  const modal = await this.modalController.create({
    component: EditarequipoPage,
    componentProps: { 
      dataparaelmodal:'nadaparaenviar'
    }
    });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
      if(data.data.dismissed==true){
      }
    });


  return await modal.present();
}


FuncionObtenerlistasdechat(){
  var databeoboxobteneradminconversaciones = {
    nombre_solicitud: 'beoboxobteneradminconversaciones'
  }
   this.variosservicios.variasfunciones(databeoboxobteneradminconversaciones).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxobteneradminconversaciones', res);
     this.listasdechat=res;
   });
}

async leermensajes(ticket) {
  const modal = await this.modalController.create({
    component: AdminverconversacionPage,
    componentProps: { 
      dataparaelmodal:ticket
    }
    });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
      console.log('data',data);
      this.varios.activar_realtime_admin_conversaciones=true;
      this.varios.activar_real_time_modal_ver_conversacion_chat=false;
      this.segmentModel='chatdesoporte';
      this.segmentChanged();
      
    });


  return await modal.present();
}



suspender(){
  
}

verificar(){
  
}


async VerImagen(ImgUrl) {
  const modal = await this.modalController.create({
    component: VisualizadorimagenesPage,
    componentProps: {
      'dataparaelmodal': ImgUrl
    },
    initialBreakpoint: 1.2,
    breakpoints: [1, 1.5, 1]
  });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
    });


  return await modal.present();
}


    verificarmovimiento(movimiento){
      var databeoboxverificarunmovimiento = {
        nombre_solicitud: 'beoboxverificarunmovimiento',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_movimiento: movimiento.id
      }
       this.variosservicios.variasfunciones(databeoboxverificarunmovimiento).subscribe(async( res: any ) =>{
         console.log('respuesta de beoboxverificarunmovimiento', res);
         if(res>0){
          this.segmentModel='solicitudesdecompras';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }


    suspendermovimiento(movimiento){
      var databeoboxsuspenderunmovimiento = {
        nombre_solicitud: 'beoboxsuspenderunmovimiento',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_movimiento: movimiento.id
      }
       this.variosservicios.variasfunciones(databeoboxsuspenderunmovimiento).subscribe(async( res: any ) =>{
         console.log('respuesta de beoboxsuspenderunmovimiento', res);
         if(res>0){
          this.segmentModel='solicitudesdecompras';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }

    suspenderusuario(usuario){
      var databeoboxsuspenderusuario = {
        nombre_solicitud: 'beoboxsuspenderusuario',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_usuario: usuario.id
      }
       this.variosservicios.variasfunciones(databeoboxsuspenderusuario).subscribe(async( res: any ) =>{
         console.log('respuesta de beoboxsuspenderusuario', res);
         if(res>0){
          this.segmentModel='activardesacusuario';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }

    activarusuario(usuario){
      var databeoboxverificarusuario = {
        nombre_solicitud: 'beoboxverificarusuario',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_usuario: usuario.id
      }
       this.variosservicios.variasfunciones(databeoboxverificarusuario).subscribe(async( res: any ) =>{
         console.log('respuesta de beoboxverificarusuario', res);
         if(res>0){
          this.segmentModel='activardesacusuario';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }
    
    async borraranuncios(cadaanuncio){
      var databeoboxborraranuncio = {
        nombre_solicitud: 'beoboxborraranuncio',
        id:cadaanuncio.id
      }
       this.variosservicios.variasfunciones(databeoboxborraranuncio).subscribe(async( res: any ) =>{
         console.log('respuesta de beoboxborraranuncio', res);
         if(res){
            this.segmentModel='veraumentarfase';
            this.segmentChanged();
         }
         });
    }

    async AdminagregarFase(){

      
      const modal = await this.modalController.create({
        component: NuevafasePage,
        initialBreakpoint: 0.8,
        breakpoints: [0, 0.8, 3]
      });
      this.ModalAggFaseAbierto=true;
      modal.onDidDismiss().then((data) => {
          this.ModalAggFaseAbierto=false;
          console.log('data',data);
          if(data.data.dismissed==true){
            this.segmentModel='veraumentarfase';
            this.segmentChanged();
          }
        });
      return await modal.present();
    }

    async agregarcompra() {
      const modal = await this.modalController.create({
        component: NuevacompraPage,
        initialBreakpoint: 1.2,
        breakpoints: [1, 1.5, 1]
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          if(data.data.dismissed==true){
            this.segmentModel='solicitudesdecompras';
            this.segmentChanged();
          }
        });
    
    
      return await modal.present();
    }

    async actualizarAdminDireccion(cadadireccion) {
      const modal = await this.modalController.create({
        component: ActualizardireccionPage,
        initialBreakpoint: 1.2,
        componentProps: { 
          cadadireccion:cadadireccion
        },
        breakpoints: [1, 1.5, 1]
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          if(data.data.dismissed==true){
            this.segmentModel='direcciones';
            this.segmentChanged();
          }
        });
    
    
      return await modal.present();
    }

    async presentAlertRadio(movimiento) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class', header: 'Cambiar estado', inputs: [
          {name: 'recibido',type: 'radio',label: 'Recibido',value: 'recibido',
            handler: () => {
              console.log('Radio 1 selected'); this.cambiarestado_a='recibido';
            },
            checked: true
          },
          {name: 'en camino',type: 'radio',label: 'En camino',value: 'en camino',
            handler: () => {
              console.log('Radio 2 selected'); this.cambiarestado_a='en camino';
            }
          },
          {name: 'listo',type: 'radio',label: 'Listo',value: 'listo',
            handler: () => {
              console.log('Radio 3 selected');  this.cambiarestado_a='listo';
            }
          },
          {name: 'entregado',type: 'radio',label: 'Entregado',value: 'entregado',
            handler: () => {
              console.log('Radio 4 selected'); this.cambiarestado_a='entregado';
            }
          }
        ],
        buttons: [
          {
            text: 'Cancelar', role: 'cancel', cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: () => {
              console.log('Confirm Ok, this.cambiarestado_a=',this.cambiarestado_a);
              var databeoboxupdatemovimientostatus={nombre_solicitud:'beoboxupdatemovimientostatus', id: movimiento.id,status: this.cambiarestado_a};
              this.variosservicios.variasfunciones(databeoboxupdatemovimientostatus).subscribe(async( res: any ) =>{
                console.log('respuesta de beoboxupdatemovimientostatus', res);
                if(res){
                   this.segmentModel='solicitudesdecompras';
                   this.segmentChanged();
                }
                });
           




              
              
            }
          }
        ]
      });
  
      await alert.present();
    }

    BorrarUsuario(cadausuario){
      var databeoboxborraranuncio = {
        nombre_solicitud: 'beoboxborrarusuario',
        id:cadausuario.id
      }
       this.variosservicios.variasfunciones(databeoboxborraranuncio).subscribe(async( res: any ) =>{
         console.log('respuesta de beoboxborraranuncio', res);
         if(res){
            this.segmentModel='activardesacusuario';
            this.segmentChanged();
         }
         });
    }

    consultarReporte(){
      var databeoboxconsultarreporte = {
        nombre_solicitud:'beoboxconsultarreporte',
        fecha_inicio: this.datepipe.transform(this.fecha_inicio, 'yyyyMMdd'),
        fecha_fin: this.datepipe.transform(this.fecha_fin, 'yyyyMMdd'),
        status:this.estado
      }
      this.variosservicios.variasfunciones(databeoboxconsultarreporte).subscribe(async( res: any ) =>{
        console.log('respuesta de beoboxconsultarreporte', res);
        this.cambioelselector=false;
        this.reportederegistros=res;
        });
    }

    IONCHANGEselector(){
      this.cambioelselector=true;
      console.log('cambioelselector',this.cambioelselector);
    }

    async abrireditardireccionderetiro(){
      const modal = await this.modalController.create({
        component: ActualizarretirooficinaPage,
        componentProps: { 
        },
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          if(data.data.dismissed==true){
            this.variosservicios.presentToast("Dirección actualizada");
          }
        });
    
    
      return await modal.present();
    }


    ionViewWillLeave(){
      this.variosservicios.activar_realtime_user_conversaciones=false;
    }


}
