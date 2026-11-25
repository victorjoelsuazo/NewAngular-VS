import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  standalone: false,
  template: `
    <mgl-map [style]="'mapbox://styles/mapbox/streets-v12'" [zoom]="12" [center]="[2.3522, 48.8566]">
      <mgl-marker #marker [lngLat]="[2.3522, 48.8566]"></mgl-marker>
      <mgl-popup [marker]="marker">Destino de ejemplo: París</mgl-popup>
    </mgl-map>
  `,
  styles: [`mgl-map { display: block; height: 400px; width: 100%; }`]
})
export class MapaComponent {}