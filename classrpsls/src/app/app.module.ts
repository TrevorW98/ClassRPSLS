import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GameComponent } from './pages/game/game.component';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { RoundPageComponent } from './pages/round-page/round-page.component';
import { EndComponent } from './pages/end/end.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    MainPageComponent,
    RoundPageComponent,
    EndComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
