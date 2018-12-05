import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmspageRoutingModule } from './cmspage-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [AboutComponent, ContactComponent],
  imports: [
    CommonModule,
    CmspageRoutingModule
  ]
})
export class CmspageModule { }
