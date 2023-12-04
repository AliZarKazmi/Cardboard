import { createSlice } from '@reduxjs/toolkit';

const boxState = createSlice({
    name: 'boxState',
    initialState: true,
    reducers:{
        setBoxState(state, action){
            return state = action.payload;
        }
    },
});

export default boxState.reducer ;

export const {setBoxState} = boxState.actions;