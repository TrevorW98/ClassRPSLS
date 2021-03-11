import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private url: string = "https://csa2020studentapi.azurewebsites.net/rpsls"
  private numPlayers: number = 0;
  private roundCount: number = 1;
  private winCondition: number = 0;
  private p1FinalScore = 0;
  private p2FinalScore = 0;
  private cpuResponse = '';

  constructor(private http: HttpClient) { }

  GetAPIChoice() {
   return this.cpuResponse;
  }

  SetAPIChoice() {

    this.http.get(this.url, { responseType: "text" })
    .subscribe(response => { this.cpuResponse = response});

  }

  getGameType() {
    return [this.numPlayers, this.roundCount, this.winCondition]
  }

  setGameType(num: number) {
    !this.numPlayers ? this.numPlayers = num : this.roundCount = num;
    this.winCondition = num === 1 ? 1 : num === 5 ? 3 : 4;
  }

  reset() {
    this.numPlayers = 0;
    this.roundCount = 1;
    this.winCondition = 0;
  }

  setFinalScore(p1Score: number, p2Score: number) {
    this.p1FinalScore = p1Score;
    this.p2FinalScore = p2Score;
  }

  getPlayerScore(player: number){
    return player === 1 ? this.p1FinalScore : this.p2FinalScore;
  }



}
