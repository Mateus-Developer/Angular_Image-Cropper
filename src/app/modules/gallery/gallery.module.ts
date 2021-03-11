import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { MaterialDesignModule } from './../../shared/material-design/material-design.module';


@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    FlexLayoutModule,
    GalleryRoutingModule
  ]
})
export class GalleryModule { }
