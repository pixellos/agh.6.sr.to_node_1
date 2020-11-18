import { Component, OnInit } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template: `
  <button class="btn btn-primary btn-block" (click)="loginWithRedirect()">
    Sign Up
  </button>
`
})
export class AuthButtonComponent implements OnInit {
  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) { }
  
  ngOnInit(): void {}

  loginWithRedirect(): void {
    this.auth.loginWithPopup({ screen_hint: 'signup' });
  }
}