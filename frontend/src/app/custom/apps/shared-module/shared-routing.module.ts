import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModuleComponent } from './shared.component';

const routes: Routes = [{ path: '', component: SharedModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedModuleRoutingModule { }
