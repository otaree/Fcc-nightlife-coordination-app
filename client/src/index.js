import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './Components/App';
import authReducer from './store/reducer/auth';
import businessReducer from './store/reducer/business';
import * as authActions from './store/actions/auth';
import * as businessActions from './store/actions/business';
import "../node_modules/bulma/css/bulma.min.css";
import './index.css';

const rootReducer = combineReducers({
    auth: authReducer,
    business: businessReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

let hasRender = false;

const renderApp = () => {
    if (!hasRender) {
        ReactDOM.render(jsx, document.getElementById("root"));
        hasRender = true;
    }
};


ReactDOM.render(<p className="title has-text-centered">Loading...</p>, document.getElementById("root"));

store.dispatch(authActions.authInit());
store.dispatch(businessActions.businessInit());
renderApp();
