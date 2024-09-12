import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: ''
    }),
    endpoints: builder => ({
        getList: builder.query({
            query: () => '/home'
        })
        })
    })

    export const {useGetListQuery} = apiSlice
    