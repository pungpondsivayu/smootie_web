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
import { useDeleteCategoryMutation, useLazyGetDropdownQuery } from "../../../controller/Category.Controllers";
import Showdata from "./Showdata";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useDeleteMenuMutation, useLazyGetMenusQuery } from "../../../controller/Menu.Controllers";
import SearachSelect from "../../../components/form/SearachSelect";
import { useDebounce } from "use-debounce";
import { IAllMenu } from "../../../@types/menu/MenuType";

interface SearchProps {
  name : string,
  categoryId: number
}

function MainMenu() {
  //use hook 
  const navigate = useNavigate()
  //setting value
  const [data, setData] = useState<IAllMenu[]>([]);
  const [categoryDropdown, setCategoryDropdown] = useState<IDropDown[]>([]);
  const [search, setSearch] = useState<SearchProps>({
    name : "",
    categoryId : 0
  });
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 10,
    totalRows: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedSearch] = useDebounce(search, 500);
  

  //query
  const [getMenus] = useLazyGetMenusQuery();
  const [getCategoryDropdown] = useLazyGetDropdownQuery();
  const [deleteCategory] = useDeleteMenuMutation();


  //function
  async function fetchAllMenus(
    pageSize: number,
    currentPage: number,
    name : string,
    categoryId:number
  ) {
    setLoading(true);
    const res = await getMenus({
      pageSize,
      currentPage,
      name,
      categoryId,
    });
    setLoading(false);
    if (res.data && !res.isError) {
      const { data, pagin } = res.data;
      setData(data);
      setPagin(pagin);
    }
  }

  async function fetchCategoriesDropdown() {
    setLoading(true);
    const res = await getCategoryDropdown(null);
    setLoading(false);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setCategoryDropdown(data);
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
      const response : any = await deleteCategory(deleteReq.id)
      if (response && response.data) {
        const res = response.data;
        if (res?.statusCode == 200 && res?.success) {
          toast.success(res?.message);
          setTimeout(() => {
            fetchAllMenus(
              pagin.pageSize,
              data.length === 1 && pagin.currentPage > 1
                ? pagin.currentPage - 1
                : pagin.currentPage,
              search?.name,
              search?.categoryId
            );
          }, 500);
        }
      } else {
        toast.error(response.error.data.message);
      }
    }
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    fetchAllMenus(pageSize, page, search.name, search.categoryId);
  };
  
  useEffect(() => {
    Promise.all([fetchCategoriesDropdown(),  fetchAllMenus(10, 1 , "" , 0)]);
  }, []);

  useEffect(() => {
    fetchAllMenus(
      pagin.pageSize,
      pagin.currentPage,
      search.name,
      search.categoryId
    );
  }, [debouncedSearch]);


  return (
    <>
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Menu" />
        <ComponentCard>
          <div className="flex flex-wrap justify-between items-end gap-2">
            <div className="flex flex-wrap  gap-2 items-end">
              <div>
                <Label>name</Label>
                <Input
                  placeholder="name"
                  onChange={(e) => {
                    setSearch((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }));
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
              <div>
                <Label>Category</Label>
                <SearachSelect
                  options={categoryDropdown}
                  placeholder="category"
                  onChange={(e: any) => {
                    setSearch((prev) => ({
                      ...prev,
                      categoryId: e.value,
                    }));
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => fetchAllMenus(10, 1, "", 0)}
              >
                Clear All
              </Button>
            </div>
          </div>
        </ComponentCard>
        <ComponentCard title="Menu">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate("/setting/menu/form")}
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

export default MainMenu;
