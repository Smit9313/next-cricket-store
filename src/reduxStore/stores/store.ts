import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import baseCreateApi from '@/reduxStore/apis/baseCreateApi';
import rootReducer from '@/reduxStore/stores/rootReducer';

const reducers = combineReducers({
    [baseCreateApi.reducerPath]: baseCreateApi.reducer,
    ...rootReducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(baseCreateApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
