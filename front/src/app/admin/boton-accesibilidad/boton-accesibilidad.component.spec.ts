import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonAccesibilidadComponent } from './boton-accesibilidad.component';

describe('BotonAccesibilidadComponent', () => {
  let component: BotonAccesibilidadComponent;
  let fixture: ComponentFixture<BotonAccesibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonAccesibilidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotonAccesibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
