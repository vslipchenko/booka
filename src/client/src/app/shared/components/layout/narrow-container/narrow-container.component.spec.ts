import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NarrowContainerComponent} from './narrow-container.component';

describe('NarrowContainerComponent', () => {
  let component: NarrowContainerComponent;
  let fixture: ComponentFixture<NarrowContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NarrowContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
