import { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Button from "../../../components/ui/button/Button";
import { IDeleteReq ,IDropDown,IPagin } from "../../../@types/global";
import Pagination from "../../../components/global/Pagination";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import AlertMessage from "../../../components/global/SweertAlert";
import toast from "react-hot-toast";
import Showdata from "./Showdata";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import SearachSelect from "../../../components/form/SearachSelect";
import { useDebounce } from "use-debounce";
import { useLazyGetRoleDropdownQuery } from "../../../controller/Role.Controllers";
import { useLazyGetBranchDropdownQuery } from "../../../controller/Branch.Controllers";
import { useDeleteEmployeeMutation, useLazyGetEmployeeQuery } from "../../../controller/Employee.Controllers";
import { IAllEmployee } from "../../../@types/employee/EmployeeType";
import { useAppSelector } from "../../../redux/store/hook";
import { Roles } from "../../../common/SD";

interface SearchProps {
  BranchId : number,
  RoleId : number,
  search : string,
  status: string
}

const StatusData: IDropDown[] = [
  {
    value: 0,
    label: "Active",
  },
  {
    value: 1,
    label: "Non Active",
  },];

function MainEmployee() {
  //use hook 
  const navigate = useNavigate()
  //setting value
  const [data, setData] = useState<IAllEmployee[]>([]);
  const [categoryDropdown, setCategoryDropdown] = useState<IDropDown[]>([]);
  const { user }: any = useAppSelector((state) => state.auth);
  const [search, setSearch] = useState<SearchProps>({
    BranchId: user && user == Roles.ADMIN ? 0 : user.branchId,
    RoleId: 0,
    search: "",
    status: "",
  });
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 10,
    totalRows: 0,
    totalPages: 0,
  });

  const [branchDropdown, setCBranchDropdown] = useState<IDropDown[]>([]);
  const [roleDropdown, setRoleDropdown] = useState<IDropDown[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedSearch] = useDebounce(search, 500);
  

  //query
  const [getEmployee] = useLazyGetEmployeeQuery();
  const [getRoleDropdown] = useLazyGetRoleDropdownQuery();
  const [getBranchDropdown] = useLazyGetBranchDropdownQuery();  
  const [deleteEmployee] = useDeleteEmployeeMutation();


  //function
  async function fetchAllEmployee(
    pageSize: number,
    currentPage: number,
    BranchId : number,
    RoleId : number,
    search : string,
    status : string,
  ) {
    setLoading(true);
    const res = await getEmployee({
      pageSize,
      currentPage,
      BranchId,
      RoleId,
      search,
      status,
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

  async function fetchRoleDropdown() {
    setLoading(true);
    const res = await getRoleDropdown(null);
    setLoading(false);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setRoleDropdown(data);
    }
  }


  async function handleDelete(deleteReq:IDeleteReq){
    const result = await AlertMessage({
      type: "question",
      title: `คุณต้องการ ${deleteReq.name} ใช่หรือไม่P?`,
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    });
    if (result.isConfirmed) {
      const response : any = await deleteEmployee(deleteReq.id)
      if (response && response.data) {
        const res = response.data;
        if (res?.statusCode == 200 && res?.success) {
          toast.success(res?.message);
          setTimeout(() => {
            fetchAllEmployee(
              pagin.pageSize,
              data.length === 1 && pagin.currentPage > 1
                ? pagin.currentPage - 1
                : pagin.currentPage,
              search?.BranchId,
              search?.RoleId,
              search?.search,
              search?.status,
            );
          }, 500);
        }
      } else {
        toast.error(response.error.data.message);
      }
    }
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    fetchAllEmployee(pageSize, page, search.BranchId, search.RoleId , search.search , search.status);
  };
  
  useEffect(() => {
    Promise.all([fetchBranchDropdown() ,fetchRoleDropdown(),  fetchAllEmployee(10, 1 , search.BranchId ,0 , "" , "")]);
  }, []);

  useEffect(() => {
    fetchAllEmployee(
      pagin.pageSize,
      pagin.currentPage,
      search.BranchId,
      search.RoleId,
      search.search,
      search.status
    );
  }, [debouncedSearch]);


  return (
    <>
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Employee" />
        <ComponentCard>
          <div className="flex flex-wrap justify-between items-end gap-2">
            <div className="flex flex-wrap  gap-2 items-end">
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
                <Label>Role</Label>
                <SearachSelect
                  options={roleDropdown}
                  placeholder="role"
                  onChange={(e: any) => {
                    setSearch((prev) => ({
                      ...prev,
                      RoleId: e.value,
                    }));
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
              <div>
                <Label>name</Label>
                <Input
                  placeholder="name"
                  onChange={(e) => {
                    setSearch((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }));
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
              <div>
                <Label>status</Label>
                <SearachSelect
                  options={StatusData}
                  placeholder="status"
                  onChange={(e: any) => {
                    setSearch((prev) => ({
                      ...prev,
                      status: e.label,
                    }));
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => fetchAllEmployee(10, 1, 0, 0, "", "")}
              >
                Clear All
              </Button>
            </div>
          </div>
        </ComponentCard>
        <ComponentCard title="Employee">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate("/setting/employee/form")}
              startIcon={<FontAwesomeIcon icon={faPlus} />}
            >
              Create new
            </Button>
          </div>
          <div>
            <Pagination pagin={pagin} onChange={handlePaginationChange} />
          </div>
          <Showdata
            data={data}
            pagin={pagin}
            loading={loading}
            onDelete={(id, name) => handleDelete({ id, name })}
          />
        </ComponentCard>
      </div>
    </>
  );
}

export default MainEmployee;
