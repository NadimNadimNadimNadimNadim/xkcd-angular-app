import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XkcdDisplayComponent } from './xkcd-display.component';

describe('XkcdDisplayComponent', () => {
  let component: XkcdDisplayComponent;
  let fixture: ComponentFixture<XkcdDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XkcdDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XkcdDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
