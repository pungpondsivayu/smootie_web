import { BaseApi } from "../helper/controller/ConfigQuery";

interface MenuProps {
  pageSize: number;
  currentPage: number;
  name: string;
  categoryId: number;
}

export const MenuController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetMenus: builder.query({
      query: ({
        pageSize,
        currentPage,
        name,
        categoryId
      }:MenuProps) => ({
        url: "Menu/GetAllMenu",
        method: "Get",
        headers: {
          "Content-type": "application/json",
        },
        params : {
          pageSize,
          currentPage,
          name,
          categoryId
        }
      }),
      providesTags: ["Menu"],
    }),
    saveMenu: builder.mutation({
      query: (menuData) => ({
        url: "Menu/SaveMenu",
        method: "POST",
        body: menuData,
      }),
      invalidatesTags: ["Menu"],
    }),
    deleteMenu: builder.mutation({
      query: (id) => ({
        url: "Menu/DeleteMenu",
        method: "DELETE",
        params: {
          id
        }
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const { useLazyGetMenusQuery ,useSaveMenuMutation , useDeleteMenuMutation } = MenuController;
