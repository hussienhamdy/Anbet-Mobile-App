import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(persistedReducer, compose(applyMiddleware(ReduxThunk)));
export default store;
