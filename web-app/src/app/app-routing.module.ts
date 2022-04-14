import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { InitPageComponent } from './Components/init-page/init-page.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { VerifikacijaComponent } from './Components/verifikacija/verifikacija.component';

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
  },
  
  {
    path:'home/profile',
    component:ProfileComponent
  },
  {
    path:'home/verifikacija',
    component:VerifikacijaComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
