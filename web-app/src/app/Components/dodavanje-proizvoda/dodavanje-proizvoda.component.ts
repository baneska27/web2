import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {FormArray, FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { Proizvod } from 'src/app/entities/proizvod';
import { Sastojak } from 'src/app/entities/sastojak';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dodavanje-proizvoda',
  templateUrl: './dodavanje-proizvoda.component.html',
  styleUrls: ['./dodavanje-proizvoda.component.css']
})
export class DodavanjeProizvodaComponent implements OnInit {

  form!: FormGroup;
  constructor(private proizvodService : ProizvodService,private toastr : ToastrService,private fb: FormBuilder) {
    
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      ime: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      cena: ['', [Validators.required]],
      sastojaks: this.fb.array([]),
    });
  }

  get rolesFieldAsFormArray(): any {
    return this.form.get('sastojaks') as FormArray;
  }

  sastojaks(): any {
    return this.fb.group({
      nazivSastojka: this.fb.control('',Validators.required),
    });
  }

    
  addControl(): void {
    this.rolesFieldAsFormArray.push(this.sastojaks());
  }

  remove(i: number): void {
    this.rolesFieldAsFormArray.removeAt(i);
  }

  formValue(): void {
    console.log(this.form.value);
  }



  onSubmit()
  {
    let sastojakss: Sastojak[] = this.form.get('sastojaks')?.value;
    console.log(this.rolesFieldAsFormArray.length);
    let subscriber = this.proizvodService.postProizvod(new Proizvod(this.form.get('ime')?.value,this.form.get('cena')?.value,0,sastojakss));
  subscriber.subscribe({
    next: () =>
    {
     
      this.toastr.success('Uspesno ste se ulogovali','Success');


    },

    error: () =>
    {
              this.toastr.error('Email/Password netacni','Greska');

    }
    

  });
  }
}
