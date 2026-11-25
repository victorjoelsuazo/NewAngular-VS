import { Directive, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { AppState } from './models/destinos-viajes-state.model';
import { TrackClickAction } from './models/tracking-state.model';

@Directive({
  selector: '[appTrackearClick]',
  standalone: false
})
export class TrackearClickDirective {
  private element: HTMLElement;

  constructor(private elRef: ElementRef, private store: Store<AppState>) {
    this.element = elRef.nativeElement;
    fromEvent(this.element, 'click').subscribe(() => {
      const tags = this.element.getAttribute('data-trackear-tags')?.split(' ') ?? [];
      tags.filter(t => t).forEach(t => this.store.dispatch(new TrackClickAction(t)));
    });
  }
}