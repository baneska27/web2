import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitPageComponent } from './Components/init-page/init-page.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  {
    path:'',
    component:InitPageComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
