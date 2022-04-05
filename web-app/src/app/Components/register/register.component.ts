import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm = new FormGroup({

    email : new FormControl('',[Validators.required,Validators.email]),
    username : new FormControl('',[Validators.required,Validators.minLength(6)]),
    password1 : new FormControl('',[Validators.required]),
    password2 : new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    lastName :new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
  },
  {validators : this.passwordMatch('password1','password2')}
  );

  constructor() { }

  ngOnInit(): void {
    this.registrationForm.touched;
  }


  get f() {
    return this.registrationForm.controls;
  }


  onSubmit()
  {
    
  }

  
  passwordMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }


}
