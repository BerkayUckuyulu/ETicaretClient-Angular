import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomersModule } from '../components/customers/customers.module';
import { CustomersComponent } from '../components/customers/customers.component';



@NgModule({
  declarations: [
    LayoutComponent,
    
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    MatSidenavModule,
    
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
