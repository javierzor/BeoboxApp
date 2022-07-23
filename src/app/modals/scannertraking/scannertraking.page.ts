import { Component, OnInit } from '@angular/core';
// To use Html5QrcodeScanner (more info below)
import {Html5QrcodeScanner} from "html5-qrcode"

// To use Html5Qrcode (more info below)
import {Html5Qrcode} from "html5-qrcode";
import { QrcodeResultFormat } from 'html5-qrcode/esm/core';



@Component({
  selector: 'app-scannertraking',
  templateUrl: './scannertraking.page.html',
  styleUrls: ['./scannertraking.page.scss'],
})
export class ScannertrakingPage implements OnInit {


  constructor() { }


  


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

        // const html5QrCode = new Html5Qrcode(/* element id */ "reader");

        // const html5QrCode = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        // html5QrCode.start(cameraId,config, onScanSuccess(), onScanFailure);



        const html5QrCode = new Html5Qrcode(/* element id */ "reader");
        html5QrCode.start(
          cameraId, 
          {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
          },
          
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
        });



        
      }
    }).catch(err => {
      // handle err
              console.log('error', err);

    });



  }
  QrcodeResultFormat(): import("html5-qrcode/esm/core").QrcodeSuccessCallback {
    throw new Error('Method not implemented.');
  }

}


// function onScanSuccess(decodedText, decodedResult) {
//   // handle the scanned code as you like, for example:
//   console.log(`Code matched = ${decodedText}`, decodedResult);
// }

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}


function onScanSuccess(): import("html5-qrcode/esm/core").QrcodeSuccessCallback {
  throw new Error('Function not implemented.');
}

