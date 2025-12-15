// auth.store.ts
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface MenuInterface {
  logoUrl: string,
  translate: boolean,
  darkmode: boolean,
  appUrl: string,
  toggle: boolean
}

function getInitialAuth(): MenuInterface {
  return {
    logoUrl: "/logo.png",
    translate: false,
    darkmode: false,
    appUrl: "/images/principal/app-screen-es.png",
    toggle: false
  };
}

export const MenuStore = signalStore(
  { providedIn: 'root' },
  withState<MenuInterface>(getInitialAuth()),
  withMethods((store) => ({
    setTransalte(value: boolean) {
      patchState(store, () => ({ 
        translate: value, 
        appUrl: !store.darkmode()
          ? !value ? '/images/principal/app-screen-es.png' : '/images/principal/app-screen-en.png' 
          : !value ? '/images/principal/app-dark-es.png' : '/images/principal/app-dark-en.png'
      }));
    },
    setDarkMode(value: boolean) {
      patchState(store, () => ({ 
        darkmode: value, 
        logoUrl: !value ? '/logo.png' : '/logo-white.png',
        appUrl: !value
          ? !store.translate() ? '/images/principal/app-screen-es.png' : '/images/principal/app-screen-en.png' 
          : !store.translate() ? '/images/principal/app-dark-es.png' : '/images/principal/app-dark-en.png'
      }));
    },
    setToggle(value: boolean) {
      patchState(store, () => ({ 
        toggle: value, 
      }));
    },
  }))
);
