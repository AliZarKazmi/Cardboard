import { createSlice } from '@reduxjs/toolkit';

const selectedMaterial = createSlice({
    name: 'selectedMaterial',
    initialState: 'kraft',
    reducers:{
        setSelectedMaterial(state, action){
            return state = action.payload;
        }
    },
});

export default selectedMaterial.reducer ;

export const {setSelectedMaterial} = selectedMaterial.actions;