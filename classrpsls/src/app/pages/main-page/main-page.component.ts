import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router, private dService: DataService) { 
    
  }
  ngOnInit(): void {
    this.dService.reset();
  }
  
  goToRounds() {
    this.router.navigate(['rounds']);
  };

  setNumPlayers(value: number){
    this.dService.setGameType(value);
    this.goToRounds();
  }

}
