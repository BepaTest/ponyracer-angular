import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, concat, EMPTY, Observable, of, shareReplay, switchMap } from 'rxjs';

import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  navbarCollapsed = true;
  userEvents!: Observable<UserModel | null>;
  // user: UserModel | null = null;
  // userEventsSubscription: Subscription | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userEvents = this.userService.userEvents.pipe(
      switchMap(user => (user ? concat(of(user), this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) : of(null))),
      shareReplay()
    );
    // this.userEventsSubscription = this.userService.userEvents
    //   .pipe(switchMap(user => (user ? concat(of(user), this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) : of(null))))
    //   .subscribe(user => (this.user = user));
  }

  // ngOnDestroy(): void {
  //   this.userEventsSubscription?.unsubscribe();
  // }

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
