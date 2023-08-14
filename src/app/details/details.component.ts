import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Email } from '../Model/Emails';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
declare const alertify: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private api:ApiService,private http: HttpClient, private route:ActivatedRoute,private service:ApiService) {

   }
  get_email!:Email
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.getbyid(id)

  }
getbyid(id:number){
  this.service.getbyid(id).subscribe(data=>{
    this.get_email=data
    console.log(data);

  })
}
value= false
openModal(f:boolean) {
this.value=f
}
email: string = '';
  message: string = '';
  subject: string=''
  attachment: File | null = null;


  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.get_email.sender);
    formData.append('subject', this.subject);
    formData.append('message', this.message);
    if (this.attachment) {
      formData.append('attachment', this.attachment, this.attachment.name);
    }

    this.api.apply(formData).subscribe(
      response => {
        alertify.set('notifier', 'position', 'top-center');
        alertify.success('Your email Sending', 1);
      },
      (error) => {
        alertify.set('notifier', 'position', 'top-center');
        alertify.error(' error to send', 1);
      }
    );

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.attachment = input.files[0];
    }
  }
}
