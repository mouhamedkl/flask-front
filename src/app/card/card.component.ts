import { Component, OnInit } from '@angular/core';
import { Email } from '../Model/Emails';
import { ApiService } from '../services/api.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms', style({ opacity: 1, color:"gray"})),
      ]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  liste:Email[]=[]
  constructor(private Api:ApiService) { }

  ngOnInit(): void {
   this.reload()

  }
reload(){

  this.Api.getdata().subscribe(data=>{
    console.log(data);
    this.liste=data
   })

}
filteredList = this.liste; // Initialize filteredList with all items on component initialization

filterByDomaine(domaine: string) {
  this.filteredList = this.liste.filter((item) =>
    item.domaine.toLowerCase().includes(domaine.toLowerCase())
  );
}

filterByOffre(offre: string) {
  this.filteredList = this.liste.filter((item) =>
    item.subject.toLowerCase().includes(offre.toLowerCase())
  );
}

filterBySkills(skills: string) {
  this.filteredList = this.liste.filter((item) =>
    item.body.toLowerCase().includes(skills.toLowerCase())
  );
}
// Inside your component class
toggleSave(internship: any) {
  internship.saved = !internship.saved;
}

}
