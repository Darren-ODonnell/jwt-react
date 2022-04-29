import App from './App.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store = configureStore();

const persistor = persistStore( store )

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate
            loading={ <div>Loading...</div> }
            persistor={ persistor }>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById( 'root' ),
);