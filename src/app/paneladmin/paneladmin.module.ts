import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CalendarModule } from 'ion2-calendar';

import { IonicModule } from '@ionic/angular';

import { PaneladminPageRoutingModule } from './paneladmin-routing.module';

import { PaneladminPage } from './paneladmin.page';

@NgModule({
  imports: [
    CalendarModule,
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    PaneladminPageRoutingModule
  ],
  declarations: [PaneladminPage]
})
export class PaneladminPageModule {}
