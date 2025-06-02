import { useNavigate } from "react-router";
import {
  useChangeStatusMutation,
  useLazyGetAllTransectionQuery,
} from "../../controller/Warehouse.Controllers";
import { useAppSelector } from "../../redux/store/hook";
import { useEffect, useState } from "react";
import { IDropDown, IPagin, IResponse } from "../../@types/global";
import { Roles } from "../../common/SD";
import { IAllTransetion } from "../../@types/warehouse/Warehouse";
import { useDebounce } from "use-debounce";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import SearachSelect from "../../components/form/SearachSelect";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { useLazyGetBranchDropdownQuery } from "../../controller/Branch.Controllers";
import DatePicker from "../../components/form/date-picker";
import Pagination from "../../components/global/Pagination";
import TransectionData from "./TransectionData";
import toast from "react-hot-toast";

interface SearchProps {
  BranchId: number;
  StartDate: string;
  EndDate: string;
  Status: string;
  RequestType: string;
}

function MainTransection() {
  //use hook
  const navigate = useNavigate();
  //setting value
  const { user }: any = useAppSelector((state) => state.auth);
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 10,
    totalRows: 0,
    totalPages: 0,
  });
  const [data, setData] = useState<IAllTransetion[]>([]);
  const [branchDropdown, setCBranchDropdown] = useState<IDropDown[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchProps>({
    BranchId: user && user == Roles.ADMIN ? 0 : user?.branchId,
    StartDate: "",
    EndDate: "",
    Status: "",
    RequestType: "",
  });
  const [debouncedSearch] = useDebounce(search, 500);

  const [ChangeStatus] = useChangeStatusMutation();
  const [GetAllTransection] = useLazyGetAllTransectionQuery();
  const [getBranchDropdown] = useLazyGetBranchDropdownQuery();

  async function fetchAllTransections(
    pageSize: number,
    currentPage: number,
    BranchId: number,
    StartDate: string,
    EndDate: string,
    Status: string,
    RequestType: string
  ) {
    setLoading(true);
    const res = await GetAllTransection({
      pageSize,
      currentPage,
      BranchId,
      StartDate,
      EndDate,
      Status,
      RequestType,
    });
    setLoading(false);
    if (res.data && !res.isError) {
      const { data, pagin } = res.data;
      setData(data);
      setPagin(pagin);
    }
  }

  async function fetchBranchDropdown() {
    setLoading(true);
    const res = await getBranchDropdown(null);
    setLoading(false);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setCBranchDropdown(data);
    }
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    fetchAllTransections(
      pageSize,
      page,
      search.BranchId,
      search.StartDate,
      search.EndDate,
      search.Status,
      search.RequestType
    );
  };

  const HandleSubmit = async (
    userId: number,
    stockRequestId: number,
    status: string
  ) => {
    const payload = {
      userId: userId,
      stockRequestId: stockRequestId,
      status: status,
    };
    const response: IResponse<any> = await ChangeStatus(payload);
    if (response && response.data) {
      const res = response.data;
      if (res?.statusCode == 200 && res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          fetchAllTransections(
            pagin.pageSize,
            pagin.currentPage,
            search.BranchId,
            search.StartDate,
            search.EndDate,
            search.Status,
            search.RequestType
          );
        }, 500);
      }
    } else {
      toast.error(response.error.data.message);
    }
  };

  useEffect(() => {
    Promise.all([
      (fetchAllTransections(10, 1, search.BranchId, "", "", "", ""),
      fetchBranchDropdown()),
    ]);
  }, []);

  useEffect(() => {
    fetchAllTransections(
      pagin.pageSize,
      pagin.currentPage,
      search.BranchId,
      search.StartDate,
      search.EndDate,
      search.Status,
      search.RequestType
    );
  }, [debouncedSearch]);
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Transection" />
      <ComponentCard>
        <div className="flex flex-wrap justify-between items-end gap-2">
          <div className="flex flex-wrap  gap-2 item-end">
            {user?.role == Roles.ADMIN && (
              <div>
                <Label>branch</Label>
                <SearachSelect
                  options={branchDropdown}
                  placeholder="branch"
                  onChange={(e: any) => {
                    setSearch((prev) => ({
                      ...prev,
                      BranchId: e.value,
                    }));
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
            )}
            <div>
              <Label>StartDate</Label>
              <DatePicker
                mode="single"
                id="StartDate"
                placeholder="StartDate"
                onChange={(e) => {
                  setSearch((prev) => ({
                    ...prev,
                    StartDate: e[0].toISOString(),
                  }));
                }}
              />
            </div>
            <div>
              <Label>EndDate</Label>
              <DatePicker
                mode="single"
                id="EndDate"
                placeholder="EndDate"
                onChange={(e) => {
                  setSearch((prev) => ({
                    ...prev,
                    EndDate: e[0].toISOString(),
                  }));
                }}
              />
            </div>
            <div>
              <Label>Status</Label>
              <SearachSelect
                options={[
                  {
                    value: "approve",
                    label: "approve",
                  },
                  {
                    value: "pending",
                    label: "pending",
                  },
                  {
                    value: "not approve",
                    label: "not approve",
                  },
                ]}
                placeholder="branch"
                onChange={(e: any) => {
                  setSearch((prev) => ({
                    ...prev,
                    Status: e.value,
                  }));
                }}
                className="w-2xs dark:bg-dark-900"
              />
            </div>
            <div>
              <Label>RequestType</Label>
              <SearachSelect
                options={[
                  {
                    value: "add",
                    label: "add",
                  },
                  {
                    value: "request",
                    label: "request",
                  },
                ]}
                placeholder="branch"
                onChange={(e: any) => {
                  setSearch((prev) => ({
                    ...prev,
                    RequestType: e.value,
                  }));
                }}
                className="w-2xs dark:bg-dark-900"
              />
            </div>

            <Button
              size="sm"
              variant="primary"
              onClick={() => fetchAllTransections(10, 1, search.BranchId, "", "", "", "")}
            >
              Clear All
            </Button>
          </div>
        </div>
      </ComponentCard>
      <ComponentCard title="Transection">
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate("/warehouse/transection/form")}
          >
            Transections
          </Button>
        </div>
        <div>
          <Pagination pagin={pagin} onChange={handlePaginationChange} />
        </div>
        <TransectionData
          data={data}
          pagin={pagin}
          loading={loading}
          HandleSubmit={HandleSubmit}
        />
      </ComponentCard>
    </div>
  );
}

export default MainTransection;
