import {Injectable} from '@angular/core';
import { AuthService as Oauth } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean = false;
  login: string = '';
  role: string = '';

  constructor(public oauth: Oauth) {
    oauth.idTokenClaims$.subscribe(x => {
      const roles = x['https://any-namespace/roles'] as string[]; 
      if (roles.indexOf('Administrator') !== -1) {
        this.role = 'Admin'
      }
      else {
        this.role = "User"
      }
    })
    oauth.isAuthenticated$.subscribe(x => this.authenticated = x);
    oauth.user$.subscribe(x => {
      this.login = x.email;
      console.log(x)
    })
  }

  authenticate(login: string, role: string) {
    this.authenticated = true;
    this.login = login;
    this.role = role;
  }

  doLogin() {
    this.oauth.loginWithPopup();
  }

  logout() {
    this.authenticated = false;
    this.login = '';
    this.role = '';
    this.oauth.logout({returnTo: window.location.origin})
  }
}
