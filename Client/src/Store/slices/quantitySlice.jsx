import { createSlice } from '@reduxjs/toolkit';

const quantitySlice = createSlice({
    name: 'quantity',
    initialState: 500,
    reducers:{
        setQuantity(state, action){
            return state = action.payload;
        }
    },
});

export default quantitySlice.reducer ;

export const {setQuantity} = quantitySlice.actions;