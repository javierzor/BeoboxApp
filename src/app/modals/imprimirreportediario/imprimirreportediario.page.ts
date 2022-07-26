import { Component, OnInit } from '@angular/core';
// import * as jsPDF from 'jspdf';
// import {jsPDF} from 'jspdf';
// import jsPDF from 'jspdf';
import * as jsPDF from 'jspdf';
import { ModalController } from '@ionic/angular';

// import jspdf from 'jspdf';
import * as $ from 'jquery';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-imprimirreportediario',
  templateUrl: './imprimirreportediario.page.html',
  styleUrls: ['./imprimirreportediario.page.scss'],
})


export class ImprimirreportediarioPage implements OnInit {
  reportederegistros;

  @ViewChild('content', {static: false}) content: ElementRef;

  constructor(
    private modalController: ModalController,

  )
   { 
     
   }
   
   ngOnInit() {
    console.log('TRAIDO POR ODAL PARAMS reportederegistros', this.reportederegistros);
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }
  

  public downloadPDF() {
    // const doc = new jsPDF();
    // var doc = new jsPDF();
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('ReporteDiario.pdf');
  }

}



// let jsPDF = require('jspdf');
// var doc = new jspdf();
// let source = document.getElementById("content");

// doc.fromHTML(
//   source,
//   15,
//   15,
//   {
//     'width': 180
//   });
// doc.save('sample-file.pdf');



// let jsPDF = require('jspdf');
// var doc = new jspdf();
// let pageInfo = doc.internal.getCurrentPageInfo();
// doc.setPage(1);
// const div = #content
// await doc.html(div);
// doc.save('test.pdf'); // save / download
// doc.output('dataurlnewwindow'); // just open it

// doc.fromHTML($('#pdf').get(0), 10, 10, {
//   'width': 180
// });
// doc.autoPrint();
// doc.output("dataurlnewwindow");
// // this opens a new popup,  after this the PDF opens the print window view but there are browser inconsistencies with how this is handled

