import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/entities/user';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private loginService : LoginService, private toastr : ToastrService,private router : Router) { }

  ngOnInit(): void {
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(){
    let subscriber = this.loginService.loginUser(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value);

    subscriber.subscribe({
      next: (user: any) =>
      {
        this.loginService.switchData(user);
        localStorage.setItem('ime',user.firstName);
        
        this.router.navigate(['home/profile']);
        
        this.toastr.success('Uspesno ste se ulogovali','Success');


  
      },
  
      error: () =>
      {
                this.toastr.error('Email/Password netacni','Greska');

      }
      
  
    });

  }

}
