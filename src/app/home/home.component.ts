import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userEventsSubscription: Subscription | null = null;
  user: UserModel | null = null;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.userEventsSubscription = this.service.userEvents.subscribe(res => {
      this.user = res;
    });
  }

  ngOnDestroy(): void {
    this.userEventsSubscription?.unsubscribe();
  }
}
