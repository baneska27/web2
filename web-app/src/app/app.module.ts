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
import { DodavanjeProizvodaComponent } from './components/dodavanje-proizvoda/dodavanje-proizvoda.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InitPageComponent,
    RegisterComponent,
    HomepageComponent,
    ProfileComponent,
    VerifikacijaComponent,
    DodavanjeProizvodaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
