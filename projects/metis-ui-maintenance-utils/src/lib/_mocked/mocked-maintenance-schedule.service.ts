import { delay, Observable, of } from 'rxjs';
import { MaintenanceSettings } from '../_models/maintenance';

export class MockMaintenanceScheduleService {
  setApiSettings(_: MaintenanceSettings): void {
    console.log('Mock setApiSettings');
  }

  loadMaintenanceItem(): Observable<string | undefined> {
    return of('Site is down').pipe(delay(1));
  }
}

export class MockMaintenanceScheduleServiceEmpty extends MockMaintenanceScheduleService {
  loadMaintenanceItem(): Observable<string | undefined> {
    return of(undefined).pipe(delay(1));
  }
}
