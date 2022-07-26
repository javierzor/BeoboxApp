import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprimirreportediarioPage } from './imprimirreportediario.page';

const routes: Routes = [
  {
    path: '',
    component: ImprimirreportediarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprimirreportediarioPageRoutingModule {}
