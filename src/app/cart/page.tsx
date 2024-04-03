'use client'
import React from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

import { CartItem, useCartContext } from '@/contexts/CartContext'

const Cart = () => {
	const { add, data, remove } = useCartContext()

	const totalAmount = data.reduce((acc: number, curr: CartItem) => acc + curr.price * curr.quantity, 0)

	const handleRemove = (val: CartItem) => {
		remove(val)
		toast.success(`${val.title} has been removed from your cart.`)
	}

	return (
		<>
			{data.length > 0 ? (
				<div className="h-screen bg-gray-100 pt-20">
					<h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
					<div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
						<div className="rounded-lg md:w-2/3">
							{data.map((val: CartItem, index: number) => {
								return (
									<div
										className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
										key={index}
									>
										<img
											src={val.thumbnail}
											alt="product-imae"
											className="w-full rounded-lg sm:w-40"
										/>
										<div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
											<div className="mt-5 sm:mt-0">
												<h2 className="text-lg font-bold text-gray-900">{val.title}</h2>
												<p className="mt-1 text-xs text-gray-700">
													{val.category} | {val.brand}
												</p>
											</div>
											<div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
												<div className="flex items-center border-gray-100">
													<button
														className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
														onClick={() => val.quantity > 1 && add(val, -1)}
														disabled={val.quantity === 1}
													>
														{' '}
														-{' '}
													</button>
													<input
														className="h-8 w-8 bg-white text-center text-xs outline-none"
														type="number"
														value={val.quantity}
														min="1"
														disabled
													/>
													<button
														className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
														onClick={() => val.quantity < 10 && add(val, 1)}
													>
														{' '}
														+{' '}
													</button>
												</div>
												<div className="flex items-center space-x-4">
													<p className="text-sm">{val.price} $</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
														onClick={() => handleRemove(val)}
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M6 18L18 6M6 6l12 12"
														/>
													</svg>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>

						<div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
							<div className="flex justify-between">
								<p className="text-lg font-bold">Total</p>
								<div className="">
									<p className="mb-1 text-lg font-bold">$ {totalAmount}</p>
								</div>
							</div>
							<button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-screen">
					<p className="text-2xl font-semibold mb-4">Cart is empty</p>
					<Link
						href="/"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Shop Now
					</Link>
				</div>
			)}
		</>
	)
}

export default Cart
