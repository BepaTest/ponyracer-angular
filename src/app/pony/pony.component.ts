import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PonyComponent {
  @Input() ponyModel!: PonyModel;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();
  @Input() isRunning = false;
  @Input() isBoosted: boolean | undefined = false;

  getPonyImageUrl(): string {
    if (this.isRunning === true) {
      if (this.isBoosted === true) {
        return `assets/images/pony-${this.ponyModel.color.toLowerCase()}-rainbow.gif`;
      } else return `assets/images/pony-${this.ponyModel.color.toLowerCase()}-running.gif`;
    } else return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
  }

  clicked(): void {
    this.ponyClicked.emit(this.ponyModel);
  }
}
