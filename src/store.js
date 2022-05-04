import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { club } from './entities/Clubs/reducer'


import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const reducers = {
    club,
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers( reducers );

const persistedReducer = persistReducer( persistConfig, rootReducer );

export const configureStore = () => createStore(
    persistedReducer,
    // enables interaction with Redux devtools
    composeWithDevTools( applyMiddleware( thunk ) )
);