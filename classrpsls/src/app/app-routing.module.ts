import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RoundPageComponent } from './pages/round-page/round-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
