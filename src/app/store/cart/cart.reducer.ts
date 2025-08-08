import { createReducer, on } from '@ngrx/store';
import { addItem, clearCart, removeItem } from './cart.action';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => {
    const existingItem = state.find(i => i.id === item.id);
    if (existingItem) {
      return state.map(i =>
        i.id === existingItem.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    }
    return [...state, item];
  }),
  on(removeItem, (state, { id }) => state.filter(item => item.id !== id)),
  on(clearCart, () => [])
);
