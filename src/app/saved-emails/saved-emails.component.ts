import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Email } from '../Model/Emails';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-saved-emails',
  templateUrl: './saved-emails.component.html',
  styleUrls: ['./saved-emails.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1500ms', style({ opacity: 1, color: "gray" })),
      ]),
    ]),
  ],
})
export class SavedEmailsComponent implements OnInit {
  savedEmails: Email[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getSavedEmails().map(xx => {
        this.savedEmails.push(xx);
        this.val=false
    });
    if (this.api.getSavedEmails().length===0) {
      this.val=true
    }



  }
  onDelete(email: Email) {
    this.api.deleteEmail(email);
    const index = this.savedEmails.findIndex(e => e.id === email.id);
    if (index !== -1) {
      this.savedEmails.splice(index, 1); // Remove the email from the array
    }
    localStorage.setItem('test', JSON.stringify(this.savedEmails));
    if (this.savedEmails.length === 0) {
      this.val = true;
    }
  }


  val = false
  all(f: boolean) {
    this.api.clearData()
    this.savedEmails.splice(0);
    this.val = f


  }



}
