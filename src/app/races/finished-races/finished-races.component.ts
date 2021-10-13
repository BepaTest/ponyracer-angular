import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from 'src/app/models/race.model';

@Component({
  selector: 'pr-finished-races',
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinishedRacesComponent {
  races: Array<RaceModel>;
  page = 1;

  constructor(private route: ActivatedRoute) {
    this.races = this.route.snapshot.data.race;
  }
}
