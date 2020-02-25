import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRoutingModule } from './upload-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UploadComponent } from './upload.component';
import { UploadBaseComponent } from './upload-base/upload-base.component';


@NgModule({
  declarations: [UploadComponent, UploadBaseComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ]
})
export class UploadModule { }
