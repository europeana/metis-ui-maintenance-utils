export type MaintenanceScheduleItemKey =
  | 'sandbox-ui-test'
  | 'sandbox-ui-acceptance'
  | 'sandbox-ui-production';

export interface MaintenancePeriod {
  from: string;
  to: string;
}

export interface MaintenanceItem {
  maintenanceMessage?: string;
  maintenanceScheduleUrl?: string;
  period?: MaintenancePeriod;
}

export interface MaintenanceSchedule {
  ['sandbox-ui-test']: MaintenanceItem;
  ['sandbox-ui-acceptance']: MaintenanceItem;
  ['sandbox-ui-production']: MaintenanceItem;
}

export interface MaintenanceSettings {
  pollInterval: number;
  maintenanceScheduleUrl: string;
  maintenanceScheduleKey: MaintenanceScheduleItemKey;
  maintenanceItem: MaintenanceItem;
}
