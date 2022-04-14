import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifikacijaComponent } from './verifikacija.component';

describe('VerifikacijaComponent', () => {
  let component: VerifikacijaComponent;
  let fixture: ComponentFixture<VerifikacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifikacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifikacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
