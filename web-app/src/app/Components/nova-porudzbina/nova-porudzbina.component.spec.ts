import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPorudzbinaComponent } from './nova-porudzbina.component';

describe('NovaPorudzbinaComponent', () => {
  let component: NovaPorudzbinaComponent;
  let fixture: ComponentFixture<NovaPorudzbinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaPorudzbinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaPorudzbinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
