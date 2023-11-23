import { Component, Input } from '@angular/core';
import { MaintenanceItem } from '../_models/maintenance';

@Component({
  selector: 'lib-maintenance-info',
  templateUrl: './maintenance-info.component.html',
  styleUrls: ['./maintenance-info.component.scss']
})
export class MaintenanceInfoComponent {
  @Input() maintenanceInfo: MaintenanceItem;
}
