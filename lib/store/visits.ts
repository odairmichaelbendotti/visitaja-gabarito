import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Visit {
  id: string;
  propertySlug: string;
  /** E-mail of the corretor to credit — comes from the `corretor` param on the public link, so a visit is attributed to whoever shared it, not just the property's listed agent. */
  agentEmail: string;
  weekday: string;
  day: number;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: "confirmed" | "pending";
  createdAt: string;
}

interface VisitsState {
  visits: Visit[];
  hydrated: boolean;
  addVisit: (
    visit: Omit<Visit, "id" | "createdAt" | "status">,
  ) => void;
  setHydrated: (value: boolean) => void;
}

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

/**
 * The project doesn't have a real backend/database yet — this store simulates
 * the "visits" table. `BookingForm` (public /imovel/[slug] page) writes to it
 * when a client schedules a visit, and dashboard screens (Próximas visitas,
 * the imóvel detail modal's Histórico de visitas) read from it alongside
 * their static example rows.
 */
export const useVisitsStore = create<VisitsState>()(
  persist(
    (set) => ({
      visits: [],
      hydrated: false,
      addVisit: (visit) =>
        set((state) => ({
          visits: [
            {
              ...visit,
              id: `${visit.propertySlug}-${Date.now()}`,
              status: "pending",
              createdAt: new Date().toISOString(),
            },
            ...state.visits,
          ],
        })),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "visitaja:visits",
      storage: clientStorage,
      partialize: (state) => ({ visits: state.visits }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
