import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  standalone: false
})
export class FormDestinoViajeComponent {
  @Output() onItemAdded = new EventEmitter<DestinoViaje>();
  fg: FormGroup;
  minLongitud = 3;

  constructor(fb: FormBuilder) {
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['', Validators.required]
    });
  }

  guardar(): boolean {
    const d = new DestinoViaje(this.fg.value.nombre, this.fg.value.url);
    this.onItemAdded.emit(d);
    this.fg.reset();
    return false;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      const l = (control.value ?? '').toString().trim().length;
      if (l > 0 && l < minLong) {
        return { minLongNombre: true };
      }
      return null;
    };
  }
}