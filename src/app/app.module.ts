import { PlayersComponent } from './pages/players/players.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KillerComponent } from './pages/killer/killer.component';
import { DartScoringComponent } from './components/dart-scoring/dart-scoring.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    MenuComponent,
    PlayersComponent,
    KillerComponent,
    DartScoringComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
