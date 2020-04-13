//#region imports 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';
import { ExampleAppContainer } from './ExampleApp';
//#endregion

//#region 
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(epicMiddleware)
));

epicMiddleware.run(rootEpic);
//#endregion

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ExampleAppContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
