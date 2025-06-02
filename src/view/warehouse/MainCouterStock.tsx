import React, { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import SearachSelect from "../../components/form/SearachSelect";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/store/hook";
import Pagination from "../../components/global/Pagination";
import { IDropDown, IPagin } from "../../@types/global";
import { useLazyGetBranchDropdownQuery } from "../../controller/Branch.Controllers";
import { Roles } from "../../common/SD";
import { useDebounce } from "use-debounce";
import { IAllCouterStock, IAllStock } from "../../@types/warehouse/Warehouse";
import Showdata from "./Showdata";
import Couterdata from "./Couterdata";
import { useLazyGetCouterQuery } from "../../controller/Warehouse.Controllers";

interface SearchProps {
  BranchId: number;
}

function MainWarehouse() {
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
  const [branchDropdown, setCBranchDropdown] = useState<IDropDown[]>([]);
  const [data, setData] = useState<IAllCouterStock[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<SearchProps>({
    BranchId: user && user == Roles.ADMIN ? 0 : user?.branchId,
  });

  const [debouncedSearch] = useDebounce(search, 500);

  //use query
  const [getBranchDropdown] = useLazyGetBranchDropdownQuery();
  const [getCouter] = useLazyGetCouterQuery();

  //function
  async function fetchAllWarehouse(
    pageSize: number,
    currentPage: number,
    branchId: number
  ) {
    setLoading(true);
    const res = await getCouter({
      pageSize,
      currentPage,
      branchId,
    });
    setLoading(false);
    if (res.data && !res.isError) {
      const { data, pagin } = res.data;
      setData(data);
      setPagin(pagin);
    }
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    fetchAllWarehouse(pageSize, page, search.BranchId);
  };

  async function fetchBranchDropdown() {
    setLoading(true);
    const res = await getBranchDropdown(null);
    setLoading(false);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setCBranchDropdown(data);
    }
  }

  useEffect(() => {
    Promise.all([
      fetchAllWarehouse(10, 10, search.BranchId),
      fetchBranchDropdown(),
    ]);
  }, []);

  useEffect(() => {
    fetchAllWarehouse(pagin.pageSize, pagin.currentPage, search.BranchId);
  }, [debouncedSearch]);
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Warehouse" />
      {user?.role == Roles.ADMIN && (
        <ComponentCard>
          <div className="flex flex-wrap justify-between items-end gap-2">
            <div className="flex flex-wrap  gap-2 items-end">
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
              <Button
                size="sm"
                variant="primary"
                onClick={() => fetchAllWarehouse(10, 1, search.BranchId)}
              >
                Clear All
              </Button>
            </div>
          </div>
        </ComponentCard>
      )}

      <ComponentCard title="Warehouse">
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate("/warehouse/transection")}
          >
            Transections
          </Button>
        </div>
        <div>
          <Pagination pagin={pagin} onChange={handlePaginationChange} />
        </div>
        <Couterdata data={data} pagin={pagin} loading={loading} />
      </ComponentCard>
    </div>
  );
}

export default MainWarehouse;
