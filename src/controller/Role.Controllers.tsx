import { BaseApi } from "../helper/controller/ConfigQuery";

interface BranchProps {
  pageSize: number;
  currentPage: number;
  province: string;
  district: string;
  subDistrict: string;
}

export const RoleController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoleDropdown: builder.query({
      query: () => ({
        url: `Role/GetDropdown`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
  }),
});

export const { useLazyGetRoleDropdownQuery} = RoleController;
