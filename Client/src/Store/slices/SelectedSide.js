import { createSlice } from '@reduxjs/toolkit';

const selectedSide = createSlice({
    name: 'selectedSide',
    initialState: '',
    reducers:{
        setSelectedSide(state, action){
            return state = action.payload;
        }
    },
});

export default selectedSide.reducer ;

export const {setSelectedSide} = selectedSide.actions;