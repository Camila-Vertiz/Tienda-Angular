import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDetalleOrdenComponent } from './resumen-detalle-orden.component';

describe('ResumenDetalleOrdenComponent', () => {
  let component: ResumenDetalleOrdenComponent;
  let fixture: ComponentFixture<ResumenDetalleOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenDetalleOrdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenDetalleOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
