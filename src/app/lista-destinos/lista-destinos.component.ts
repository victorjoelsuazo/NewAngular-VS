import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { AppState, ResetVotesAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  standalone: false
})
export class ListaDestinosComponent {
  @Output() onItemAdded = new EventEmitter<DestinoViaje>();
  destinos$: Observable<DestinoViaje[]>;
  updates: string[] = [];

  constructor(private store: Store<AppState>, private destinosApiClient: DestinosApiClient) {
    this.destinos$ = this.store.select(state => state.destinos.items);
    this.store.select(state => state.destinos.favorito).subscribe(d => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  resetVotos() {
    this.store.dispatch(new ResetVotesAction());
  }
}