import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoClientes } from './progreso-clientes';

describe('ProgresoClientes', () => {
  let component: ProgresoClientes;
  let fixture: ComponentFixture<ProgresoClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresoClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgresoClientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
