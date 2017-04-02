import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebelsComponent } from './rebels.component';

describe('RebelsComponent', () => {
  let component: RebelsComponent;
  let fixture: ComponentFixture<RebelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
