import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlikaRegistrationComponent } from './slika-registration.component';

describe('SlikaRegistrationComponent', () => {
  let component: SlikaRegistrationComponent;
  let fixture: ComponentFixture<SlikaRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlikaRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlikaRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
