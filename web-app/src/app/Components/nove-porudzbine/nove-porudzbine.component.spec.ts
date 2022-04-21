import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovePorudzbineComponent } from './nove-porudzbine.component';

describe('NovePorudzbineComponent', () => {
  let component: NovePorudzbineComponent;
  let fixture: ComponentFixture<NovePorudzbineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovePorudzbineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovePorudzbineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
