import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../Model/Users';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare const alertify: any
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  user = new User()
  constructor(private api: ApiService, private router: Router) { }
  mail!: any
  ngOnInit(): void {

  }
  send(form: NgForm) {
    const payload = { email: this.user.email };
    if (form.valid) {
      this.api.forgot_password(form.value).subscribe(
        (response: any) => {
          const token = response
          this.api.saveToken(token)
          console.log(this.api.getToken());
          this.router.navigate(['/reset-password', token]);
          console.log(response.token);
          alertify.set('notifier', 'position', 'top-center');
          alertify.success(' Check your email', 1);
          this.router.navigate(['/home']);
        },
        (error) => {
          // Handle the API error, if needed
          console.error(error);
          alertify.set('notifier', 'position', 'top-center');
          alertify.error("User with this email not exists");
        }
      );
    } else {
      alertify.set('notifier', 'position', 'top-center');
      alertify.error("Error");
    }




  }
}
