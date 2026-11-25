import { Action } from '@ngrx/store';

export interface TrackingState {
  tags: { [tag: string]: number };
}

export const initializeTrackingState = (): TrackingState => ({ tags: {} });

export enum TrackingActionTypes {
  TRACK_CLICK = '[Tracking] Click'
}

export class TrackClickAction implements Action {
  readonly type = TrackingActionTypes.TRACK_CLICK;
  constructor(public tag: string) {}
}

export type TrackingActions = TrackClickAction;

export function reducerTracking(
  state: TrackingState = initializeTrackingState(),
  action: TrackingActions
): TrackingState {
  switch (action.type) {
    case TrackingActionTypes.TRACK_CLICK:
      return {
        ...state,
        tags: { ...state.tags, [action.tag]: (state.tags[action.tag] ?? 0) + 1 }
      };
    default:
      return state;
  }
}