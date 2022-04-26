
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';



import { User } from 'src/app/entities/user';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';
import { Slika } from 'src/app/entities/slika';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo?: User;
  constructor(private _sanitizer: DomSanitizer,private router : Router,private toastr : ToastrService, private fb : FormBuilder, private cdRef:ChangeDetectorRef, private loginService : LoginService, private registerService : RegisterService) { }
  option ="settings";
  ngOnInit(): void {

    
   this.loadUser();
   
   
  }

slika : Slika = new Slika("54","aa");

  registrationForm = new FormGroup({
    
    email : new FormControl('',[Validators.required,Validators.email]),
    username : new FormControl('',[Validators.required,Validators.minLength(6)]),
    
    firstName: new FormControl('',[Validators.required]),
    lastName :new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
    dateOfBirth : new FormControl('',[Validators.required]),
   
    
  });
  
  passwordForm = new FormGroup({
    
    password1 : new FormControl('',[Validators.required]),
    password2 : new FormControl('',[Validators.required]),

  },
  {validators :this.passwordMatch('password1','password2')}
  );



 
  changeView(a : boolean)
  {
    if(a==true)
    {
      this.option="settings";
     
    }
    else{
      this.option="changePass";
      
    }
  }
  loadUser()
  {
    this.loginService.userProfile.subscribe((data) =>
    {
     
    this.userInfo = data;
   
    this.cdRef.detectChanges(); //pitanje za konsultacije
    this.loginService.getPhoto().subscribe(data => this.slika = data) 
    console.log(this.slika);
    this.registrationForm.patchValue({
      firstName : data.firstName,
      lastName : data.secondName,
      username : data.username,
      address : data.address,
      email : data.email,
    
       dateOfBirth : data.dateOfBirth.toString().split('T')[0]
      //dateOfBirth : data.dateOfBirth.toISOString().split('T')[0]
      

    }); 
    console.log(this.userInfo.dateOfBirth)
   })
  }

  selectedFile! : File;
  promeniSliku(event : any)
  {
    console.log("usao sam!");
    this.selectedFile = event.target.files[0];
    const filedata = new FormData();
        
    filedata.append(this.selectedFile.name,this.selectedFile);
    this.loginService.changePhoto(filedata).subscribe(data => window.location.reload())

  }

  changePass(){
    let subscriber = this.loginService.changePass(this.passwordForm.get('password2')?.value);

    subscriber.subscribe({
      next: (user: any) =>
      {
  
        localStorage.setItem('ime',user.firstName);
        this.loginService.userProfile.next(user);
        
        this.toastr.success('Uspesno ste promenili password.','Success');


  
      },
  
      error: () =>
      {
                this.toastr.error('Greska pri promeni podataka','Greska');

      }
      
  
    });
  }

  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(['login']);
    window.location.reload();
  }

  

  updateProfileInfo(){
    let subscriber =this.loginService.editUser(new User(this.registrationForm.get('username')?.value,this.registrationForm.get('email')?.value,
    this.userInfo?.password || 'invalid',
    this.userInfo?.type || 'invalid',
    this.registrationForm.get('firstName')?.value,
    this.registrationForm.get('lastName')?.value,
    this.registrationForm.get('dateOfBirth')?.value,
    
    this.registrationForm.get('address')?.value,this.userInfo?.verified || false
    ));
    
   
  
    subscriber.subscribe({
      next: (user: any) =>
      {
  
        this.loginService.userProfile.next(user);
        
        this.toastr.success('Uspesno ste promenili podatke.','Success');


  
      },
  
      error: () =>
      {
                this.toastr.error('Greska pri promeni podataka','Greska');

      }
      
  
    });

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


  get f() {
    return this.registrationForm?.controls;
  }
  get f1() {
    return this.passwordForm?.controls;
  }




}
