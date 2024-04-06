'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

import { CartItem } from '@/contexts/CartContext'
import Loader from '@/components/Loader'
import { addToCart } from '@/reduxStore/slices/cartSlice'
import { useGetProductByIdQuery } from '@/reduxStore/apis/productApi'

const ProductDetails = ({ params }: { params: { id: string } }) => {
	const dispatch = useDispatch();
	const { data: product, isLoading, isError } = useGetProductByIdQuery({id: params.id})
	const [image, setImage] = useState<string>('')

	const handleAddToCart = (product: CartItem, qty: number) => {
		dispatch(addToCart({product, qty}))
		toast.success(`${product.title} has been added to your cart.`)
	}

	if (isLoading) {
		return <Loader />
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<p className="text-2xl font-semibold mb-4">{isError}</p>
			</div>
		)
	}

	return (
		<div className="font-[sans-serif] bg-white">
			<div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
				{product && (
					<div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
						<div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
							<div className="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
								<img
									src={image || product.images[0]}
									alt="Product"
									className="w-full h-80 rounded object-cover"
								/>
							</div>
							<div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
								{product?.images?.map((val: string, index: number) => {
									return (
										<div
											className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]"
											key={index}
											onClick={() => setImage(val)}
										>
											<img
												src={val}
												alt="Product2"
												className="w-24 object-cover object-center cursor-pointer"
											/>
										</div>
									)
								})}
							</div>
						</div>
						<div className="lg:col-span-2">
							<h2 className="text-2xl font-extrabold text-[#333]">
								{product.title} | {product.category}
							</h2>
							<div className="flex flex-wrap gap-4 mt-6">
								<p className="text-[#333] text-4xl font-bold">${product.price}</p>
							</div>
							<div className="flex flex-wrap gap-4 mt-6">
								<p className="text-[#333]">${product.description}</p>
							</div>
							<div className="mt-10">
								<button
									type="button"
									className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-bold rounded"
									onClick={() => handleAddToCart(product, 1)}
								>
									Add to cart
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default ProductDetails
