import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './item-search.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemSearchRoutingModule {}
