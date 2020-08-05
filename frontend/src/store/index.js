import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

const composeEnhancers = null || compose;

const store = createStore(
    reducers, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store