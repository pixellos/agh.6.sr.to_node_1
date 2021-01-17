import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AngularPlugin, AngularPluginService} from '@microsoft/applicationinsights-angularplugin-js';
import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tai-ui';
  private appInsights;
  openAuthBar: boolean = false;

  constructor(private router: Router, private angularPluginService: AngularPluginService, public authService: AuthService) {
    var angularPlugin = new AngularPlugin();
    this.angularPluginService.init(angularPlugin, this.router);
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: 'bd32180d-56b4-4473-b277-4c59e80f2d80',
        extensions: [angularPlugin],
        extensionConfig: {
          [angularPlugin.identifier]: {router: this.router}
        }
      }
    });
  }

  ngOnInit() {
    this.appInsights.loadAppInsights();
  }

  onClick() {
    if(!this.authService.authenticated) {
      this.authService.doLogin();
    } 
    else {
      this.openAuthBar = !this.openAuthBar;
    }
  }

  logout() {
    this.authService.logout()
  }
}
