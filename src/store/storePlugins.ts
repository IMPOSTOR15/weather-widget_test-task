import { Store } from 'vuex';
import { State } from './index';

export function saveCitiesPlugin(store: Store<State>) {
  store.subscribe((mutation, state) => {
    if (
      mutation.type === 'ADD_CITY' ||
      mutation.type === 'REMOVE_CITY' ||
      mutation.type === 'SET_CITIES'
    ) {
      localStorage.setItem('cities', JSON.stringify(state.cities));
    }
  });
}
