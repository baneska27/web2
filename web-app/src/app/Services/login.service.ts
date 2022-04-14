import { Injectable } from '@angular/core';
import { User, UserWithoutPass } from '../entities/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http : HttpClient) { }


  userProfile : BehaviorSubject<User> = new BehaviorSubject<User>(
    {
    
    username: 'invalideUsername',
    email: 'invalideMail@gmail.com',
    password: 'invalidePass',
    type: 'admin',
    firstName : 'invalideFirstName',
    secondName : 'invalideLastName',
    dateOfBirth : new Date(),
    slika : 'invalideSlika',
    address : 'invalideAdresa',
    verified : false,
    })

 
  private _loginUrl = "https://localhost:44332/api/Users/authenticate";
  private _editUrlBase = "https://localhost:44332/api/Users/";
  private _editPass = "https://localhost:44332/api/Users/pass/";
  private _getAllUsers = "https://localhost:44332/GetUsersNoPass";


  loginUser(email : string, password : string) {

    let user = new User('username',email,password,'administrator','ime1','prezime1',new Date(2020,5,4),'slika','adresa',false);


    return this.http.post(this._loginUrl,user,{withCredentials:true});
    
    

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
}
