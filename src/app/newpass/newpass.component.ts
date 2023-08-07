import { Component, OnInit } from '@angular/core';
import { User } from '../Model/Users';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css']
})
export class NewpassComponent implements OnInit {
  user= new User()
  password=""
  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }
send(user:NgForm){

  this.api.reset(user.value).subscribe(data=>{
    console.log("done")
  })
}
}
