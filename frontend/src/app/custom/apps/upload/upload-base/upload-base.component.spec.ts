import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBaseComponent } from './upload-base.component';

describe('UploadBaseComponent', () => {
  let component: UploadBaseComponent;
  let fixture: ComponentFixture<UploadBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
