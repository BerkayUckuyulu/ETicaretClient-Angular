import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { HeaderComponent } from './layout/components/header/header.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,

  ],
  exports: [
    LayoutModule,

  ]
})
export class AdminModule { }
