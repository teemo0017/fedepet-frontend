import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPetPage } from './add-pet.page';

describe('AddPetPage', () => {
  let component: AddPetPage;
  let fixture: ComponentFixture<AddPetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
