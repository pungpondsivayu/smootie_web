import { BaseApi } from "../helper/controller/ConfigQuery";



export const MenuRecipeController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetAlMenurecipeByMenuId: builder.query({
      query: (menuId) => ({
        url: "MenuRecipe/GetAlMenurecipeByMenuId",
        method: "Get",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          menuId,
        },
      }),
      providesTags: ["MenuRecipe"],
    }),
    saveMenuRecipe: builder.mutation({
      query: (menuRecipeData) => ({
        url: "MenuRecipe/SaveMenuRecipe",
        method: "POST",
        body: menuRecipeData,
      }),
      invalidatesTags: ["MenuRecipe"],
    }),
    deleteMenuRecipe: builder.mutation({
      query: (id) => ({
        url: "MenuRecipe/DeleteMenuRecipe",
        method: "DELETE",
        params: {
          id
        }
      }),
      invalidatesTags: ["MenuRecipe"],
    }),
  }),
});

export const { useLazyGetAlMenurecipeByMenuIdQuery , useSaveMenuRecipeMutation , useDeleteMenuRecipeMutation} = MenuRecipeController;
