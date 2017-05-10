import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CharacterDetailComponent } from './character-detail.component';
import { Character, DataService } from '../../core';
import * as testing from '../../../testing';

@Component({
  template: '<ro-character-detail [character]="selectedCharacter"></ro-character-detail>'
})
class TestHostComponent {
  selectedCharacter: Character = testing.characters[0];
}

describe('CharactersDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;
  let detailDebugEl: DebugElement;
  // let detailEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent, TestHostComponent],
      providers: [{ provide: DataService, useClass: testing.DataServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    detailDebugEl = hostFixture.debugElement.query(By.css('.character-detail input[placeholder=Name]'));

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have a character', () => {
    expect(component.character).toBeUndefined();
  });

  it('should set the character input ', () => {
    expect(detailDebugEl.nativeElement.ngModel).not.toContain(testHostComponent.selectedCharacter.name);
    hostFixture.detectChanges();
    expect(detailDebugEl.nativeElement.ngModel).toContain(testHostComponent.selectedCharacter.name);
  });

  // it('should have synchronized home world ', () => {
    // component.character = testing.characters[0];
    // const spy = spyOn(component, 'syncHomeWorld');
    // hostFixture.detectChanges();

    // fixture.detectChanges();
    // expect(component.character).toBe(testHostComponent.selectedCharacter);
    // expect(component.character).toEqual(testHostComponent.selectedCharacter);
    // expect(spy).toHaveBeenCalled();
    // expect(component.homeWorld.id).toBe(component.character.homeWorldId);
    // expect(component.homeWorld.id).toBe(component.character.homeWorld.id);
  // });
});
