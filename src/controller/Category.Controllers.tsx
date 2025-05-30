import { BaseApi } from "../helper/controller/ConfigQuery";

interface CategoryProps {
  pageSize: number;
  currentPage: number;
}

export const CategoryController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({
        pageSize,
        currentPage
      }: CategoryProps) => ({
        url: `MenuCategory/GetAllMenuCategory`,
        method: "GET",
        params: {
          pageSize,
          currentPage,
        },
      }),
      providesTags: ["Category"],
    }),
    getDropdown: builder.query({
      query: () => ({
        url: `MenuCategory/GetDropdown`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    saveCategory: builder.mutation({
      query: (categoryData) => ({
        url: "MenuCategory/SaveMenuCategory",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: "MenuCategory/DeleteMenuCategory",
        method: "DELETE",
        params: {
          id
        }
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useLazyGetCategoriesQuery , useLazyGetDropdownQuery ,useSaveCategoryMutation , useDeleteCategoryMutation } = CategoryController;
