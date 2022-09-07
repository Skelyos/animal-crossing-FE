import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './item-search.page';

import { HttpClientModule } from '@angular/common/http';
import { ItemSearchRoutingModule } from './item-search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    ItemSearchRoutingModule
  ],
  declarations: [Tab1Page]
})
export class ItemSearchModule {}
