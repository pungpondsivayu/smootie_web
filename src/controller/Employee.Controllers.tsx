import { BaseApi } from "../helper/controller/ConfigQuery";

interface EmployeeProps {
  pageSize: number;
  currentPage: number;
  BranchId: number;
  RoleId: number;
  search: string;
  status: string;
}

export const MenuController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetEmployee: builder.query({
      query: ({
        pageSize,
        currentPage,
        BranchId,
        RoleId,
        search,
        status
      }:EmployeeProps) => ({
        url: "Employee/GetAllEmployee",
        method: "Get",
        headers: {
          "Content-type": "application/json",
        },
        params : {
          pageSize,
          currentPage,
          BranchId,
          RoleId,
          search,
          status
        }
      }),
      providesTags: ["Employee"],
    }),
    saveEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "Employee/SaveEmployee",
        method: "POST",
        body: employeeData,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: "Employee/DeleteEmployee",
        method: "DELETE",
        params: {
          id
        }
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useLazyGetEmployeeQuery,
  useDeleteEmployeeMutation,
  useSaveEmployeeMutation,
} = MenuController;
