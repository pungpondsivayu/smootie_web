import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
 
export const BaseApi = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl : import.meta.env.VITE_BASE_URL
    }),
    tagTypes: ["Branch" , "Category" , "Menu" , "Ingredient" , "Role" , "Employee"],
    endpoints : builder => ({})
})