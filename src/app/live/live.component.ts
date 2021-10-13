import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  //bufferCount,
  bufferToggle,
  catchError,
  EMPTY,
  filter,
  finalize,
  groupBy,
  interval,
  map,
  mergeMap,
  Subject,
  Subscription,
  switchMap,
  //tap,
  throttleTime
} from 'rxjs';
import { PonyModel, PonyWithPositionModel } from '../models/pony.model';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription | null = null;
  error = false;
  winners: Array<PonyWithPositionModel> = [];
  betWon: boolean | null = null;
  clickSubject = new Subject<PonyWithPositionModel>();
  raceId: number | null = null;

  constructor(private raceService: RaceService, private route: ActivatedRoute, private ref: ChangeDetectorRef) {
    this.raceModel = this.route.snapshot.data.race;
  }

  ngOnInit(): void {
    if (this.raceModel.status !== 'FINISHED') {
      this.positionSubscription = this.raceService
        .live(this.raceModel.id)
        .pipe(
          finalize(() => {
            this.ref.markForCheck();
          })
        )
        .subscribe({
          next: ponies => {
            this.poniesWithPosition = ponies;
            this.raceModel!.status = 'RUNNING';
            this.ref.markForCheck();
          },
          error: error => {
            this.error = true;
          },
          complete: () => {
            this.raceModel.status = 'FINISHED';
            this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
            this.betWon = this.winners.some(winnerPony => winnerPony.id === this.raceModel!.betPonyId);
          }
        });
    }

    this.clickSubject
      .pipe(
        groupBy(pony => pony.id, { element: (pony: PonyModel) => pony.id }),
        mergeMap(obsPonyArray => obsPonyArray.pipe(bufferToggle(obsPonyArray, () => interval(1000)))),
        filter(obsPonyArray => obsPonyArray.length >= 5),
        throttleTime(1000),
        map(obsPonyArray => {
          return obsPonyArray.shift() as number;
        }),
        switchMap((ponyId: number) => this.raceService.boost(this.raceModel.id, ponyId).pipe(catchError(() => EMPTY)))
      )
      .subscribe(ponyId => {
        console.log('ponyId', ponyId);
      });
  }

  onClick(ponyEm: PonyWithPositionModel) {
    this.clickSubject.next(ponyEm);
  }

  ponyById(index: number, element: PonyWithPositionModel) {
    return element.id;
  }

  ngOnDestroy(): void {
    this.positionSubscription?.unsubscribe();
  }
}
