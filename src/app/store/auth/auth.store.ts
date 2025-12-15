// auth.store.ts
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

const STORAGE_KEY = 'user';

function getInitialAuth(): AuthResponse {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as AuthResponse;
    } catch {
      console.warn('❌ Error parsing auth from localStorage');
    }
  }
  return {
    id: 0,
    username: '',
    is_active: false,
    image: '',
    roles: []
  };
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<AuthResponse>(getInitialAuth()),
  withMethods((store) => ({
    setResponse(response: AuthResponse) {
      patchState(store, () => ({ ...response }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response));
    },
    updateImage(url: string){
      patchState(store, () => ({ image: url }));
      const local = localStorage.getItem(STORAGE_KEY)
      if(local != null && local != undefined){
        let data = JSON.parse( localStorage.getItem(STORAGE_KEY)! );
        data['image'] = url
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }

    },
    clear() {
      patchState(store, () => ({
        id: 0,
        username: '',
        is_active: false,
        roles: [],
        image: ''
      }));
      localStorage.removeItem(STORAGE_KEY);
    }
  }))
);
