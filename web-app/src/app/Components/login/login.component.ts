import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/entities/user';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {SocialAuthService} from 'angularx-social-login'
import { GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  loginForm = new FormGroup({

    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required])
  })

  constructor(private loginService : LoginService, private toastr : ToastrService,private router : Router,private authService : SocialAuthService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.loginForm.controls;
  }

  LoginWithGoogle(){

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (socialusers) => {  
      
      
      let user = new User(socialusers.email,socialusers.email,'',"potrosac",socialusers.firstName,socialusers.lastName,new Date(1999,1,1),"Not Available",true);
      
      console.log(socialusers);

      this.loginService.externalLogin(socialusers).subscribe((res:any)=>{
        localStorage.setItem('token', res.token);
        //this.loginService.refreshUser();
        this.loginService.switchData(user);
        this.router.navigateByUrl('/home/profile');
      });
   
      console.log(socialusers);  
    });  

  }

  onSubmit(){
    let subscriber = this.loginService.loginUser(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value);
    console.log(subscriber);
    subscriber.subscribe({
      next: (token : string) =>
      {
        //this.loginService.switchData(user);
        //console.log(token);
        localStorage.setItem('token',token);

        this.loginService.refreshUser().subscribe({next : (user:User) =>{
          this.loginService.switchData(user);
        }})
        
        this.router.navigate(['']);
        
        this.toastr.success('Uspesno ste se ulogovali','Success');

      },
  
      error: (data : HttpErrorResponse) =>
      {
              
                this.toastr.error(data.error,'Greska');

      }
      
  
    });

  }

}
