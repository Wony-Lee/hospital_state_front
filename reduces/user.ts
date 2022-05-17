import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUserInfo {
    id:string,
    username:string,
    email:string,
    phoneNumber:number,
    address:string,
    createAt:string,
    updateAt?:string,
    isAdmin?:boolean
}

export interface IUserState {
    userInfo:IUserInfo
}

export const initialState: IUserState = {
    userInfo: {
        id:'',
        username:'',
        email:'',
        phoneNumber:0,
        address:"",
        createAt:""
    }
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUserInfo(state, action:PayloadAction<IUserInfo>) {
            state.userInfo = action.payload
        }
    }
})

export const { setUserInfo } = userSlice.actions;

export default userSlice;
