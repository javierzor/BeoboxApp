import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-anunciosleermas',
  templateUrl: './anunciosleermas.page.html',
  styleUrls: ['./anunciosleermas.page.scss'],
})
export class AnunciosleermasPage implements OnInit {

  dataparaelmodal;

  constructor(
    public modalController: ModalController,
  ) 
  { 
  }

  ngOnInit() {
    console.log('dataparaelmodal', this.dataparaelmodal);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }

}
