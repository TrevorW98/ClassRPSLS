import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-round-page',
  templateUrl: './round-page.component.html',
  styleUrls: ['./round-page.component.css']
})
export class RoundPageComponent implements OnInit {

  constructor(private router: Router) { 
    
  }
  ngOnInit(): void {
  }
  
  goToGame() {
    this.router.navigate(['game']);
  };
    
  goToMain() {
    this.router.navigate(['']);
  };

}
