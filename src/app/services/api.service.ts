import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../Model/Users';
import { NgForm } from '@angular/forms';
import { Email } from '../Model/Emails';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isLoggedIn="false"
  private readonly TOKEN_KEY = 'access_token';

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  saveToken1(name:string,token: string): void {
    localStorage.setItem(name, token);
  }
  getToken1(name:string): string | null {
    return localStorage.getItem(name);
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
    return this.http.get("http://127.0.0.1:5001/all");
  }
  getbyid(id:number):Observable<any>{
    return this.http.get("http://127.0.0.1:5001/email/"+id);
  }
  addUser(user:NgForm):Observable<User>{
    return this.http.post<User>("http://127.0.0.1:5000/users/add",user);
  }
  getuserbyid(id:number):Observable<User>{
    const accessToken=this.getToken()

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken });

    return this.http.get<User>("http://127.0.0.1:5000/users/"+id,{headers});
  }
  deleteUser(id: number): Observable<User> {
    const accessToken = this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken });

    return this.http.delete<User>("http://127.0.0.1:5000/users/" + id, { headers }).pipe(
        tap(() => {
            this.logout(); // This line will be executed after the user is deleted
        })
    );
}
updateUser(email:NgForm,id:number): Observable<User> {
  const accessToken = this.getToken();
  const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken });

  return this.http.put<User>("http://127.0.0.1:5000/users/" + id, email,{ headers })

}
changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
  const data = {
    current_password: currentPassword,
    new_password: newPassword
  };

  return this.http.put<any>(`http://127.0.0.1:5000/change_password/${userId}`, data);
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
  contact(name:any,email:any,message:any):Observable<any>{
    const payload = { name: name,email:email,message:message };
    return this.http.post<any>(`http://127.0.0.1:5000/api/contact`,payload);
  }
  apply(f:FormData):Observable<any>{
    return this.http.post<any>('http://127.0.0.1:5001/send_email', f);
  }
  private storageKey = 'savedEmails';

  saveEmail(email: Email) {
    const savedEmails = this.getSavedEmails();
    savedEmails.push(email);
    localStorage.setItem(this.storageKey, JSON.stringify(savedEmails));
  }

  getSavedEmails(): Email[] {
    const savedEmailsStr = localStorage.getItem(this.storageKey);
    return savedEmailsStr ? JSON.parse(savedEmailsStr) : [];
  }
  deleteEmail(email: Email) {
    const savedEmails = this.getSavedEmails().filter(e => e.id !== email.id);
    this.updateLocalStorage(savedEmails);
  }
  getData(page: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:5001/data?page=${page}`);
  }

  private updateLocalStorage(emails: Email[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(emails));
  }
   clearData() {
    localStorage.clear();
  }
  filterEmails(domaine: any): Observable<any> {
    return this.http.post<any>("http://127.0.0.1:5001/filter_emails",domaine);
  }
  getconfirmation():Observable<any>{
    const email=this.getToken1("email-confirm")
    return  this.http.get<any>(`http://127.0.0.1:5000/confirm/${email}`);
  }


}
