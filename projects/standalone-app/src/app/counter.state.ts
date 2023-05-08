import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  on,
} from '@ngrx/store';

export const counterPageActions = createActionGroup({
  source: 'Counter Page',
  events: {
    incrementCount1: emptyProps(),
    incrementCount2: emptyProps(),
  },
});

export const counterFeature = createFeature({
  name: 'counter',
  reducer: createReducer(
    { count1: 0, count2: 0 },
    on(counterPageActions.incrementCount1, (state) => ({
      ...state,
      count1: state.count1 + 1,
    })),
    on(counterPageActions.incrementCount2, (state) => ({
      ...state,
      count2: state.count2 + 1,
    }))
  ),
});
