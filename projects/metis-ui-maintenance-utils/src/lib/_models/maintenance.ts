export enum MaintenanceScheduleItemKey {
  METIS_UI_TEST = 'metis-ui-test',
  METIS_UI_ACCEPTANCE = 'metis-ui-acceptance',
  METIS_UI_PRODUCTION = 'metis-ui-production',
  SANDBOX_UI_TEST = 'sandbox-ui-test',
  SANDBOX_UI_ACCEPTANCE = 'sandbox-ui-acceptance',
  SANDBOX_UI_PRODUCTION = 'sandbox-ui-production',
  STATISTICS_DASHBOARD_TEST = 'statistics-dashboard-test',
  STATISTICS_DASHBOARD_ACCEPTANCE = 'statistics-dashboard-acceptance',
  STATISTICS_DASHBOARD_PRODUCTION = 'statistics-dashboard-production'
}

export interface MaintenancePeriod {
  from: string;
  to: string;
}

export interface MaintenanceItem {
  maintenanceMessage?: string;
  maintenanceScheduleUrl?: string;
  period?: MaintenancePeriod;
}

export type MaintenanceSchedule = {
  [key in MaintenanceScheduleItemKey]: MaintenanceItem;
};

export interface MaintenanceSettings {
  pollInterval: number;
  maintenanceScheduleUrl: string;
  maintenanceScheduleKey: MaintenanceScheduleItemKey;
  maintenanceItem: MaintenanceItem;
}
