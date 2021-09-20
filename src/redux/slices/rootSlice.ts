import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        hero_name: 'Who Knows?',
        real_name: "Who Knows?",
        description: "Who Knows?",
        comics_appeared_in: 1,
        super_power: 'Who Knows?',
    },
    reducers: {
        chooseIdentity: (state, action) => { state.hero_name = action.payload},
        chooseName: (state, action) => { state.real_name = action.payload},
        chooseDesc: (state, action) => { state.description = action.payload },
        chooseComics: (state, action) => { state.comics_appeared_in = action.payload},
        choosePower: (state, action) => { state.super_power = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseIdentity, chooseComics, chooseDesc, choosePower } = rootSlice.actions;