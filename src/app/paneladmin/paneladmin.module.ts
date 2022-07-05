import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { PaneladminPageRoutingModule } from './paneladmin-routing.module';

import { PaneladminPage } from './paneladmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    PaneladminPageRoutingModule
  ],
  declarations: [PaneladminPage]
})
export class PaneladminPageModule {}
