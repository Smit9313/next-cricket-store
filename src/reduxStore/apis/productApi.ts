import { API_BASE_URL } from '@/config/constants';
import baseCreateApi from '@/reduxStore/apis/baseCreateApi';

export const productApi = baseCreateApi.injectEndpoints({
	endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: `${API_BASE_URL}/products`,
				method: 'GET',
                params,
            }),
        }),
		getProductById: builder.query({
			query: (params) => ({
                url: `${API_BASE_URL}/products/${params.id}`,
				method: 'GET',
                params,
            }),
		})
    }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;