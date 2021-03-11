import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  opponent = 'CPU';
  player1Score = 0;
  player2Score = 0;
  winner = 'Player 1';
  rounds = 1;

  constructor(private router: Router, private dService: DataService) { 
    
  }
  ngOnInit(): void {
    this.opponent = this.dService.getGameType()[0] === 1 ? 'CPU' : 'Player 2';
    this.player1Score = this.dService.getPlayerScore(1);
    this.player2Score = this.dService.getPlayerScore(2);
    this.winner = this.player1Score === this.player2Score ? 'Tie!'
    : this.player1Score > this.player2Score ? 'Player 1 Wins!' : `${this.opponent} Wins!`;
    this.rounds = this.dService.getGameType()[1];
  }
  
  
  goToMain() {
    this.router.navigate(['']);
  };
  
  goToRounds(){
    this.router.navigate(['rounds']);
  }

}
