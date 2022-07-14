import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnunciosleermasPage } from './anunciosleermas.page';

const routes: Routes = [
  {
    path: '',
    component: AnunciosleermasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnunciosleermasPageRoutingModule {}
