import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvePorudzbineComponent } from './sve-porudzbine.component';

describe('SvePorudzbineComponent', () => {
  let component: SvePorudzbineComponent;
  let fixture: ComponentFixture<SvePorudzbineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvePorudzbineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvePorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
