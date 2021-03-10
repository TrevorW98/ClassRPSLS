import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-round-page',
  templateUrl: './round-page.component.html',
  styleUrls: ['./round-page.component.css']
})
export class RoundPageComponent implements OnInit {

  constructor(private router: Router, private dService: DataService) { 
    
  }
  ngOnInit(): void {
  }
  
  goToGame() {
    this.router.navigate(['game']);
  };
    
  goToMain() {
    this.router.navigate(['']);
  };

  setNumRounds(value: number){
    this.dService.setGameType(value);
    this.goToGame();
  }

}
