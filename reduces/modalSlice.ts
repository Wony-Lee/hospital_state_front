import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IModalState {
    modalSwitch: boolean
}

export const initialState:IModalState = {
    modalSwitch:false
}


export const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        setModalOnOffSwitch(state, action:PayloadAction<boolean>) {
            state.modalSwitch = action.payload
        }
    }
})

export const { setModalOnOffSwitch } = modalSlice.actions

export default modalSlice
