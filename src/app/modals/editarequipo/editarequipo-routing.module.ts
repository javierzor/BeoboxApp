import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarequipoPage } from './editarequipo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarequipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarequipoPageRoutingModule {}
