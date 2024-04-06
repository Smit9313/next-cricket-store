'use client'
import cartReducer from '@/reduxStore/slices/cartSlice';

const rootReducer = {
	cart: cartReducer,
}

export default rootReducer
