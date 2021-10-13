import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from 'src/app/models/race.model';

@Component({
  selector: 'pr-pending-races',
  templateUrl: './pending-races.component.html',
  styleUrls: ['./pending-races.component.css']
})
export class PendingRacesComponent implements OnInit {
  races: Array<RaceModel> = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('this.route.snapshot.data', this.route.snapshot.data);

    this.races = this.route.snapshot.data.race;
  }
}
