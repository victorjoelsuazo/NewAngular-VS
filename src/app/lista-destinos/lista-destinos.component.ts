import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinoViajeComponent } from '../destino-viaje/destino-viaje.component';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [NgFor, DestinoViajeComponent],
  templateUrl: './lista-destinos.component.html'
})
export class ListaDestinosComponent {
  destinos: DestinoViaje[] = [];

  guardar(n: string, u: string): boolean {
    this.destinos.push(new DestinoViaje(n, u));
    return false; // evita que el form recargue la página
  }
}