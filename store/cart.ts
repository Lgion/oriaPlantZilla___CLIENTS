import { create } from 'zustand';
import { CartItem, Product } from '@/types/product';

interface CartStore {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  applyPromoCode: (code: string) => void;
  clearCart: () => void;
  total: () => number;
  totalWithDiscount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  promoCode: null,
  promoDiscount: 0,

  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ),
    }));
  },

  applyPromoCode: (code) => {
    // Simple promo code logic - could be expanded
    const promoDiscounts: Record<string, number> = {
      'SPRING2024': 0.1,
      'SUMMER2024': 0.15,
    };

    set({
      promoCode: code,
      promoDiscount: promoDiscounts[code] || 0,
    });
  },

  clearCart: () => {
    set({ items: [], promoCode: null, promoDiscount: 0 });
  },

  total: () => {
    return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  totalWithDiscount: () => {
    const total = get().total();
    return total * (1 - get().promoDiscount);
  },
}));