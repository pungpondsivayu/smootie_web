import { BaseApi } from "../helper/controller/ConfigQuery";

interface OrderProps {
  pageSize: number;
  currentPage: number;
  branchId: number;
}

export const OrderController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
     GetAllOrder: builder.query({
      query: ({
        pageSize,
        currentPage,
        BranchId,
        StartDate,
        EndDate,
      }) => ({
        url: "Order/GetAllOrder",
        method: "Get",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          pageSize,
          currentPage,
          BranchId,
          StartDate,
          EndDate,
        },
      }),
      providesTags: ["Order"],
    }),
    SaveOrder: builder.mutation({
      query: (OrderionData) => ({
        url: "Order/SaveOrder",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: OrderionData,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useSaveOrderMutation, useLazyGetAllOrderQuery } = OrderController;
