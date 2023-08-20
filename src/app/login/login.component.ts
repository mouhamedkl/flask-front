import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit , AfterViewInit {
  ngAfterViewInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container=document.getElementById('container');
    signUpButton?.addEventListener('click', () => {
      container?.classList.add('right-panel-active');
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove('right-panel-active');
    });
  }
  user = new User()
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }
  login(form: NgForm) {
    if (form.valid) {
      this.api.login(form.value).subscribe(
        (response: any) => {
          console.log(response.confirm);

         if (response.confirm===1) {
          console.log(response);
          localStorage.setItem("accessToken", response.token);
          localStorage.setItem("id", response.id);
          this.api.saveToken(response.token)
          this.api.setIsLoggedIn(true)
          alertify.set('notifier', 'position', 'top-center');
          alertify.success(' Login successfully ',1);
          this.router.navigate(['/offre']); // Replace '/dashboard' with the correct route you want to navigate to after login
         } else {
          alertify.set('notifier', 'position', 'top-center');
          alertify.error('confirm ypur mail',1);
         }

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
  register(ng: NgForm) {
    const f = ng.value;
    console.log(f);
    if (ng.valid) {
      this.api.addUser(f).subscribe(
        (response: any) => {
          this.api.saveToken1("email-confirm",response.user[2] )
          this.router.navigate(['/confirm', response.user[2]]);
          this.api.saveToken1("confirm",response.user[6])
          console.log("Response", response);

          alertify.set('notifier', 'position', 'top-center');
          alertify.success(' Resigter successfully ',1);
          this.router.navigate(['/login'])
        },
        (error) => {
          // Handle the API error, if needed
          console.error(error);
          alertify.set('notifier', 'position', 'top-center');
          alertify.error("User with this email already exists");
        }
      );
    } else {
      alertify.error('Error');
    }
  }
}
