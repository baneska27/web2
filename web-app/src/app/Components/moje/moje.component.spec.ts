import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeComponent } from './moje.component';

describe('MojeComponent', () => {
  let component: MojeComponent;
  let fixture: ComponentFixture<MojeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
