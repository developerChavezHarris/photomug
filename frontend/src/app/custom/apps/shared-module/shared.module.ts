import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModuleRoutingModule } from './shared-routing.module';
import { SharedModuleComponent } from './shared.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [SharedModuleComponent, TopNavigationComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,
    FontAwesomeModule,
  ]
})
export class SharedModuleModule { }
