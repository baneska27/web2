import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostavaComponent } from './dostava.component';

describe('DostavaComponent', () => {
  let component: DostavaComponent;
  let fixture: ComponentFixture<DostavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DostavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DostavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
