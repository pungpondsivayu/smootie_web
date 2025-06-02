import { BaseApi } from "../helper/controller/ConfigQuery";

interface WarehouseProps {
  pageSize: number;
  currentPage: number;
  branchId: number;
}

export const WarehouseController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetWarehouse: builder.query({
      query: ({ pageSize, currentPage, branchId }: WarehouseProps) => ({
        url: "Warehouse/GetAllWarehouse",
        method: "Get",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          pageSize,
          currentPage,
          branchId,
        },
      }),
      providesTags: ["Warehouse"],
    }),
     GetCouter: builder.query({
      query: ({ pageSize, currentPage, branchId }: WarehouseProps) => ({
        url: "Warehouse/GetAllCouterStock",
        method: "Get",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          pageSize,
          currentPage,
          branchId,
        },
      }),
      providesTags: ["Warehouse"],
    }),
    CraeteTransection: builder.mutation({
      query: (TransectionData) => ({
        url: "Warehouse/CreateTransection",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: TransectionData,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    ChangeStatus: builder.mutation({
      query: (ChangeData) => ({
        url: "Warehouse/ChangeStatus",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        params: ChangeData,
      }),
      invalidatesTags: ["Warehouse"],
    }),
    GetAllTransection: builder.query({
      query: ({
        pageSize,
        currentPage,
        branchId,
        StartDate,
        EndDate,
        Status,
        RequestType,
      }) => ({
        url: "Warehouse/GetAllTransection",
        method: "Get",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          pageSize,
          currentPage,
          branchId,
          StartDate,
          EndDate,
          Status,
          RequestType,
        },
      }),
      providesTags: ["Warehouse"],
    }),
  }),
});

export const {
  useLazyGetWarehouseQuery,
  useCraeteTransectionMutation,
  useLazyGetCouterQuery,
  useLazyGetAllTransectionQuery,
  useChangeStatusMutation,
} = WarehouseController;
