import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MockHttp } from '@europeana/metis-ui-test-utils';
import {
  MaintenanceItem,
  MaintenanceSchedule,
  MaintenanceScheduleItemKey,
  MaintenanceSettings
} from '../_models/maintenance';

import { MaintenanceScheduleService } from './maintenance-schedule.service';

describe('MaintenanceScheduleService', () => {
  let mockHttp: MockHttp;
  let service: MaintenanceScheduleService;

  const key = MaintenanceScheduleItemKey.SANDBOX_UI_TEST;
  const getMockResult = (msg: string, date?: Date): MaintenanceSchedule => {
    const res = {} as unknown as MaintenanceSchedule;
    res[key] = {
      maintenanceMessage: msg
    };
    if (date) {
      res[key].period = {
        from: date.toISOString(),
        to: new Date(date.getTime() + 1000).toISOString()
      };
    }
    return res;
  };

  const getSettings = (): MaintenanceSettings => {
    return {
      pollInterval: 10,
      maintenanceScheduleKey: key,
      maintenanceItem: {
        maintenanceMessage: 'xxx'
      },
      maintenanceScheduleUrl: 'http://xxx'
    };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MaintenanceScheduleService],
      imports: [HttpClientTestingModule]
    }).compileComponents();
    mockHttp = new MockHttp(TestBed.inject(HttpTestingController), '');
    service = TestBed.inject(MaintenanceScheduleService);
  }));

  afterEach(() => {
    mockHttp.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get the maintenance message', fakeAsync(() => {
    const msg = 'hello';
    const settings = getSettings();

    service.setApiSettings(settings);

    const sub = service
      .loadMaintenanceItem()
      .subscribe((data: MaintenanceItem | undefined) => {
        expect(data).toBeTruthy();
        expect(data?.maintenanceMessage).toEqual(msg);
      });
    tick(1);
    mockHttp
      .expect('GET', settings.maintenanceScheduleUrl)
      .send(getMockResult(msg));
    sub.unsubscribe();
  }));

  it('should get the maintenance message with the current date', fakeAsync(() => {
    const msg = 'hello';
    const settings = getSettings();

    service.setApiSettings(settings);

    const sub = service
      .loadMaintenanceItem()
      .subscribe((data: MaintenanceItem | undefined) => {
        expect(data).toBeTruthy();
        expect(data?.maintenanceMessage).toEqual(msg);
      });
    tick(1);
    mockHttp
      .expect('GET', settings.maintenanceScheduleUrl)
      .send(getMockResult(msg, new Date()));
    sub.unsubscribe();
  }));

  it('should not get the maintenance message if the period is not now', fakeAsync(() => {
    const msg = 'hello';
    const settings = getSettings();
    const oneHour = 60 * 60 * 1000;
    const oneHourFromNow = new Date(new Date().getTime() + oneHour);

    service.setApiSettings(settings);

    const sub = service
      .loadMaintenanceItem()
      .subscribe((data: MaintenanceItem | undefined) => {
        expect(data).toBeFalsy();
      });
    tick(1);
    mockHttp
      .expect('GET', settings.maintenanceScheduleUrl)
      .send(getMockResult(msg, oneHourFromNow));
    sub.unsubscribe();
  }));

  it('should not get the maintenance message if the api settings are absent', fakeAsync(() => {
    const settings = getSettings();
    settings.maintenanceScheduleUrl = undefined as unknown as string;
    service.setApiSettings(settings);

    let res: MaintenanceItem | undefined;
    const sub = service
      .loadMaintenanceItem()
      .subscribe((result: MaintenanceItem | undefined) => {
        res = result;
      });
    tick(1);
    expect(res).toBeFalsy();
    sub.unsubscribe();
  }));

  it('should ignore malformed json', fakeAsync(() => {
    const settings = getSettings();
    service.setApiSettings(settings);
    const sub = service
      .loadMaintenanceItem()
      .subscribe((data: MaintenanceItem | undefined) => {
        expect(data).toBeFalsy();
      });
    tick(1);
    mockHttp
      .expect('GET', settings.maintenanceScheduleUrl)
      .send('{ "malformed-json" }');
    sub.unsubscribe();
  }));
});
