import { Component, OnInit } from '@angular/core';
import { Email } from '../Model/Emails';
import { ApiService } from '../services/api.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare const alertify: any;

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

  test:any[]=[]
  constructor(public Api:ApiService,private http:HttpClient) { }

  ngOnInit(): void {
   const storedTest = localStorage.getItem('test');

   if (storedTest) {
     this.test = JSON.parse(storedTest);
   }
   this.loadData(this.currentPage);
  }
  onSave(email: Email) {
    console.log(this.test);
    email.saved=!email.saved
    if (!this.test.some(item => item.id === email.id)) {
      this.Api.saveEmail(email);
      this.test.push(email);

      // Save the updated test array to localStorage
      localStorage.setItem('test', JSON.stringify(this.test));

      alertify.set('notifier', 'position', 'top-center');
      alertify.success('Saved 😍', 1);
    } else {
      alertify.set('notifier', 'position', 'top-center');
      alertify.error('Exists 😋', 1);
    }
  }




data: any[] = [];
  totalSum: number = 0;
  currentPage: number = 1;



  loadData(page: number): void {
    this.Api.getData(page).subscribe((response) => {
      console.log(response);

      this.data = response.data;
      this.totalSum = response.total_sum;
    });
  }
  logout(){
    this.Api.logout()

  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData(this.currentPage);
  }
  filterEmails(domaine: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      'domaine': domaine
    };

    this.http.post('http://127.0.0.1:5001/filter_emails', data, { headers: headers }).subscribe(
      (response:any) => {
        console.log(response);
        this.data=response
      },
      error => {
        console.error(error);
      }
    );
  }
}
