import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../Model/Users';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare const alertify: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User()
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }
  login(form: NgForm) {
    if (form.valid) {
      this.api.login(form.value).subscribe(
        (response: any) => {
          console.log(response);
          localStorage.setItem("accessToken", response.token);
          localStorage.setItem("id", response.id);
          this.api.saveToken(response.token)
          this.api.setIsLoggedIn(true)
          alertify.set('notifier', 'position', 'top-center');
          alertify.success(' Login successfully ',1);
          this.router.navigate(['/offre']); // Replace '/dashboard' with the correct route you want to navigate to after login

        },
        (error) => {
          // Handle the API error, if needed
          console.error(error);
          alertify.set('notifier', 'position', 'top-center');
          alertify.error("User with this email already exists");
        }
      );
    } else {
      alertify.error("Error");
    }
  }
}
