import { create, GetState, SetState } from "zustand";
import { devtools, persist } from "zustand/middleware";

type nameSpace = {
  host?: string;
  user?: string;
  role?: string | object;
  auth?: string;
  width?: number;
  colors: object[];
  basicInfo: object[];
  imageSearch?: string[];
  notify?: { type: "error" | "success" | "warning"; text: string };
  userMobile?: string;
  activeSeller?: number;
};

let store = (set: SetState<nameSpace>, get: GetState<nameSpace>) => ({
  host: undefined,
  user: {},
  role: undefined,
  auth: undefined,
  width: undefined,
  imageSearch: [],
  notify: { type: "error", text: "" },
  userMobile: undefined,
  activeSeller: 0,
  setHost: (host?: string) => set({ host }),
  setUser: (user?: string) => set({ user }),
  setRole: (role?: string | object) => set({ role }),
  setAuth: (auth?: string) => set({ auth }),
  setColors: (colors: object[]) => set({ colors }),
  setBasicInfo: (basicInfo: object[]) => set({ basicInfo }),
  setWidth: (width: number) => set({ width }),
  setNotify: (notify?: {
    type: "error" | "success" | "warning";
    text: string;
  }) => set({ notify }),
  setImageSearch: (imageSearch?: string[]) => set({ imageSearch }),
  setUserMobile: (userMobile: string) => set({ userMobile }),
  setActiveSeller: (activeSeller: number) => set({ activeSeller }),
});

// @ts-ignore
store = devtools(store);
// @ts-ignore
export const useStore = create(store);
// @ts-ignore
export const useStorePersist = create(persist(store, { name: "shop" }));

// اگر آبجکت شما بیش از اندازه پیچیده باشد نیاز دارید برای اینکه بی مورد استیت کال نشود از این روش استفاده کنید
// برای اینکه مقایسه دو آبجکت به درستی انجام شود
export const useStorePersistShallow = <U,>(selector: (state: any) => U) =>
  useStorePersist(selector, (state: U, newState: U) => {
    const compare = JSON.stringify(state) === JSON.stringify(newState);
    // if (!compare) console.log("state", selector.toString());
    return compare;
  });

// @ts-ignore
export const getState = (key: string) => useStore.getState()[key];
// @ts-ignore
export const getStatePersist = (key: string) => useStorePersist.getState()[key];
