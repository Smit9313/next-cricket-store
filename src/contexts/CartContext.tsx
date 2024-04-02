"use client"
import React, { createContext, useContext, useReducer } from 'react'

// Define the types for your state and actions
interface CartItem {
	id: string
	quantity: number
}

interface CartState {
	data: CartItem[]
}

interface AddAction {
	type: 'ADD'
	data: { id: string }
	qty: number
}

interface RemoveAction {
	type: 'REMOVE'
	data: { id: string }
}

type CartAction = AddAction | RemoveAction

const initialState: CartState = {
	data: JSON.parse(localStorage.getItem('cartData') || '[]') || [],
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case 'ADD': {
			const addedProduct = state.data.find((val) => val.id === action.data.id)
			if (addedProduct) {
				const updatedProducts = state.data.map((val) => {
					if (val.id === action.data.id) {
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
			const updatedProducts = state.data.filter((val) => val.id !== action.data.id)
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
			add: (product: { id: string }, qty: number) => void
			remove: (product: { id: string }) => void
	  }
	| undefined
>(undefined)

const CartProvider: React.FC<any> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState)

	const add = (product: { id: string }, qty: number) => {
		dispatch({ type: 'ADD', data: product, qty })
	}

	const remove = (product: { id: string }) => {
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
