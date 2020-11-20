import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { Configuration, ErrorResponse } from 'src/client-order';

import {DefaultService} from 'src/client-order/api/default.service'

@Component({
  selector: 'app-call-button',
  template: `
  <button class="btn btn-primary btn-block" (click)="angularIsShit()">
    Call
  </button>
`
})
export class CallComponent implements OnInit {
  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService, public client: HttpClient) { }
  
  ngOnInit(): void {}

  async angularIsShit(): Promise<void> {
    const client = new DefaultService(this.client, 'http://localhost:3001', new Configuration({}));
    const data = await client.all();
    data.forEach(x => {
      if (IsNotError(x)) {
        x.map(data => {
          const id = data.id;/// tutaj dziala podpowiadanie !#!@!@!@!
        })
      }
    })
  }
}

function IsNotError<T> (x): x is T[] {
  return !('error' in x);
}