import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  private url: string = "https://csa2020studentapi.azurewebsites.net/rpsls"
  private numPlayers: number = 0;
  private winCondition: number = 0;

  constructor(private http: HttpClient) { }

  GetAPIChoice() {
    this.http.get(this.url, {responseType: "text"}).subscribe(response => console.log(response))

    //.get is the ngew .fetch
    //.subscribe is the ngew .then

    // return this.http.get(this.url).subscribe()
  }
}
