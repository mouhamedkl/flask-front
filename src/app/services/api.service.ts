import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../Model/Users';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoggedIn="false"
  private readonly TOKEN_KEY = 'access_token';

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  logout() {
    this.removeToken();
    this.setIsLoggedIn(false);
  }
  token = this.getToken()
  constructor(private http:HttpClient) { }
  getdata():Observable<any>{
    return this.http.get("http://127.0.0.1:5000/all");
  }
  getbyid(id:number):Observable<any>{
    return this.http.get("http://127.0.0.1:5000/email/"+id);
  }
  addUser(user:NgForm):Observable<User>{
    return this.http.post<User>("http://127.0.0.1:5000/users",user);
  }
  login(user:NgForm):Observable<User>{
    const accessToken=localStorage.getItem("accessToken")
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken });
    return this.http.post<User>("http://127.0.0.1:5000/login",user,{headers})
     
    
  }
  setIsLoggedIn(isLoggedIn: boolean) {
    sessionStorage.setItem(this.isLoggedIn, isLoggedIn.toString());

  }

  getIsLoggedIn(): boolean {
    const isLoggedInString = sessionStorage.getItem(this.isLoggedIn);
    return isLoggedInString ? JSON.parse(isLoggedInString) : false;
  }

  
  forgot_password(email:any):Observable<User>{
    const payload = { email: email.email };
    return this.http.post<User>("http://127.0.0.1:5000/forgot_password",payload);
  }
  reset(email:any):Observable<User>{
    const payload = { password: email.password };

    return this.http.post<User>(`http://127.0.0.1:5000/newpassword/${this.token}`,payload);
  }
}
