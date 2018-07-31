import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux'
import { appReducer } from './redux/appReducer';
import { createRenderer } from 'fela';
import { Provider as FelaProvider } from 'react-fela';
import createSagaMiddleware from 'redux-saga';
import { appSaga } from './redux/appSaga';
import { Main } from './components/Main/Main';
const semanticUiCss = require('semantic-ui-css/semantic.min.css');
const logger: any = require('redux-logger').default;


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    appReducer,
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(appSaga);

const renderer = createRenderer();
renderer.renderStatic(semanticUiCss.toString());
renderer.renderStatic('body{background-color: #f7f7f7}');

const App = () => (
    <ReduxProvider store={store}>
        <FelaProvider renderer={renderer}>
            <Main/>
        </FelaProvider>
    </ReduxProvider>
);

export default App;
