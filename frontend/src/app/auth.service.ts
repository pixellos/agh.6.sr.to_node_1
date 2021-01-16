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
  }

  authenticate(login: string, role: string) {
    this.authenticated = true;
    this.login = login;
    this.role = role;
  }

  logout() {
    this.authenticated = false;
    this.login = '';
    this.role = '';
    this.oauth.logout()
  }


}
