import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCategorySelectComponent } from './business-category-select.component';

describe('BusinessCategorySelectComponent', () => {
  let component: BusinessCategorySelectComponent;
  let fixture: ComponentFixture<BusinessCategorySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCategorySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
