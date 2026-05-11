import { useMemo } from "react";

type TelegramWebApp = {
  initData?: string;
  initDataUnsafe?: { user?: { id?: number; username?: string } };
  ready: () => void;
  expand: () => void;
  MainButton: {
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export const useTelegram = () => {
  return useMemo(() => {
    const webApp = window.Telegram?.WebApp;
    if (webApp) {
      webApp.ready();
      webApp.expand();
    }
    return {
      webApp,
      userId: webApp?.initDataUnsafe?.user?.id ?? 0
    };
  }, []);
};
