import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndComponent } from './pages/end/end.component';
import { GameComponent } from './pages/game/game.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RoundPageComponent } from './pages/round-page/round-page.component';

const routes: Routes = [
  { path: 'results', component: EndComponent },
  { path: 'rounds', component: RoundPageComponent },
  { path: 'game', component: GameComponent },
  { path: '', component: MainPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
