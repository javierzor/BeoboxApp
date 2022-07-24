import { Component, OnInit } from '@angular/core';

import {Html5Qrcode,Html5QrcodeScanner,Html5QrcodeSupportedFormats,Html5QrcodeScannerState,Html5QrcodeScanType} from "html5-qrcode";



@Component({
  selector: 'app-scannertraking',
  templateUrl: './scannertraking.page.html',
  styleUrls: ['./scannertraking.page.scss'],
})
export class ScannertrakingPage implements OnInit {

  constructor() 
  {

  }

  ngOnInit() {

    Html5Qrcode.getCameras().then(devices => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
        var cameraId = devices[0].id;
        // .. use this to start scanning.
        console.log('cameraId', cameraId);
        const config = { 
          fps: 10, 
          qrbox: { width: 250, height: 250 } ,
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

        const html5QrCode = new Html5Qrcode(/* element id */ "reader");
        html5QrCode.start(
          cameraId, 
          config,

          (decodedText, decodedResult) => {
            // do something when code is read
            console.log('decodedText',decodedText);
            console.log('decodedResult',decodedResult);

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

}


