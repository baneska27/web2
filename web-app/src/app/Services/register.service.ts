import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  private registrationUrl = "https://localhost:44332/api/Users";
  private photosUrl = "https://localhost:44332/api/Slikas";
  register(user : User)
  {
    return this.http.post(this.registrationUrl,user);
  }
  uploadPhoto(formData : FormData)
  {
    
    return this.http.post(this.photosUrl,formData);
  }

  
  
}
