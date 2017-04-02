import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebelDetailComponent } from './rebel-detail.component';

describe('RebelDetailComponent', () => {
  let component: RebelDetailComponent;
  let fixture: ComponentFixture<RebelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
