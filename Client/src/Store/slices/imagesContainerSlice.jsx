import { createSlice } from '@reduxjs/toolkit';

const imagesContainer = createSlice({
    name: 'images',
    initialState: '',
    reducers:{
        imagesCollector(state, action){
            return state = action.payload;
        }
    }, 
});

export default imagesContainer.reducer ;

export const {imagesCollector} = imagesContainer.actions;