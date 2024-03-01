import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'userApp', pathMatch: 'full' },
  { path: 'userApp',
      loadChildren: () => import('./user/user.module').then((x) => x.UserModule),
      data: { preload: true },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
