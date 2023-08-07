import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'flask-front';
  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public api: ApiService){}
    hideNavbar: boolean = false;
  logout(){
    this.api.logout()
  
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideNavbar = ['/login', '/register' ,'/forget'].includes(this.router.url) || this.isNewPasswordRoute();
      }
    });
  }
  isNewPasswordRoute(): boolean {
    return this.router.url.startsWith('/newpassword/');
  }
 
}
