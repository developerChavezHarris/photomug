import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
  { 
    path: 'home', loadChildren: () => import('./custom/apps/home/home.module').then(m => m.HomeModule) 
  }, 
  { 
    path: 'upload', loadChildren: () => import('./custom/apps/upload/upload.module').then(m => m.UploadModule) 
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
