import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenOrdenesComponent } from './resumen-ordenes.component';

describe('ResumenOrdenesComponent', () => {
  let component: ResumenOrdenesComponent;
  let fixture: ComponentFixture<ResumenOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenOrdenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
