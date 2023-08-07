import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Email } from '../Model/Emails';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private api:ApiService,private route:ActivatedRoute,private service:ApiService) {


   }
  liste!:Email
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.getbyid(id)

  }
getbyid(id:number){
  this.service.getbyid(id).subscribe(data=>{
    this.liste=data
    console.log(data);

  })
}
}
