import { applyMiddleware, createStore, compose } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from '../reduces'

const configureStore = () => {
    const middleware: any[] = [];
    const enhancer =
        process.env.NODE_ENV === "production"
            ? compose(applyMiddleware(...middleware))
            : composeWithDevTools(applyMiddleware(...middleware));
    const store = createStore(reducer, enhancer);
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV !== "production",
});

export default wrapper;
