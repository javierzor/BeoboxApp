import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarequipoPageRoutingModule } from './editarequipo-routing.module';

import { EditarequipoPage } from './editarequipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarequipoPageRoutingModule
  ],
  declarations: [EditarequipoPage]
})
export class EditarequipoPageModule {}
