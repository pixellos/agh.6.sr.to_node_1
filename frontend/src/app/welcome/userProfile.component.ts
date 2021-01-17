import {Component, OnInit} from '@angular/core';
import {AuthService as Oauth} from '@auth0/auth0-angular';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-user-profile',
  template: `
  `
})
export class UserProfileComponent implements OnInit {

  constructor(public oauth: Oauth, private authService: AuthService) {
  }

  ngOnInit(): void {
  }
}
