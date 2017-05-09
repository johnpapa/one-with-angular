import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';
import { of } from 'rxjs/observable/of';

import { CharactersComponent } from './characters.component';
import { DataService } from '../../core/data.service';
import { DataServiceStub, MdSnackBarStub } from '../../../testing';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersComponent ],
      providers: [
        { provide: DataService, useClass: DataServiceStub },
        { provide: MdSnackBar, useClass: MdSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain Characters heading', () => {
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
    expect(el.textContent).toContain('Characters');
  });
});
