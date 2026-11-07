import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinoViajeComponent } from './destino-viaje.component';

describe('DestinoViajeComponent', () => {
  let component: DestinoViajeComponent;
  let fixture: ComponentFixture<DestinoViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoViajeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinoViajeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
