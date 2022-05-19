import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUserInfo {
    id?:string,
    username?:string,
    email?:string,
    phoneNumber?:number,
    address?:string,
    createAt?:string,
    updateAt?:string,
    isAdmin?:boolean,
    token:string
}

export interface IUserState {
    userInfo:IUserInfo
    isLogin: boolean
}

export const initialState: IUserState = {
    userInfo: {
        id:'',
        username:'',
        email:'',
        phoneNumber:0,
        address:"",
        createAt:"",
        token:""
    },
    isLogin:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUserInfo(state, action:PayloadAction<IUserInfo>) {
            state.userInfo = action.payload
        },
        setSwitchLogin(state, action:PayloadAction<boolean>) {
            state.isLogin = action.payload
        }
    }
})

export const { setUserInfo, setSwitchLogin } = userSlice.actions;

export default userSlice;
