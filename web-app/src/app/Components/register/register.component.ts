import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/entities/user';
import { RegisterService } from 'src/app/services/register.service';

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
    DateOfBirth : new FormControl('',[Validators.required]),
    tip : new FormControl('',[Validators.required])
    
  },
  {validators : this.passwordMatch('password1','password2')}
  );
  verified = false;

  constructor(private registrationService : RegisterService, private router : Router,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.registrationForm.touched;
  }


  get f() {
    return this.registrationForm.controls;
  }


  onSubmit()
  {
    
    
     if(this.registrationForm.get('tip')?.value === 'dostavljac')
     {
       this.verified = false;
     }
     else
     {
      this.verified = true;
     }

    let subscriber =this.registrationService.register(new User(this.registrationForm.get('username')?.value,this.registrationForm.get('email')?.value,
    this.registrationForm.get('password2')?.value,
    this.registrationForm.get('tip')?.value,
    this.registrationForm.get('firstName')?.value,
    this.registrationForm.get('lastName')?.value,
    this.registrationForm.get('DateOfBirth')?.value,
    this.registrationForm.get('address')?.value,this.verified
    ));
     console.log( this.registrationForm.get('password2')?.value,
     this.registrationForm.get('tip')?.value,
     this.registrationForm.get('firstName')?.value,
     this.registrationForm.get('lastName')?.value,
     this.registrationForm.get('DateOfBirth')?.value,this.registrationForm.get('username')?.value,this.registrationForm.get('email')?.value,this.verified);
    
    subscriber.subscribe({
      next: (user: any) =>
      {
        const filedata = new FormData();
        
        filedata.append(this.selectedFile.name,this.selectedFile);
        filedata.append("id",this.registrationForm.get('email')?.value);
        this.registrationService.uploadPhoto(filedata).subscribe({next : () => {
          this.router.navigate(['login']);
        
          this.toastr.success('Uspesno ste se registrovali. Ulogujte se','Success');
        }})
  
      


  
      },
  
      error: () =>
      {
                this.toastr.error('Greska pri registraciji','Greska');

      }
      
  
    });


  }


  selectedFile! : File
  onFileSelected(event : any)
  {
    this.selectedFile = event.target.files[0];

  }



  
 private passwordMatch(password: string, confirmPassword: string) {
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
