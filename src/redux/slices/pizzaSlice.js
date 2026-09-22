import { createSlice } from '@reduxjs/toolkit';

export const BASE_PRICE = 200;

const pizzaSlice = createSlice({
  name: 'pizzaBuilder',
  initialState: {
    selectedIngredients: [], 
  },
  reducers: {
    incrementIngredient: (state, action) => {
      const ingredient = action.payload; // { id, tname, price, image }
      const existing = state.selectedIngredients.find((i) => i.id === ingredient.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.selectedIngredients.push({ ...ingredient, qty: 1 });
      }
    },
    decrementIngredient: (state, action) => {
      const id = action.payload;
      const existing = state.selectedIngredients.find((i) => i.id === id);
      if (!existing) return;
      if (existing.qty <= 1) {
        state.selectedIngredients = state.selectedIngredients.filter((i) => i.id !== id);
      } else {
        existing.qty -= 1;
      }
    },
    resetBuilder: (state) => {
      state.selectedIngredients = [];
    },
  },
});

export const { incrementIngredient, decrementIngredient, resetBuilder } = pizzaSlice.actions;

export const selectSelectedIngredients = (state) => state.pizzaBuilder.selectedIngredients;

export const selectBuilderTotalCost = (state) =>
  BASE_PRICE +
  state.pizzaBuilder.selectedIngredients.reduce((sum, item) => sum + item.price * item.qty, 0);

export default pizzaSlice.reducer;