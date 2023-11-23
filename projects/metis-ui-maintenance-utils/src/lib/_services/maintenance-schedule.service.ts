import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import {
  MaintenanceItem,
  MaintenancePeriod,
  MaintenanceSchedule,
  MaintenanceScheduleItemKey,
  MaintenanceSettings
} from '../_models/maintenance';

@Injectable({ providedIn: 'root' })
export class MaintenanceScheduleService {
  private readonly http: HttpClient;
  settings: MaintenanceSettings;

  constructor() {
    this.http = inject(HttpClient);
  }

  setApiSettings(settings: MaintenanceSettings): void {
    this.settings = settings;
  }

  /**
  /* periodIsNow
  /* @param { MaintenancePeriod } period
  /* @returns boolean
  **/
  periodIsNow(period: MaintenancePeriod): boolean {
    const pFrom = new Date(Date.parse(period.from));
    const pTo = new Date(Date.parse(period.to));
    const now = new Date();
    return now >= pFrom && now <= pTo;
  }

  /**
  /* loadMaintenanceItem
  /* @returns Observable<MaintenanceItem | undefined>
  **/
  loadMaintenanceItem(): Observable<MaintenanceItem | undefined> {
    const url = this.settings.maintenanceScheduleUrl;
    const dataKey = this.settings
      .maintenanceScheduleKey as MaintenanceScheduleItemKey;

    if (!(url && dataKey)) {
      return of(undefined);
    }
    return timer(1, this.settings.pollInterval).pipe(
      switchMap(() => {
        return this.http.get<MaintenanceSchedule>(url);
      }),
      map((schedule: MaintenanceSchedule) => {
        return schedule[dataKey];
      }),
      map((item: MaintenanceItem) => {
        if (item && item.period && !this.periodIsNow(item.period)) {
          this.settings.maintenanceItem.maintenanceMessage = '';
          return undefined;
        }
        // flag interception via global settings
        this.settings.maintenanceItem.maintenanceMessage = item
          ? (item.maintenanceMessage as string)
          : undefined;
        return item;
      }),
      catchError((e: Error) => {
        console.log(e);
        return of(undefined);
      })
    );
  }
}
