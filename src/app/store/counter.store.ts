import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface CounterState { count: number }

export const CounterStore = signalStore(
  withState<CounterState>({ count: 0 }),
  withMethods(store => ({
    increment() {
      patchState(store, s => ({ count: s.count + 1 }));
    },
    decrement() {
      patchState(store, s => ({ count: s.count - 1 }));
    },
    reset() {
      patchState(store, { count: 0 });
    }
  }))
);