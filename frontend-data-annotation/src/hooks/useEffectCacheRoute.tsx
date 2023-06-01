import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

class EventBus {
  allEvent: { [key: string]: any } = {};

  removeEventListener(eventName: string, callback: any) {
    window.removeEventListener(eventName, callback);
    this.allEvent[eventName] = undefined;
  }

  addEventListener(eventName: string, callback: any) {
    if (this.allEvent[eventName]) {
      this.removeEventListener(eventName, this.allEvent[eventName]);
    }
    this.allEvent[eventName] = callback;
    window.addEventListener(eventName, callback);
  }

  dispatchEvent(name: string) {
    window.dispatchEvent(new CustomEvent(name));
  }
}

const eventBus = new EventBus();

function useEffectCacheRoute(callback: () => void) {
  const { pathname } = useLocation();
  useEffect(() => {
    eventBus.addEventListener(pathname, callback);
    return () => eventBus.removeEventListener(pathname, callback);
  }, [callback, pathname]);
}

export function useDispatchEvent() {
  const { pathname } = useLocation();
  const dispatchEvent = useCallback(() => {
    eventBus.dispatchEvent(pathname);
  }, [pathname]);

  return dispatchEvent;
}

export default useEffectCacheRoute;
