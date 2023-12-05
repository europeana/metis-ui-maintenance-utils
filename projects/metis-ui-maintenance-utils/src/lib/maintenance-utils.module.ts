import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MockMaintenanceScheduleService } from './_mocked/mocked-maintenance-schedule.service';
import { MaintenanceScheduleService } from './_services/maintenance-schedule.service';
import { MaintenanceInfoComponent } from './maintenance-info/maintenance-info.component';

@NgModule({
  declarations: [MaintenanceInfoComponent],
  imports: [BrowserModule],
  providers: [MaintenanceScheduleService, MockMaintenanceScheduleService],
  exports: [MaintenanceInfoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaintenanceUtilsModule {}
