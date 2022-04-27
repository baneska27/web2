import { Injectable } from '@angular/core';
import { User, UserWithoutPass } from '../entities/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from '../entities/user-dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Slika } from '../entities/slika';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient,public jwtHelper: JwtHelperService) { }

  userProfile : BehaviorSubject<User> = new BehaviorSubject<User>(
    {
    
    username: 'invalideUsername',
    email: 'invalideMail@gmail.com',
    password: 'invalidePass',
    type: 'invalidType',
    firstName : 'invalideFirstName',
    secondName : 'invalideLastName',
    dateOfBirth : new Date(),
    address : 'invalideAdresa',
    verified : false,
    })
 
  private _loginUrl = "https://localhost:44332/api/Users/authenticate";
  private _editUrlBase = "https://localhost:44332/api/Users/";
  private _editPass = "https://localhost:44332/api/Users/pass/";
  private _getAllUsers = "https://localhost:44332/GetUsersNoPass";
  private photosUrl = "https://localhost:44332/api/Slikas";

  loginUser(email : string, password : string) {

    let user = new UserDTO(email,password);
    return this.http.post(this._loginUrl,user,{responseType:'text'});
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    
    if(token!=null)
    {
      
      return !this.jwtHelper.isTokenExpired(token);

    }
    return false;
  }

  refreshUser()
  {
    return this.http.get<User>('https://localhost:44332/api/Users/refreshUser');
  }

  switchData(user : User){
    this.userProfile.next(user);
  }

  editUser(user : User)
  {
    
    return this.http.put((this._editUrlBase+user.email),user);
  }

  getAllUsers()
  {
    return this.http.get<User[]>(this._getAllUsers);
  }
  requestVerification(user: UserWithoutPass,to : boolean) {
    user.verified=to;
    return this.http.put((this._editUrlBase+user.email),user);
  }

  changePass(pass: string)
  {
    let userParam = this.userProfile.getValue();
    userParam.password = pass;
    return this.http.put((this._editPass+userParam.email),userParam);
  }

  getPhoto()
  {
    let user = this.userProfile.getValue();
    return this.http.get<Slika>(("https://localhost:44332/api/Slikas/"+user.email))
  }

  changePhoto(formData : FormData)
  {
    
      return this.http.put(this.photosUrl,formData);
  }

  externalLogin(formData : any){
    return this.http.post("https://localhost:44332/api/Users/SocialLogin",formData);
  }
}
