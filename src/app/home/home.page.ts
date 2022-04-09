import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController,LoadingController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  bitcoinlogo = "/assets/criptologos/Bitcoin.svg";
  bitcoinactual: number;
  bitcoinanterior: number;
  bitcoinaumento: number = 0;
  bitcoinreduccion: number = 0;
  bitcoinporcentajedeincremento: number;
  bitcoinporcentajededisminucion: number;
  trxlogo = "/assets/criptologos/trx.svg";
  trxactual: number;
  trxanterior: number;
  trxaumento: number = 0;
  trxreduccion: number = 0;
  trxporcentajedeincremento: number;
  trxporcentajededisminucion: number;
  dotlogo = "/assets/criptologos/dot.svg";
  dotactual: number;
  dotanterior: number;
  dotaumento: number = 0;
  dotreduccion: number = 0;
  dotporcentajedeincremento: number;
  dotporcentajededisminucion: number;
  adalogo = "/assets/criptologos/ada.svg";
  adaactual: number;
  adaanterior: number;
  adaaumento: number = 0;
  adareduccion: number = 0;
  adaporcentajedeincremento: number;
  adaporcentajededisminucion: number;
  informacion_perfil: any;
  precio_wera_usd: any;
  time_actual: Date= new Date;
  respuestabeoboxanuncios: any;
  variabledelsegmentmodel:any='0';
  respuestabeoboxobteneradmindirecciones: any;
  constructor(
    private loadingController: LoadingController,
    private variosservicios: VariosService,
    private router: Router,
    private menu: MenuController,
    private clipboard: Clipboard
  ) 
  {
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();
    this.obtenerprecio_wera_usdsegunfase();
    this.Obteneradmindirecciones();
  }

  ionViewWillEnter(){
    this.menu.enable(true);
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();
    this.Obteneradmindirecciones();
  }

  async ngOnInit() {
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.obtenerAnuncios();
    this.obtenerprecio_wera_usdsegunfase();
    this.Obteneradmindirecciones();
 }

 //EMPIEZA los menu superior y sus ONCHANGE
  async ObtenerProfileInfo(){
  this.informacion_perfil=localStorage.getItem('profileInfo');
  this.informacion_perfil=this.decrypt(this.informacion_perfil);
  this.informacion_perfil=JSON.parse(this.informacion_perfil);
  console.log('informacion de perfil en Perfil', this.informacion_perfil);
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

  ONCHANGEmenuderechosuperior(){
    if(this.menuderechosuperior==false){
      this.menuderechosuperior=true;
    }
    else{
      this.menuderechosuperior=false;
    }
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

obtenerprecio_wera_usdsegunfase(){
  var databeoboxobtenerprecio_wera_usd = {
    nombre_solicitud: 'beoboxobtenerprecio_wera_usd'
  }
  this.variosservicios.variasfunciones(databeoboxobtenerprecio_wera_usd).subscribe(async( res: any ) =>{
    console.log('respuesta de beoboxobtenerprecio_wera_usd', res);
    this.precio_wera_usd=res;
});
}

retirar(monto){
  console.log('el usuario desea retirar=',monto)
}



obtenerAnuncios(){
  var databeoboxanuncios = {
    nombre_solicitud: 'beoboxanuncios',
  }
   this.variosservicios.variasfunciones(databeoboxanuncios).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxanuncios', res);
     this.respuestabeoboxanuncios=res;
   });
}

Obteneradmindirecciones(){
  var databeoboxobteneradmindirecciones = {
    nombre_solicitud: 'beoboxobteneradmindirecciones',
  }
   this.variosservicios.variasfunciones(databeoboxobteneradmindirecciones).subscribe(async( res: any ) =>{
     console.log('respuesta de beoboxobteneradmindirecciones', res);
     this.respuestabeoboxobteneradmindirecciones=res;
   });
}



ocultaranuncio(cadaanuncio, i){
  this.respuestabeoboxanuncios[i].hidden=true;
}

async copiar(texto) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(texto);
    } catch (err) {}
  }
}

async segmentChanged(event){

  const actualizando = await this.loadingController.create({
  message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
  });
  console.log(this.variabledelsegmentmodel);
  actualizando.dismiss();
  if(this.variabledelsegmentmodel==undefined||this.variabledelsegmentmodel==null){
    this.variabledelsegmentmodel='0';
  }

}



}
