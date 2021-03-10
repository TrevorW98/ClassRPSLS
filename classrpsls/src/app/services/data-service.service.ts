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

  constructor(private http: HttpClient) { }

  GetAPIChoice() {
    return this.http.get(this.url, { responseType: "text" }).subscribe({next: response => response})

    //.get is the ngew .fetch
    //.subscribe is the ngew .then

    // return this.http.get(this.url).subscribe()
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

}
