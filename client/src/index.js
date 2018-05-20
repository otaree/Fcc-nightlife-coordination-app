import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './Components/App';
import authReducer from './store/reducer/auth';
import * as authActions from './store/actions/auth';
import "../node_modules/bulma/css/bulma.min.css";
import './index.css';

const store = createStore(authReducer);

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
renderApp();
