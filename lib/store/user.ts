import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  name: string;
  email: string;
  /** `null` = has an account and is logged in, but hasn't chosen a plan yet. */
  plan: string | null;
}

interface UserState {
  user: User | null;
  /** Becomes `true` as soon as the saved state (localStorage) finishes loading on the client. */
  hydrated: boolean;
  login: (user: User) => void;
  logout: () => void;
  choosePlan: (plan: string) => void;
  setHydrated: (value: boolean) => void;
}

/**
 * The project doesn't have a real backend/authentication yet — `login()`
 * stores this example user instead of validating real credentials. `plan:
 * null` simulates someone with an account but no agency/plan linked yet —
 * login/cadastro land on /onboarding instead of /visao-geral. Set a plan id
 * (e.g. "advanced") here to simulate an existing subscribed customer instead.
 */
export const EXAMPLE_USER: User = {
  name: "Marina Rocha",
  email: "marina@ancoraimoveis.com.br",
  plan: null,
};

/**
 * Credentials the login screen accepts, just so there's something real to
 * type and test the flow (without this, any text would log in). Not part
 * of `User` — it's only the fake "database" for validation.
 */
export const EXAMPLE_CREDENTIALS = {
  email: EXAMPLE_USER.email,
  password: "visitaja123",
};

// No real localStorage exists during build/SSR (Node) — an empty storage
// avoids touching it outside the browser, without affecting client hydration.
const clientStorage = createJSONStorage(() =>
  typeof window === "undefined"
    ? {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      }
    : localStorage,
);

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      choosePlan: (plan) =>
        set((state) => (state.user ? { user: { ...state.user, plan } } : state)),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "visitaja:user",
      storage: clientStorage,
      // Only the user is saved — `hydrated` always starts false and actions aren't data.
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);

/** Shortcut for screens that only need to know whether there's a session. */
export function useIsLoggedIn() {
  return useUserStore((state) => state.user !== null);
}

/** Shortcut for screens that only need to know whether a plan was already chosen. */
export function useHasPlan() {
  return useUserStore((state) => state.user?.plan != null);
}
