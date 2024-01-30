import { delay, Observable, of } from 'rxjs';
import { MaintenanceItem, MaintenanceSettings } from '../_models/maintenance';

export class MockMaintenanceScheduleService {
  setApiSettings(_: MaintenanceSettings): void {
    console.log('Mock setApiSettings');
  }

  loadMaintenanceItem(): Observable<MaintenanceItem | undefined> {
    return of({
      maintenanceMessage: 'Site is down'
    }).pipe(delay(1));
  }
}

export class MockMaintenanceScheduleServiceEmpty extends MockMaintenanceScheduleService {
  loadMaintenanceItem(): Observable<MaintenanceItem | undefined> {
    return of(undefined).pipe(delay(1));
  }
}
