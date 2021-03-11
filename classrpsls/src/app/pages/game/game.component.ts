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
  winCondition: number = 0;
  roundCount: number = 0;
  maxRounds: number = 0;
  currentRound = 1;
  roundWinner = "";

  disableBtns: boolean = false

  constructor(private dService: DataService, private router: Router) { }

  ngOnInit(): void {
    // this.valueInMain = this.dService.GetValue();
    this.numPlayers = this.dService.getGameType()[0];
    this.roundCount = this.dService.getGameType()[1];
    this.winCondition = this.dService.getGameType()[2];
    this.maxRounds = this.roundCount;
    console.log(this.dService.getGameType());
  }

  //game engine start
  playerChoiceSet(value: string) {
    console.log(value);

    //first player
    if (this.p1turn) {
      this.p1choice = value;
      this.p1turn = false;
      if (this.numPlayers === 1) {
        this.p2choice = this.dService.GetAPIChoice().toString();
        this.compareRound(this.p1choice, this.p2choice)
        console.log([this.p1choice, this.p2choice])


      }
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

  compareRound(p1: string, p2: string) {
    this.disableBtns = true;
    if (p1 === p2) {

      console.log('draw')
      this.roundWinner = "No one";
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

        this.roundWinner = "P1";
      } else {
        console.log("p2wins")
        this.player2pts++;

        this.roundWinner = "P2/CPU";
      }

    }

    this.p1turn = true;
    this.roundCount--;
    this.currentRound++;

    if (this.roundCount === 0 || this.player1pts === this.winCondition || this.player2pts === this.winCondition) {
      //go to end screen
      this.goToResults();
    }

    // reset
    this.p1choice = "";
    this.p2choice = "";
    //call a method to check win conditions/rounds

  }

  nextRound() {
    this.roundWinner = "";
    this.disableBtns = false;

  }

  // checkRoundsLeft(){
  //   //if winCondition met

  //   //if numRounds left = 0
  // }

  goToResults() {
    this.router.navigate(['results']);
  };
  goToMain() {
    this.router.navigate(['']);
  };

}
