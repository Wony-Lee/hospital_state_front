import { AnyAction, CombinedState, combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import user, {IUserState} from './userReducer'

const rootReducer = (
    state: IState | undefined,
    action: AnyAction
): CombinedState<IState> => {
    switch (action.type) {
        case HYDRATE:
            return { ...action.payload };
        default: {
            const combineReducer = combineReducers({
                user
            });
            return combineReducer(state, action as any);
        }
    }
};

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

interface IState {
    user:IUserState
}
