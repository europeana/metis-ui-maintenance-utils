import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MockRemoteEnvService } from './_mocked/mocked-remote-env.service';
import { RemoteEnvService } from './_services/remote-env.service';
import { MaintenanceInfoComponent } from './maintenance-info/maintenance-info.component';

@NgModule({
  declarations: [
    MaintenanceInfoComponent
  ],
  providers: [MockRemoteEnvService, RemoteEnvService],
  imports: [
    BrowserModule
  ],
  exports: [
    MaintenanceInfoComponent
  ]
})
export class MaintenanceUtilsModule { }
