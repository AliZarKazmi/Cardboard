import { createSlice } from '@reduxjs/toolkit';

const canvasAsImg = createSlice({
    name: 'canvasAsImg',
    initialState: '',
    reducers:{
        changeCanvasImg(state, action){
            console.log(action.payload);
            return state = action.payload;
        }
    },
});

export default canvasAsImg.reducer ;

export const {changeCanvasImg} = canvasAsImg.actions;