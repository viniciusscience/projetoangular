import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaceuticoComponent } from './farmaceutico.component';

describe('FarmaceuticoComponent', () => {
  let component: FarmaceuticoComponent;
  let fixture: ComponentFixture<FarmaceuticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmaceuticoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmaceuticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
