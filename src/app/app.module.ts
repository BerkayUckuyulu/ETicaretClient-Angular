import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { LayoutComponent } from './admin/layout/layout.component';
import { LayoutModule } from './admin/layout/layout.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import { Base } from './base';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    { provide: 'baseUrl', useValue: 'https://localhost:7183/api', multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
