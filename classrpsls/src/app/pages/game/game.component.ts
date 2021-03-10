import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  p1turn: boolean = true;
  p1choice: string = "";
  p2choice: string = "";
  player1pts: number = 0;
  player2pts: number = 0;
  player2: string = "default to CPU"
  numPlayers: number = 0;

  constructor(private dService: DataService, private router: Router) { }
  ngOnInit(): void {
    // this.valueInMain = this.dService.GetValue();
  }


  //game engine start
  playerChoiceSet(value: string) {
    console.log(value);

    //first player
    if (this.p1turn) {
      this.p1choice = value;
      this.p1turn = false;
    } else {
      //if CPU
      //PULL FROM API
      //else if 2P

      this.p2choice = value;
      console.log([this.p1choice, this.p2choice])

      // method/function to compare
      this.compareRound(this.p1choice, this.p2choice)
    }
    
  }

  compareRound(p1: string, p2:string){
    if (p1 === p2) {
      // resultPane.classList.remove("d-none");
      // roundWinner.innerHTML = `Wah wah wahhhh...you both chose <b>"${p1.toUpperCase()}"</b>. Go again.`;
      console.log('draw')
    } else {
      if (
        (p1 === "rock" && (p2 === "scissors" || p2 === "lizard")) ||
        (p1 === "paper" && (p2 === "rock" || p2 === "spock")) ||
        (p1 === "scissors" && (p2 === "paper" || p2 === "lizard")) ||
        (p1 === "lizard" && (p2 === "paper" || p2 === "spock")) ||
        (p1 === "spock" && (p2 === "rock" || p2 === "scissors"))
      ) {
        console.log("p1wins")
        this.player1pts++;
        // roundWinner.innerHTML = `<b>Player 1</b> wins the round!<br> <b>"${p1.toUpperCase()}"</b> beats <b>"${p2.toUpperCase()}"</b>`;
      } else {
        console.log("p2wins")
        this.player2pts++;
        // roundWinner.innerHTML = `<b>${playerName}</b> wins the round!<br> <b>"${p2.toUpperCase()}"</b> beats <b>"${p1.toUpperCase()}"</b>`;
      }
      // numRounds--;
      // return numRounds;
    }
    // p1Points.innerText = player1pts;
    // p2Points.innerText = player2pts;
    // checkRoundsLeft(numRounds, player1pts, player2pts, thresh, playerName);
    this.p1turn = true;
  }
  
  goToResults() {
    this.router.navigate(['results']);
  };
  goToMain() {
    this.router.navigate(['']);
  };

}
