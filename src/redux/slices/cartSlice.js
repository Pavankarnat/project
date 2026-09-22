import { createSlice } from "@reduxjs/toolkit";

const getCartStorageKey = (username) => `pizzeria_cart${username || "guest"}`;

const loadUserCart = (username) => {
  if (!username) return [];

  try {
    const saved = localStorage.getItem(getCartStorageKey(username));
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveUserCart = (username, items) => {
  if (username) {
    localStorage.setItem(getCartStorageKey(username), JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    activeUserKey: null,
  },
  reducers: {
    syncUserCart: (state, action) => {
      const username = action.payload;
      state.activeUserKey = username;
      state.items = username ? loadUserCart(username) : [];
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      saveUserCart(state.activeUserKey, state.items);
    },
    addOrderItems: (state, action) => {
      action.payload.forEach((orderItem) => {
        const existingItem = state.items.find(
          (item) => item.id === orderItem.id
        );

        if (existingItem) {
          existingItem.quantity += orderItem.quantity;
        } else {
          state.items.push({ ...orderItem });
        }
      });

      saveUserCart(state.activeUserKey, state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (quantity > 0) {
          existingItem.quantity = quantity;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
        }

        saveUserCart(state.activeUserKey, state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveUserCart(state.activeUserKey, state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveUserCart(state.activeUserKey, state.items);
    },
  },
});

export const {
  syncUserCart,
  addToCart,
  addOrderItems,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalAmount = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
