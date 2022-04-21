import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrenutnaPorudzbinaComponent } from './trenutna-porudzbina.component';

describe('TrenutnaPorudzbinaComponent', () => {
  let component: TrenutnaPorudzbinaComponent;
  let fixture: ComponentFixture<TrenutnaPorudzbinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrenutnaPorudzbinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrenutnaPorudzbinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
