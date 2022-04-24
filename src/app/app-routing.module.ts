import { KillerComponent } from './pages/killer/killer.component';
import { PlayersComponent } from './pages/players/players.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DartScoringComponent } from './components/dart-scoring/dart-scoring.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'players',
    component: PlayersComponent,
  },
  {
    path: 'killer',
    component: KillerComponent,
  },
  {
    path: 'scoring',
    component: DartScoringComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
