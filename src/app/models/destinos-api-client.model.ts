import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { APP_CONFIG, AppConfig } from '../app-config';
import { DestinoViaje } from './destino-viaje.model';
import { AppState, InitMyDataAction, NuevoDestinoAction } from './destinos-viajes-state.model';
import { MyDatabase } from './my-database.model';

export class DestinosApiClientViejo {
  getById(id: string): Promise<DestinoViaje | undefined> {
    console.log('llamando por la clase vieja!');
    return Promise.resolve(undefined);
  }
}

@Injectable()
export class DestinosApiClient extends DestinosApiClientViejo {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private db: MyDatabase,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    super();
  }

  add(d: DestinoViaje) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.config.apiEndpoint + '/api/destinos', d, { headers }).subscribe({
      next: async () => {
        this.store.dispatch(new NuevoDestinoAction(d));
        await this.db.destinos.add({ ...d });
      },
      error: err => console.error('No se pudo agregar en el API', err)
    });
  }

  async cargarDesdeDexie(): Promise<void> {
    const destinos = await this.db.destinos.toArray();
    this.store.dispatch(new InitMyDataAction(destinos));
  }

  override getById(id: string): Promise<DestinoViaje | undefined> {
    return this.db.destinos.get(id);
  }
}