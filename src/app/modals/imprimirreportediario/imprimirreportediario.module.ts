import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImprimirreportediarioPageRoutingModule } from './imprimirreportediario-routing.module';

import { ImprimirreportediarioPage } from './imprimirreportediario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprimirreportediarioPageRoutingModule
  ],
  declarations: [ImprimirreportediarioPage]
})
export class ImprimirreportediarioPageModule {}
