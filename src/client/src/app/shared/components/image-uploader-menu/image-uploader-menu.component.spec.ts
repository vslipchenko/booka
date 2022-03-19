import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageUploaderMenuComponent} from './image-uploader-menu.component';

describe('ImageUploadMenuComponent', () => {
  let component: ImageUploaderMenuComponent;
  let fixture: ComponentFixture<ImageUploaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageUploaderMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
