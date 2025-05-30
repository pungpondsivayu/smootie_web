import { BaseApi } from "../helper/controller/ConfigQuery";

interface BranchProps {
  pageSize: number;
  currentPage: number;
  province: string;
  district: string;
  subDistrict: string;
}

export const BranchController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBranchs: builder.query({
      query: ({
        pageSize,
        currentPage,
        province,
        district,
        subDistrict,
      }: BranchProps) => ({
        url: `Branch/GetAllBranch`,
        method: "GET",
        params: {
          pageSize,
          currentPage,
          province,
          district,
          subDistrict,
        },
      }),
      providesTags: ["Branch"],
    }),
    getBranchDropdown: builder.query({
      query: () => ({
        url: `Branch/GetDropdown`,
        method: "GET",
      }),
      providesTags: ["Branch"],
    }),
    saveBranch: builder.mutation({
      query: (branchData) => ({
        url: "Branch/SaveBranch",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: branchData,
      }),
      invalidatesTags: ["Branch"],
    }),
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: "Branch/DeleteBranch",
        method: "DELETE",
        params: {
          id
        }
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
});

export const { useLazyGetBranchsQuery , useLazyGetBranchDropdownQuery, useSaveBranchMutation , useDeleteBranchMutation } = BranchController;
