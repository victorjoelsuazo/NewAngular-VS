import { Component, HostBinding, Input } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  templateUrl: './destino-viaje.component.html'
})
export class DestinoViajeComponent {
  @Input() destino!: DestinoViaje;
  @HostBinding('attr.class') cssClass = 'col-md-4';
}