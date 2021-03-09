import { Component } from '@angular/core';
import { DataService } from './services/data-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dService: DataService){

  }

  title = 'classrpsls';

  test(){
    this.dService.GetAPIChoice();
    // console.log("test")
    // console.log(this.dService.GetAPIChoice())
  }
}
