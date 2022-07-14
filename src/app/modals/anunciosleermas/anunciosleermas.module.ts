import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnunciosleermasPageRoutingModule } from './anunciosleermas-routing.module';

import { AnunciosleermasPage } from './anunciosleermas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnunciosleermasPageRoutingModule
  ],
  declarations: [AnunciosleermasPage]
})
export class AnunciosleermasPageModule {}
