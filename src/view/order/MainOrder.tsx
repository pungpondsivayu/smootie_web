import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/store/hook";
import { forwardRef, useEffect, useRef, useState } from "react";
import { IDropDown, IPagin, IResponse } from "../../@types/global";
import { Roles } from "../../common/SD";
import { useDebounce } from "use-debounce";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import SearachSelect from "../../components/form/SearachSelect";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
import { useLazyGetBranchDropdownQuery } from "../../controller/Branch.Controllers";
import DatePicker from "../../components/form/date-picker";
import Pagination from "../../components/global/Pagination";
import toast from "react-hot-toast";
import { IAllOrder } from "../../@types/order/OrderType";
import { useLazyGetAllOrderQuery } from "../../controller/Order.Controllers";
import Showdata from "./Showdata";

interface SearchProps {
  BranchId: number;
  StartDate: string;
  EndDate: string;
}

interface Props {
  order: IAllOrder;
}

function MainOrder() {
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
  const [data, setData] = useState<IAllOrder[]>([]);
  const [branchDropdown, setCBranchDropdown] = useState<IDropDown[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchProps>({
    BranchId: user && user == Roles.ADMIN ? 0 : user?.branchId,
    StartDate: "",
    EndDate: "",
  });
  const [debouncedSearch] = useDebounce(search, 500);

  const [GetAllOrder] = useLazyGetAllOrderQuery();
  const [getBranchDropdown] = useLazyGetBranchDropdownQuery();

  async function fetchAllOrder(
    pageSize: number,
    currentPage: number,
    BranchId: number,
    StartDate: string,
    EndDate: string
  ) {
    setLoading(true);
    const res = await GetAllOrder({
      pageSize,
      currentPage,
      BranchId,
      StartDate,
      EndDate,
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
    fetchAllOrder(
      pageSize,
      page,
      search.BranchId,
      search.StartDate,
      search.EndDate
    );
  };

  useEffect(() => {
    Promise.all([
      (fetchAllOrder(10, 1, search.BranchId, search.StartDate, search.EndDate),
      fetchBranchDropdown()),
    ]);
  }, []);

  useEffect(() => {
    fetchAllOrder(
      pagin.pageSize,
      pagin.currentPage,
      search.BranchId,
      search.StartDate,
      search.EndDate
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

            <Button
              size="sm"
              variant="primary"
              onClick={() => fetchAllOrder(10, 1, search.BranchId, "", "")}
            >
              Clear All
            </Button>
          </div>
        </div>
      </ComponentCard>
      <ComponentCard title="Transection">
        <div>
          <Pagination pagin={pagin} onChange={handlePaginationChange} />
        </div>
        <Showdata data={data} pagin={pagin} loading={loading} />
      </ComponentCard>
    </div>
  );
}

export default MainOrder;
