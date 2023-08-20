import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
declare const alertify: any;

@Component({
  selector: 'app-contatc',
  templateUrl: './contatc.component.html',
  styleUrls: ['./contatc.component.css']
})
export class ContatcComponent implements OnInit {

  constructor(private api:ApiService) { }
message=''
email=''
name=""
  ngOnInit(): void {

  }
save(n:any,e:any,m:any){
  console.log(n,e,m);

  this.api.contact(n,e,m).subscribe(data=>{
    console.log("Data", data);
    alertify.set('notifier', 'position', 'top-center');
    alertify.success('send to admin', 1);
  },(error)=>{
    console.log(error);
    alertify.set('notifier', 'position', 'top-center');
    alertify.error('error', 1);

  })
}
}
