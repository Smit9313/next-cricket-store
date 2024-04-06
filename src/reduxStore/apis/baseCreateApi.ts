import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	FetchBaseQueryError,
	fetchBaseQuery,
	retry,
  } from "@reduxjs/toolkit/query/react";
  import { API_BASE_URL } from "@/config/constants";
  
  const baseQuery = fetchBaseQuery({
	baseUrl: API_BASE_URL,
	mode: "cors",
	credentials: "include",
	prepareHeaders: () => {
	  // Add logic here to prepare headers
	},
  });
  
  const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
  > = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
	  // handle error
	}
	return result;
  };
  
  const baseCreateApi = createApi({
	reducerPath: "api",
	baseQuery: retry(baseQueryWithReauth, { maxRetries: 0 }),
	endpoints: () => ({}),
  });
  
  export default baseCreateApi;
  