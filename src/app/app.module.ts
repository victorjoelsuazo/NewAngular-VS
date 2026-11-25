import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MapComponent, MarkerComponent, PopupComponent, provideMapboxGL } from 'ngx-mapbox-gl';

import { App } from './app';
import { APP_CONFIG, APP_CONFIG_VALUE } from './app-config';
import { AuthService, LocalAuthService } from './auth/auth.service';
import { usuarioLogueadoGuard } from './auth/usuario-logueado.guard';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { LoginComponent } from './login/login.component';
import { MapaComponent } from './mapa/mapa.component';
import { TrackearClickDirective } from './trackear-click.directive';
import { reducers, DestinosViajesEffects } from './models/destinos-viajes-state.model';
import { DestinosApiClient, DestinosApiClientViejo } from './models/destinos-api-client.model';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ListaDestinosComponent, canActivate: [usuarioLogueadoGuard] }
];

@NgModule({
  declarations: [
    App,
    DestinoViajeComponent,
    ListaDestinosComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    MapaComponent,
    TrackearClickDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(),
    MapComponent,
    MarkerComponent,
    PopupComponent
  ],
  providers: [
    provideHttpClient(),
    provideMapboxGL({ accessToken: 'TU_TOKEN_PK' }),
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    { provide: AuthService, useClass: LocalAuthService },
    DestinosApiClient,
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient },
    provideAppInitializer(() => inject(DestinosApiClient).cargarDesdeDexie())
  ],
  bootstrap: [App]
})
export class AppModule {}