import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromNowPipe } from '../from-now.pipe';
import { LiveComponent } from '../live/live.component';
import { BetComponent } from '../bet/bet.component';
import { PonyComponent } from '../pony/pony.component';
import { FinishedRacesComponent } from './finished-races/finished-races.component';
import { PendingRacesComponent } from './pending-races/pending-races.component';
import { RaceComponent } from '../race/race.component';
import { RacesComponent } from './races.component';
import { RACES_ROUTES } from './races.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RacesComponent,
    RaceComponent,
    PendingRacesComponent,
    FinishedRacesComponent,
    PonyComponent,
    BetComponent,
    LiveComponent,
    FromNowPipe
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(RACES_ROUTES)]
})
export class RacesModule {}
