import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import {
  MaintenanceSettings,
  MaintenanceScheduleItemKey,
} from '../_models/maintenance';

export const MAINTENANCE_INTERCEPTOR_SETTINGS =
  new InjectionToken<MaintenanceSettings>('settings', {
    providedIn: 'root',
    factory: (): MaintenanceSettings => {
      return {
        pollInterval: 0,
        maintenanceScheduleKey: '' as MaintenanceScheduleItemKey,
        maintenanceScheduleUrl: '',
        maintenanceItem: {},
      };
    },
  });

@Injectable({ providedIn: 'root' })
export class MaintenanceInterceptor implements HttpInterceptor {
  constructor(
    @Inject(MAINTENANCE_INTERCEPTOR_SETTINGS)
    public settings: MaintenanceSettings,
  ) {}

  /** intercept
   * @param { HttpRequest } request
   * @param { HttpHandler } handler
   * @returns Observable<HttpEvent>
   **/
  intercept(
    request: HttpRequest<unknown>,
    handler: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const re = this.settings.maintenanceItem;
    if (
      re &&
      re.maintenanceMessage &&
      re.maintenanceMessage.length &&
      request.url !== this.settings.maintenanceScheduleUrl
    ) {
      return NEVER;
    } else {
      return handler.handle(request);
    }
  }
}
