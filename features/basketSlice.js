import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect';

const initial = {
  items: []
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState: initial,
  reducers: {
    addToBasket: (state, action) => {

      let oldMealTable = state.items.find(i => i.meal === action.payload.meal)
      if (oldMealTable){
        // just modify old item count++
        oldMealTable.count++;
        oldMealTable.UserExtras = action.payload.UserExtras
        console.log(oldMealTable.UserExtras)

      }else 
      {
        let newItem = action.payload
        newItem.count = 1
        state.items = [...state.items, newItem]
      }
      

    },
    removeFromBasket: (state, action) => {
      const indexToRemove = state.items.findIndex(item => item.meal === action.payload);
      
      // Remove the item if found
      if (indexToRemove !== -1) {
        if (state.items[indexToRemove].count <= 1){
          state.items.splice(indexToRemove, 1);
        }else 
        {
          state.items[indexToRemove].count--;
        }
      }
    },

    clearBasket: (state, actions) => {
      state.items = []
    }
  }
})

export const selectBasketItems = state => state.basket.items

export const selectBasketItemsById = createSelector(
  [selectBasketItems, (_, id) => id],
  (items, id) => items.filter(item => item._id === id)
);

export const selectBasketItemsByMeal = createSelector(
  [selectBasketItems, (_, meal) => meal],
  (items, meal) => items.filter(item => item.meal === meal)
);


export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions

export default basketSlice.reducer