import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListComponent } from './checkin-reservation.component';

describe('CheckinReservationComponent', () => {
  let component: CheckinReservationComponent;
  let fixture: ComponentFixture<CheckinReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
