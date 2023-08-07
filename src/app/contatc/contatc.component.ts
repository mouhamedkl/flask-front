import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contatc',
  templateUrl: './contatc.component.html',
  styleUrls: ['./contatc.component.css']
})
export class ContatcComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {

  }

}
