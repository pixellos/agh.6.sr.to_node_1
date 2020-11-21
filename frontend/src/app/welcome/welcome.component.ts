import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = "sd";

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  login(): void {
    if(this.auth.isAuthenticated$) {
      this.auth.loginWithPopup({screen_hint: 'login'});
    } else {
      this.auth.logout();
    }
  }

}
