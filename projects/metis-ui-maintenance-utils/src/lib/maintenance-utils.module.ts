import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MockRemoteEnvService } from './_mocked/mocked-remote-env.service';
import { RemoteEnvService } from './_services/remote-env.service';
import { MaintenanceInfoComponent } from './maintenance-info/maintenance-info.component';

@NgModule({
  declarations: [
    MaintenanceInfoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MockRemoteEnvService, RemoteEnvService],
  exports: [
    MaintenanceInfoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaintenanceUtilsModule { }
