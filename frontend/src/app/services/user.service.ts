import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { UserRegister } from '../shared/interfaces/UserRegister';
import { USER_REGISTER_URL } from '../shared/constants/urls';

const USER_KEY = "User"
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocaleStorage())
  public userObservable:Observable<User>
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable()
  }

  public get currentUser():User{
    return this.userSubject.value
  }

  login(userLogin:UserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user)=>{
          this.setUserToLocaleStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to Zalada ${user.name}!`,
            "Login succesful"
          )
        },
        error: (errosResponse)=>{
          this.toastrService.error(errosResponse.error, "Login Failed")
        }
      })
    )
  }

  register(userRegister:UserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocaleStorage(user)
          this.userSubject.next(user)
          this.toastrService.success(
            `welcome to the ZALADA ${user.name}`,
            "Register Succesful"
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, "Register Failed")
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User())
    localStorage.removeItem(USER_KEY)
    window.location.reload()
  }

  private setUserToLocaleStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocaleStorage():User{
    const userJson = localStorage.getItem(USER_KEY)
    if (userJson) return JSON.parse(userJson) as User
    return new User()
  }
}
