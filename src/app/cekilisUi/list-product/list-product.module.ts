import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ListProductComponent }]),
  ],
})
export class ListProductModule {}
