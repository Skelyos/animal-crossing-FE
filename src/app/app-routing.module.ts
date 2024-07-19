import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: 'item-search',
    loadChildren: () => import('./item-search/item-search.module').then(m => m.ItemSearchModule)
  },
  {
    path: '',
    redirectTo: '/item-search',
    pathMatch: 'full'
  },
  {
    path: 'tabs/item-search',
    redirectTo: '/item-search',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
