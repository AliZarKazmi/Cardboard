import { createSlice } from '@reduxjs/toolkit';

const sizeSlice = createSlice({
    name: 'size',
    initialState: {
        length: 10,
        width: 10,
        depth: 10
    },
    reducers:{
        setSize(state, action){
            return state = action.payload; 
        }
    },
});

export default sizeSlice.reducer ;

export const {setSize} = sizeSlice.actions;