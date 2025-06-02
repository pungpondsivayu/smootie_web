import { BaseApi } from "../helper/controller/ConfigQuery";

interface IngredientProps {
  pageSize: number;
  currentPage: number;
}

export const IngredientController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetIngredient: builder.query({
      query: ({ pageSize, currentPage }: IngredientProps) => ({
        url: "Ingredient/GetAllIngredient",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          pageSize,
          currentPage,
        },
      }),
      providesTags: ["Ingredient"],
    }),
     getIngredientDropdown: builder.query({
      query: () => ({
        url: "Ingredient/getDropdown",
        method: "GET",
      }),
      providesTags: ["Ingredient"],
    }),
    saveIngredient: builder.mutation({
      query: (ingredientData) => ({
        url: "Ingredient/SaveIngredient",
        method: "POST",
        body: ingredientData,
      }),
      invalidatesTags: ["Ingredient"],
    }),
    deleteIngredient: builder.mutation({
      query: (id) => ({
        url: "Ingredient/DeleteIngredient",
        method: "DELETE",
        params: {
          id,
        },
      }),
      invalidatesTags: ["Ingredient"],
    }),
  }),
});

export const {
  useLazyGetIngredientQuery,
  useLazyGetIngredientDropdownQuery,
  useSaveIngredientMutation,
  useDeleteIngredientMutation,
} = IngredientController;
