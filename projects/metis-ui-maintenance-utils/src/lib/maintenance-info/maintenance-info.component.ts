import { Component, Input } from '@angular/core';
import { MaintenanceItem } from '../_models/maintenance';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'lib-maintenance-info',
  templateUrl: './maintenance-info.component.html',
  styleUrls: ['./maintenance-info.component.scss'],
  standalone: true,
  imports: [NgIf, DatePipe]
})
export class MaintenanceInfoComponent {
  @Input() maintenanceInfo: MaintenanceItem;
}
