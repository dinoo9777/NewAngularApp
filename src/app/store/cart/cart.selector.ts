import { createFeatureSelector, createSelector } from "@ngrx/store";
import  {CartItem} from './cart.reducer';

export const selectCart = createFeatureSelector<CartItem[]>('cart');

export const selectCartTotal = createSelector(
    selectCart,
    (cart) => cart.reduce((total, item) => total + item.price * item.quantity, 0)
)
