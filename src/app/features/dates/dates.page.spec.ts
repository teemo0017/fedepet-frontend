import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatesPage } from './dates.page';

describe('DatesPage', () => {
  let component: DatesPage;
  let fixture: ComponentFixture<DatesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
