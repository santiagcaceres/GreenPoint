import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  geneticId: string
  geneticName: string
  geneticSlug: string
  modality: "maceta" | "domo"
  quantity: number
  unitPrice: number
  imageUrl: string
}

type CartStore = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (geneticId: string, modality: string) => void
  updateQuantity: (geneticId: string, modality: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const quantity = item.quantity || 1
        set((state) => {
          const existingItem = state.items.find((i) => i.geneticId === item.geneticId && i.modality === item.modality)

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.geneticId === item.geneticId && i.modality === item.modality
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            }
          }

          return {
            items: [...state.items, { ...item, quantity }],
          }
        })
      },

      removeItem: (geneticId, modality) => {
        set((state) => ({
          items: state.items.filter((item) => !(item.geneticId === geneticId && item.modality === modality)),
        }))
      },

      updateQuantity: (geneticId, modality, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.geneticId === geneticId && item.modality === modality ? { ...item, quantity } : item,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
      },
    }),
    {
      name: "greenpoint-cart",
    },
  ),
)
