import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductActionPage } from './product-action';

@NgModule({
  declarations: [
    ProductActionPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductActionPage),
  ],
})
export class ProductActionPageModule {}
