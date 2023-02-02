import App from './App.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
// import {Provider} from 'react-redux';
// import {configureStore} from './store';
// import {persistStore} from "redux-persist";
// import {PersistGate} from "redux-persist/integration/react";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

// const store = configureStore();
// const persistor = persistStore(store)

const container = document.getElementById('root');
const root = createRoot(container)

root.render(
    // <Provider store={store}>
    //     <PersistGate
    //         loading={<div>Loading...</div>}
    //         persistor={persistor}
    //     >
            <DevSupport
                ComponentPreviews={ComponentPreviews}
                useInitialHook={useInitial}
            >
                <App/>
            </DevSupport>
        // </PersistGate>
    // </Provider>,
    // document.getElementById('root'),
);