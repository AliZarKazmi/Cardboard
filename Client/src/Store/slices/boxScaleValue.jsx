import { createSlice } from '@reduxjs/toolkit';

const boxScaleValue = createSlice({
    name: 'size',
    initialState: {},
    reducers:{
        setBoxScaleValue(state, action){
            return state = action.payload; 
        }
    },
});

export default boxScaleValue.reducer ;

export const {setBoxScaleValue} = boxScaleValue.actions;