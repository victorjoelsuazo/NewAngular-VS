import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { DestinoViaje } from './destino-viaje.model';

@Injectable({ providedIn: 'root' })
export class MyDatabase extends Dexie {
  declare destinos: Table<DestinoViaje, string>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      destinos: 'id, nombre'
    });
  }
}