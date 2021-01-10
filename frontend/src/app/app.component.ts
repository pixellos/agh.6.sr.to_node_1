import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularPlugin, AngularPluginService } from '@microsoft/applicationinsights-angularplugin-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tai-ui';
  private appInsights;
  constructor(private router: Router,
    private angularPluginService: AngularPluginService
  ) {
    var angularPlugin = new AngularPlugin();
    this.angularPluginService.init(angularPlugin, this.router);
    this.appInsights = new ApplicationInsights({ config: {
    instrumentationKey: 'bd32180d-56b4-4473-b277-4c59e80f2d80',
    extensions: [angularPlugin],
    extensionConfig: {
        [angularPlugin.identifier]: { router: this.router }
    }
    } });
  }

  ngOnInit() {
    this.appInsights.loadAppInsights();
}
}
