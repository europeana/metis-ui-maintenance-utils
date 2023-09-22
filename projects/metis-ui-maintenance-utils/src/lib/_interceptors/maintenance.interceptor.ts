import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import {
  MaintenanceItem,
  MaintenanceSettings,
  MaintenanceScheduleItemKey,
} from '../_models/maintenance';

export const maintenanceInterceptor = (config: MaintenanceItem) => {
  const interceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
  ) => {
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
