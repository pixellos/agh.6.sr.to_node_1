import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
  <div *ngIf="auth.user$ | async as user">
  <div class="row align-items-center profile-header">
    <div class="col-md-2 mb-3">
      <img
        [src]="user.picture"
        alt="User's profile picture"
        class="rounded-circle img-fluid profile-picture"
      />
    </div>
    <div class="col-md text-center text-md-left">
      <h2>{{ user.name }}</h2>
      <p class="lead text-muted">{{ user.email }}</p>
    </div>
  </div>

  <div class="row" *ngIf="profileJson">
    <pre class="col-12 text-light bg-dark p-4">{{ profileJson }}</pre>
  </div>
</div>
    `
})
export class UserProfileComponent implements OnInit {
  profileJson: string = null;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        debugger;
        (this.profileJson = JSON.stringify(profile, null, 2))
      }
    );
  }
}