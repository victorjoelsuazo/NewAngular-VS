import { DestinoViaje } from './destino-viaje.model';
import {
  BorrarDestinoAction, DestinosViajesState, ElegidoFavoritoAction, InitMyDataAction,
  NuevoDestinoAction, ResetVotesAction, VoteDownAction, VoteUpAction,
  initializeDestinosViajesState, reducerDestinosViajes
} from './destinos-viajes-state.model';
import { TrackClickAction, initializeTrackingState, reducerTracking } from './tracking-state.model';

const crear = (id: string, votes = 0): DestinoViaje => ({
  id, nombre: 'Destino ' + id, imagenUrl: 'x.jpg', votes
});

describe('reducerDestinosViajes', () => {
  let estado: DestinosViajesState;

  beforeEach(() => {
    estado = { ...initializeDestinosViajesState(), items: [crear('a', 2), crear('b', 5)] };
  });

  it('NUEVO_DESTINO agrega un destino sin tocar el estado original', () => {
    const nuevo = reducerDestinosViajes(estado, new NuevoDestinoAction(crear('c')));
    expect(nuevo.items.length).toBe(3);
    expect(estado.items.length).toBe(2);
    expect(nuevo).not.toBe(estado);
  });

  it('BORRAR_DESTINO elimina solo el destino indicado', () => {
    const nuevo = reducerDestinosViajes(estado, new BorrarDestinoAction(crear('a')));
    expect(nuevo.items.length).toBe(1);
    expect(nuevo.items[0].id).toBe('b');
    expect(estado.items.length).toBe(2);
  });

  it('ELEGIDO_FAVORITO guarda el favorito', () => {
    const nuevo = reducerDestinosViajes(estado, new ElegidoFavoritoAction(crear('b')));
    expect(nuevo.favorito?.id).toBe('b');
    expect(estado.favorito).toBeNull();
  });

  it('VOTE_UP suma 1 solo al destino indicado', () => {
    const nuevo = reducerDestinosViajes(estado, new VoteUpAction(crear('a')));
    expect(nuevo.items[0].votes).toBe(3);
    expect(nuevo.items[1].votes).toBe(5);
    expect(estado.items[0].votes).toBe(2);
  });

  it('VOTE_DOWN resta 1 solo al destino indicado', () => {
    const nuevo = reducerDestinosViajes(estado, new VoteDownAction(crear('b')));
    expect(nuevo.items[0].votes).toBe(2);
    expect(nuevo.items[1].votes).toBe(4);
    expect(estado.items[1].votes).toBe(5);
  });

  it('RESET_VOTES deja todos los votos en 0', () => {
    const nuevo = reducerDestinosViajes(estado, new ResetVotesAction());
    expect(nuevo.items.every(d => d.votes === 0)).toBe(true);
    expect(estado.items[1].votes).toBe(5);
  });

  it('INIT_MY_DATA carga la lista inicial', () => {
    const nuevo = reducerDestinosViajes(initializeDestinosViajesState(), new InitMyDataAction([crear('z')]));
    expect(nuevo.items.length).toBe(1);
    expect(nuevo.items[0].id).toBe('z');
  });

  it('una acción desconocida devuelve el mismo estado', () => {
    expect(reducerDestinosViajes(estado, { type: 'otra' } as never)).toBe(estado);
  });
});

describe('reducerTracking', () => {
  it('TRACK_CLICK crea el contador en 1 la primera vez', () => {
    const nuevo = reducerTracking(initializeTrackingState(), new TrackClickAction('borrar'));
    expect(nuevo.tags['borrar']).toBe(1);
  });

  it('TRACK_CLICK incrementa el contador de la misma etiqueta', () => {
    let estado = reducerTracking(initializeTrackingState(), new TrackClickAction('borrar'));
    estado = reducerTracking(estado, new TrackClickAction('borrar'));
    expect(estado.tags['borrar']).toBe(2);
  });

  it('las etiquetas llevan contadores independientes y no mutan el estado anterior', () => {
    const base = reducerTracking(initializeTrackingState(), new TrackClickAction('a'));
    const nuevo = reducerTracking(base, new TrackClickAction('b'));
    expect(nuevo.tags['a']).toBe(1);
    expect(nuevo.tags['b']).toBe(1);
    expect(base.tags['b']).toBeUndefined();
  });
});