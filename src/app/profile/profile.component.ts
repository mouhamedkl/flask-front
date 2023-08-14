import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from '../Model/Users';
declare const alertify: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router,private api:ApiService) { }
 user:any
 updateuser=new User()
 
  ngOnInit(): void {
    console.log(this.api.getToken())
    const id=localStorage.getItem("id")
    console.log(id);
    
    const accessToken=this.api.getToken()
    console.log(accessToken);
    this.api.getuserbyid(Number(id)).subscribe(data=>{
      this.user=data
      console.log(data)
    })
  }
  
  val=false
  sup=false
  home=true
      
edit(){
this.val=true
this.sup=false
this.home=false

}
delete(){
this.sup=true
this.val=false
this.home=false
}
supprimer(){
  const id=localStorage.getItem("id")
  this.api.deleteUser(Number(id)).subscribe(data=>{
    alertify.set('notifier', 'position', 'top-center');
    alertify.success(' delete successfully ',1);
    this.router.navigate(['/home'])
  },(error)=>{
    alertify.set('notifier', 'position', 'top-center');
    alertify.error(' error ',1);
  })
}
currentPassword = '';
password='';
  newPassword = '';
  message=""
onChangePassword() {
  const id=localStorage.getItem("id")
  if (!this.currentPassword || !this.newPassword) {
    this.message = 'Please fill in both the current and new passwords.';
  } else if (this.currentPassword === this.newPassword) {
    this.message = 'New password should be different from the current password.';
  } else if ( this.newPassword.length < 8) {
    this.message = 'Passwords must be at least 8 characters long.';
  } else{ this.api.changePassword(Number(id), this.currentPassword, this.newPassword)
    .subscribe(
      response => {
        alertify.set('notifier', 'position', 'top-center');
        alertify.success(response.message,1);
        this.message=''
        this.api.logout()
        this.router.navigate(['/login'])
        console.log(response.message);
       
      },
      error => {
        alertify.set('notifier', 'position', 'top-center');
        alertify.error('error ',1);
        console.log(error);
        
      }
    );}
 
}
// onChangePassword() {
//   const id=localStorage.getItem("id")
//   if (!this.currentPassword || !this.newPassword) {
//     this.message = 'Please fill in both the current and new passwords.';
//   } else if (this.currentPassword === this.newPassword) {
//     this.message = 'New password should be different from the current password.';
//   } else if ( this.newPassword.length < 8) {
//     this.message = 'Passwords must be at least 8 characters long.';
//   } else {
//     this.api.changePassword(Number(id), this.currentPassword, this.newPassword)
//       .subscribe(
//         response => {
//           alertify.set('notifier', 'position', 'top-center');
//           alertify.error('error check form',1);
//         },
//         error => {
//  alertify.set('notifier', 'position', 'top-center');
//     alertify.error('error check form',1);        }
//       );
//   }
// }
update(ng:NgForm){
 if(ng.valid){
  const id=localStorage.getItem("id")
  console.log(ng.value);
  
   this.api.updateUser(ng.value,Number(id)).subscribe(data=>{
    alertify.set('notifier', 'position', 'top-center');
    alertify.success(' update successfully ',1);
    console.log(data);
    
   },(error)=>{
    alertify.set('notifier', 'position', 'top-center');
    alertify.error('error check form',1);
   })
 }else{
  alertify.set('notifier', 'position', 'top-center');
  alertify.error('error check form',1);
 }

}
close(f:boolean){
  this.val=f
  this.home=true
}
closesup(f:boolean){
  this.sup=f
  this.home=true

}
}
