import { Component, HostBinding, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { DestinoViaje } from '../models/destino-viaje.model';
import { AppState, BorrarDestinoAction, ElegidoFavoritoAction, VoteDownAction, VoteUpAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  standalone: false,
  animations: [
    trigger('pulso', [
      transition('* => *', [
        style({ transform: 'scale(1.4)', color: '#1ABC9C' }),
        animate('400ms ease-out')
      ])
    ])
  ]
})
export class DestinoViajeComponent {
  @Input() destino!: DestinoViaje;
  @HostBinding('attr.class') cssClass = 'col-md-4';

  constructor(private store: Store<AppState>) {}

  elegir() {
    this.store.dispatch(new ElegidoFavoritoAction(this.destino));
  }

  voteUp() {
    this.store.dispatch(new VoteUpAction(this.destino));
  }

  voteDown() {
    this.store.dispatch(new VoteDownAction(this.destino));
  }

  borrar() {
    this.store.dispatch(new BorrarDestinoAction(this.destino));
  }
}