export const SET_USER_INFO = "SET_USER_INFO" as const;

interface IUserInfo {
    id:string,
    name:string
}

export const setUserInfo = (userInfo: IUserInfo) => ({
    type:SET_USER_INFO,
    payload:userInfo
});

export interface IUserState {
    userInfo:IUserInfo
}

export const initialState: IUserState = {
    userInfo:{
        id:'',
        name:''
    }
}

export type UserAction = | ReturnType<typeof setUserInfo>

const reducer = (state = initialState, action:UserAction):IUserState => {
    switch(action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
