import { Component, OnInit } from '@angular/core';
import { User } from '../Model/Users';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare const alertify: any;

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css']
})
export class NewpassComponent implements OnInit {
  user= new User()
  password=""
  constructor(private api: ApiService,private router:Router) { }

  ngOnInit(): void {

  }
send(form:NgForm){
  if (form.valid) {
    this.api.reset(form.value).subscribe(
      (response: any) => {

        alertify.set('notifier', 'position', 'top-center');
        alertify.success(' Update successfully ',1);
        this.router.navigate(['/home']); // Replace '/dashboard' with the correct route you want to navigate to after login

      },
      (error) => {
        // Handle the API error, if needed
        console.error(error);
        alertify.set('notifier', 'position', 'top-center');
        alertify.error("Token invalid");
      }
    );
  } else {
    alertify.error("Error");
  }

}
}
