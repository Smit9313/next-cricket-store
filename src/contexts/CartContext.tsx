'use client'
import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface CartProviderProps {
	children: ReactNode
}
// Define the types for your state and actions
export interface CartItem {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
	quantity?: number;
}

interface CartState {
	data: CartItem[]
}

interface AddAction {
	type: 'ADD'
	data: CartItem
	qty: number
}

interface RemoveAction {
	type: 'REMOVE'
	data: CartItem
}

type CartAction = AddAction | RemoveAction

const initialState: CartState = {
	data: JSON.parse(localStorage.getItem('cartData') || '[]') || [],
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case 'ADD': {
			const addedProduct = state.data.find((val: CartItem) => val.id === action.data.id)
			if (addedProduct) {
				const updatedProducts = state.data.map((val: CartItem) => {
					if (val.id === action.data.id && val.quantity) {
						return { ...val, quantity: val.quantity + action.qty }
					} else {
						return val
					}
				})
				localStorage.setItem('cartData', JSON.stringify(updatedProducts))
				return { ...state, data: updatedProducts }
			} else {
				const newProduct = { ...action.data, quantity: action.qty }
				const updatedData = [...state.data, newProduct]
				localStorage.setItem('cartData', JSON.stringify(updatedData))
				return { ...state, data: updatedData }
			}
		}
		case 'REMOVE': {
			const updatedProducts = state.data.filter((val: CartItem) => +val.id !== +action.data.id)
			localStorage.setItem('cartData', JSON.stringify(updatedProducts))
			return { ...state, data: updatedProducts }
		}
		default:
			return state
	}
}

const CartContext = createContext<
	| {
			data: CartState['data']
			add: (product: CartItem, qty: number) => void
			remove: (product: CartItem) => void
	  }
	| undefined
>(undefined)

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState)

	const add = (product: CartItem, qty: number) => {
		dispatch({ type: 'ADD', data: product, qty })
	}

	const remove = (product: any) => {
		dispatch({ type: 'REMOVE', data: product })
	}

	return <CartContext.Provider value={{ data: state.data, add, remove }}>{children}</CartContext.Provider>
}

const useCartContext = () => {
	const context = useContext(CartContext)
	if (!context) {
		throw new Error('useCartContext must be used within a CartProvider')
	}
	return context
}

export { CartProvider, useCartContext }
