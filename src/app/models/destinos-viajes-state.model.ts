import { inject, Injectable } from '@angular/core';
import { Action, ActionReducerMap } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje.model';

// ESTADO
export interface DestinosViajesState {
  items: DestinoViaje[];
  loading: boolean;
  favorito: DestinoViaje | null;
}

export const initializeDestinosViajesState = (): DestinosViajesState => ({
  items: [],
  loading: false,
  favorito: null
});

// ACCIONES
export enum DestinosViajesActionTypes {
  NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
  BORRAR_DESTINO = '[Destinos Viajes] Borrar',
  ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
  VOTE_UP = '[Destinos Viajes] Vote Up',
  VOTE_DOWN = '[Destinos Viajes] Vote Down',
  RESET_VOTES = '[Destinos Viajes] Reset Votes'
}

export class NuevoDestinoAction implements Action {
  readonly type = DestinosViajesActionTypes.NUEVO_DESTINO;
  constructor(public destino: DestinoViaje) {}
}

export class BorrarDestinoAction implements Action {
  readonly type = DestinosViajesActionTypes.BORRAR_DESTINO;
  constructor(public destino: DestinoViaje) {}
}

export class ElegidoFavoritoAction implements Action {
  readonly type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
  constructor(public destino: DestinoViaje) {}
}

export class VoteUpAction implements Action {
  readonly type = DestinosViajesActionTypes.VOTE_UP;
  constructor(public destino: DestinoViaje) {}
}

export class VoteDownAction implements Action {
  readonly type = DestinosViajesActionTypes.VOTE_DOWN;
  constructor(public destino: DestinoViaje) {}
}

export class ResetVotesAction implements Action {
  readonly type = DestinosViajesActionTypes.RESET_VOTES;
}

export type DestinosViajesActions =
  NuevoDestinoAction | BorrarDestinoAction | ElegidoFavoritoAction |
  VoteUpAction | VoteDownAction | ResetVotesAction;

// REDUCER
export function reducerDestinosViajes(
  state: DestinosViajesState = initializeDestinosViajesState(),
  action: DestinosViajesActions
): DestinosViajesState {
  switch (action.type) {
    case DestinosViajesActionTypes.NUEVO_DESTINO:
      return { ...state, items: [...state.items, action.destino] };
    case DestinosViajesActionTypes.BORRAR_DESTINO:
      return { ...state, items: state.items.filter(d => d.id !== action.destino.id) };
    case DestinosViajesActionTypes.ELEGIDO_FAVORITO:
      return { ...state, favorito: action.destino };
    case DestinosViajesActionTypes.VOTE_UP:
      return {
        ...state,
        items: state.items.map(d => d.id === action.destino.id ? { ...d, votes: d.votes + 1 } : d)
      };
    case DestinosViajesActionTypes.VOTE_DOWN:
      return {
        ...state,
        items: state.items.map(d => d.id === action.destino.id ? { ...d, votes: d.votes - 1 } : d)
      };
    case DestinosViajesActionTypes.RESET_VOTES:
      return { ...state, items: state.items.map(d => ({ ...d, votes: 0 })) };
    default:
      return state;
  }
}

// ESTADO GLOBAL
export interface AppState {
  destinos: DestinosViajesState;
}

export const reducers: ActionReducerMap<AppState, DestinosViajesActions> = {
  destinos: reducerDestinosViajes
};

// EFFECT: cuando se agrega un destino, se elige como favorito
@Injectable()
export class DestinosViajesEffects {
  private actions$ = inject(Actions);

  nuevoAgregadoFavorito$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
      map(action => new ElegidoFavoritoAction((action as NuevoDestinoAction).destino))
    )
  );
}