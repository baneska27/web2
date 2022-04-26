import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DodavanjeProizvodaComponent } from './Components/dodavanje-proizvoda/dodavanje-proizvoda.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { InitPageComponent } from './Components/init-page/init-page.component';
import { LoginComponent } from './Components/login/login.component';
import { MojeComponent } from './Components/moje/moje.component';
import { NovaPorudzbinaComponent } from './Components/nova-porudzbina/nova-porudzbina.component';
import { NovePorudzbineComponent } from './Components/nove-porudzbine/nove-porudzbine.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { SvePorudzbineComponent } from './Components/sve-porudzbine/sve-porudzbine.component';
import { TrenutnaPorudzbinaComponent } from './Components/trenutna-porudzbina/trenutna-porudzbina.component';
import { VerifikacijaComponent } from './Components/verifikacija/verifikacija.component';
import { AuthGuardService } from './services/auth-guard.service';

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
    component:ProfileComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'home/verifikacija',
    component:VerifikacijaComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'home/dodajProizvod',
    component:DodavanjeProizvodaComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'home/novaPorudzbina',
    component:NovaPorudzbinaComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'home/trenutnaPorudzbina',
    component : TrenutnaPorudzbinaComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'home/svePorudzbine',
    component:SvePorudzbineComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'home/novePorudzbine',
    component : NovePorudzbineComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'home/mojePorudzbine',
    component:MojeComponent,
    canActivate:[AuthGuardService]
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
