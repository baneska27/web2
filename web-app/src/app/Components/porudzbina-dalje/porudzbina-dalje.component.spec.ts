import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorudzbinaDaljeComponent } from './porudzbina-dalje.component';

describe('PorudzbinaDaljeComponent', () => {
  let component: PorudzbinaDaljeComponent;
  let fixture: ComponentFixture<PorudzbinaDaljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorudzbinaDaljeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorudzbinaDaljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
