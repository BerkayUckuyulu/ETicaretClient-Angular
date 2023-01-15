import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';



@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'x', component: CustomersComponent }
    ])
  ],
  exports:[CustomersComponent]
})
export class CustomersModule { }
