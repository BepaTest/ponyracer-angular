import { Routes } from '@angular/router';
import { BetComponent } from '../bet/bet.component';
import { LiveComponent } from '../live/live.component';
import { RaceResolver } from '../race.resolver';
import { RacesResolver } from '../races.resolver';
import { FinishedRacesComponent } from './finished-races/finished-races.component';
import { PendingRacesComponent } from './pending-races/pending-races.component';
import { RacesComponent } from './races.component';

export const RACES_ROUTES: Routes = [
  {
    path: '',
    component: RacesComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pending' },
      {
        path: 'pending',
        component: PendingRacesComponent,
        resolve: {
          race: RacesResolver
        }
      },
      {
        path: 'finished',
        component: FinishedRacesComponent,
        resolve: {
          race: RacesResolver
        }
      }
    ]
  },
  { path: ':raceId', component: BetComponent, resolve: { race: RaceResolver } },
  { path: ':raceId/live', component: LiveComponent, resolve: { race: RaceResolver } }
];
