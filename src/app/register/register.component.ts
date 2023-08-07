import { Component, OnInit } from '@angular/core';
import { User } from '../Model/Users';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare const alertify: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private api:ApiService,private router:Router) { }
  user=new User()
  ngOnInit(): void {
  }

  register(ng: NgForm) {
    const f = ng.value;
    console.log(f);
    if (ng.valid) {
      this.api.addUser(f).subscribe(
        (response: any) => {
          console.log("Response", response);
          alertify.set('notifier', 'position', 'top-center');
          alertify.success(' Login successfully ',1);
          setInterval(()=>{
            this.router.navigate(['/login'])
          },2000)

        },
        (error) => {
          // Handle the API error, if needed
          console.error(error);
          alertify.error("User with this email already exists");
        }
      );
    } else {
      alertify.error('Error');
    }
  }
}
