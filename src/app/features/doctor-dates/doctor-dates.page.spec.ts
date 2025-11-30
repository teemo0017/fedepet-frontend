import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorDatesPage } from './doctor-dates.page';

describe('DoctorDatesPage', () => {
  let component: DoctorDatesPage;
  let fixture: ComponentFixture<DoctorDatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
