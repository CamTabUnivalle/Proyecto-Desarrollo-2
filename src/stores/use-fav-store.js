import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavStore = create(
  persist(
    (set) => ({
      favoritos: {},
      setFavorito: (productName, value) =>
        set((state) => ({
          favoritos: {
            ...state.favoritos,
            [productName]: value,
          },
        })),
      limpiarFavoritos: () => set({ favoritos: {} }),
    }),
    {
      name: "favoritos-storage",
    }
  )
);

export default useFavStore;
