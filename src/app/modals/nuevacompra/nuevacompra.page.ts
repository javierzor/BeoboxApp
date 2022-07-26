import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';
import { ImageService } from '../../service/image.service';
import { Image } from './../../models/image.model';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import {Html5Qrcode,Html5QrcodeScanner,Html5QrcodeSupportedFormats,Html5QrcodeScannerState,Html5QrcodeScanType} from "html5-qrcode";

@Component({
  selector: 'app-nuevacompra',
  templateUrl: './nuevacompra.page.html',
  styleUrls: ['./nuevacompra.page.scss'],
})
export class NuevacompraPage implements OnInit {

  metodoindex: any;
  direccion: any;
  secretKey = "123456&Descryption";
  informacion_perfil: any;
  admindirecciones: any;
  montoenweras:any;
  montoendolares:any;
  infovariable:any;
  mostrarinformaciondepago: boolean = false;
  imageProfile: any = null;
  new_url_image: any = null;
  montopasadoaweras: any = null;
  precio_wera_usd: any;
  filterTerm: string;
  respuestabeoboxobtenerusuariosbusqueda: any;
  mostrarleusuarios:  boolean = false;
  selected_user: any;
  indexdeusuario: any;
  traking: any;
  peso: any;
  origen: any;
  mostrarcampopuntos:  boolean = false;
  puntos:any;
  observacion:any;
  step:any = '1';
  estado: any;
  html5QrCode222: Html5Qrcode;
  camaras: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private imageService: ImageService,
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

  ) 
  {
    this.obtenerprecio_wera_usdsegunfase();
   }

  ngOnInit() {
    this.obtenerAdminDirecciones();
    this.obtenerprecio_wera_usdsegunfase();
    this.ObtenerUsariosNormales();
  }

  obtenerprecio_wera_usdsegunfase(){
    var databeoboxobtenerprecio_wera_usd = {
      nombre_solicitud: 'beoboxobtenerprecio_wera_usd'
    }
    this.variosservicios.variasfunciones(databeoboxobtenerprecio_wera_usd).subscribe(async( res: any ) =>{
      console.log('respuesta de beoboxobtenerprecio_wera_usd', res);
      this.precio_wera_usd=res;
  });
  }

  ObtenerUsariosNormales(){
    var databeoboxobtenerusuariosbusqueda = {
      nombre_solicitud: 'beoboxobtenerusuariosbusqueda'
    }
    this.variosservicios.variasfunciones(databeoboxobtenerusuariosbusqueda).subscribe(async( res: any ) =>{
      console.log('respuesta de beoboxobtenerusuariosbusqueda', res);
      this.respuestabeoboxobtenerusuariosbusqueda=res;
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
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }


  obtenerAdminDirecciones(){
      var databeoboxobteneradmindirecciones = {
        nombre_solicitud: 'beoboxobteneradmindirecciones'
      }
      this.variosservicios.variasfunciones(databeoboxobteneradmindirecciones).subscribe(async( res: any ) =>{
        console.log('respuesta de beoboxobteneradmindirecciones', res);
        this.admindirecciones=res;
    });
  }

  ONCHANGEmetodo(event){
    this.infovariable = this.admindirecciones[event.target.value];
    console.log('infovarible', this.infovariable);
    this.mostrarinformaciondepago=false;

  }

  
    async IONFOCUSmontoenweras(){
      this.montoendolares=null;
    }

    async IONFOCUSmontoendolares(){
     this.montoenweras=null;
    }

  
  MostrarInfo(){
    this.mostrarinformaciondepago=true;
  }

  NoMostrarInfo(){
    this.mostrarinformaciondepago=false;
  }



  async takePicture(event: any){
    const input = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageProfile = event.target.result;
      this.sendPhotos(input);
    }
    reader.readAsDataURL(event.target.files[0]); 
  }
  
  sendPhotos(file){
    this.imageService.generateUrl(file).subscribe(x => {
      let imagentemporal = new Image();
      imagentemporal.urlImage = x.data.url;
      this.new_url_image=imagentemporal.urlImage;
      console.log('this.new_url_image',this.new_url_image);
    }); 
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }


  agregarcompra(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    




      if(this.mostrarcampopuntos){  }
      else { this.puntos=0;  }

      var dataagregarmovimiento = {
        id_tipo_movimiento: '1',
        nombre_solicitud: 'beoboxcrearmovimiento',
        id_user: this.selected_user.id,
        traking: this.traking,
        peso:this.peso,
        origen:this.origen,
        mas_o_menos:'mas',
        monto:this.puntos,
        reciboImgUrl: this.new_url_image,
        observacion: this.observacion
      }
    

    console.log('data a guardar', dataagregarmovimiento);

    this.variosservicios.variasfunciones(dataagregarmovimiento).subscribe(async( res: any ) =>{
      console.log('respuesta de beoboxcrearmovimiento', res);
      this.dismissyactualiza();
      });


  }
  
  mostrarleusuariosverdadero(){
    this.mostrarleusuarios=true;
  }
  mostrarleusuariosfalso(){
      setTimeout(() => 
      {
        this.mostrarleusuarios=false;
      },
      150);
}
  

  esteusuario(usuario, i){
    console.log('Usuario',usuario);
    // this.indexdeusuario= i;
    this.selected_user=usuario;
  }

  borrarSelectedUser(){
    this.selected_user=undefined;
  }



  
  escanearQRDeTrakig(indexdecamara) {

    this.step='2';

    if(this.html5QrCode222){
        this.html5QrCode222.stop();
    }

    Html5Qrcode.getCameras().then(devices => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
          this.camaras = devices;
          var cameraId = devices[indexdecamara].id;
      
        // .. use this to start scanning.
        console.log('cameraId', cameraId);
        const config = { 
          fps: 10, 
          qrbox: { width: 350, height: 350 } ,
          formatsToSupport: [ 
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.AZTEC,
            Html5QrcodeSupportedFormats.CODABAR,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.CODE_93,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.DATA_MATRIX,
            Html5QrcodeSupportedFormats.MAXICODE,
            Html5QrcodeSupportedFormats.ITF,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.PDF_417,
            Html5QrcodeSupportedFormats.RSS_14,
            Html5QrcodeSupportedFormats.RSS_EXPANDED,
            Html5QrcodeSupportedFormats.UPC_A,
            Html5QrcodeSupportedFormats.UPC_E,
            Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
          ]
        };

        this.html5QrCode222 = new Html5Qrcode(/* element id */ "reader");
        this.html5QrCode222.start(
          cameraId, 
          config,

          (decodedText, decodedResult) => {
            // do something when code is read
            console.log('decodedText',decodedText);
            console.log('decodedResult',decodedResult);
            if(decodedResult){
              this.traking=decodedResult;
              this.html5QrCode222.stop().then((ignore) => {
                // QR Code scanning is stopped.
                this.step='1';
                }).catch((err) => {
                  // Stop failed, handle it.
                });
            }


          },
          (errorMessage) => {
            // parse error, ignore it.
          })
        .catch((err) => {
          // Start failed, handle it.
          console.log('err del catch', err);
        });



        
      }
    }).catch(err => {
      // handle err
              console.log('error', err);

    });



  }


  cerrarqrscanner(){
    this.estado= Html5QrcodeScannerState;
    this.html5QrCode222.stop();
    console.log('this.estado=', this.estado);
    this.step='1';

  }
  


  
}
