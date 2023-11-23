import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { MaintenanceItem } from '../_models/maintenance';

export const maintenanceInterceptor = (
  config: MaintenanceItem
): HttpInterceptorFn => {
  const interceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> => {
    if (
      config.maintenanceMessage &&
      config.maintenanceMessage.length &&
      req.url !== config.maintenanceScheduleUrl
    ) {
      return NEVER;
    } else {
      return next(req);
    }
  };
  return interceptor;
};
