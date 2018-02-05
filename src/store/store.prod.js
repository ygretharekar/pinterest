import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from '../compose/compose';

export default initialState => createStore(
	reducers,
	initialState,
	compose(applyMiddleware(thunk))
);