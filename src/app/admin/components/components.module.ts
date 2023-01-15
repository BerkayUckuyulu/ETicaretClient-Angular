import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomersModule } from './customers/customers.module';
import { CustomersComponent } from './customers/customers.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    OrderModule,
    DashboardModule,
    CustomersModule,
  ],
  exports:[]
  
})
export class ComponentsModule { }
