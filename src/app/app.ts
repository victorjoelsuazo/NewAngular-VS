import { Component } from '@angular/core';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';

@Component({
  selector: 'app-root',
  imports: [ListaDestinosComponent],
  templateUrl: './app.html'
})
export class App {}