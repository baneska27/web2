import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitPageComponent } from './Components/init-page/init-page.component';
import { RegisterComponent } from './Components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { VerifikacijaComponent } from './Components/verifikacija/verifikacija.component';
import { DodavanjeProizvodaComponent } from './Components/dodavanje-proizvoda/dodavanje-proizvoda.component';
import { NovaPorudzbinaComponent } from './Components/nova-porudzbina/nova-porudzbina.component';
import { PorudzbinaDaljeComponent } from './Components/porudzbina-dalje/porudzbina-dalje.component';
import { TrenutnaPorudzbinaComponent } from './Components/trenutna-porudzbina/trenutna-porudzbina.component';
import { SvePorudzbineComponent } from './Components/sve-porudzbine/sve-porudzbine.component';
import { MyBootstrapModalComponent } from './Components/modals/my-bootstrap-modal/my-bootstrap-modal.component';
import { NovePorudzbineComponent } from './Components/nove-porudzbine/nove-porudzbine.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { DostavaComponent } from './Components/dostava/dostava.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InitPageComponent,
    RegisterComponent,
    HomepageComponent,
    ProfileComponent,
    VerifikacijaComponent,
    DodavanjeProizvodaComponent,
    NovaPorudzbinaComponent,
    PorudzbinaDaljeComponent,
    TrenutnaPorudzbinaComponent,
    SvePorudzbineComponent,
    MyBootstrapModalComponent,
    NovePorudzbineComponent,
    DostavaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
       tokenGetter: tokenGetter,
      allowedDomains: ["localhost:4200","localhost:44332"]
      },
    }),
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
