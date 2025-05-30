import { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Button from "../../../components/ui/button/Button";
import { IDeleteReq ,IPagin } from "../../../@types/global";
import Pagination from "../../../components/global/Pagination";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import AlertMessage from "../../../components/global/SweertAlert";
import toast from "react-hot-toast";
import { IAllCategory } from "../../../@types/category/CategoryType";
import Showdata from "./Showdata";
import { useDeleteCategoryMutation, useLazyGetCategoriesQuery } from "../../../controller/Category.Controllers";

function MainCategories() {
  //use hook 
  const navigate = useNavigate()
  //setting value
  const [data, setData] = useState<IAllCategory[]>([]);
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 10,
    totalRows: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);

  //query
  const [GetCategories] = useLazyGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();


  //function
  async function fetchAllCategory(
    pageSize: number,
    currentPage: number,
  ) {
    setLoading(true);
    const res = await GetCategories({
      pageSize,
      currentPage,
    });
    setLoading(false);
    if (res.data && !res.isError) {
      const { data, pagin } = res.data;
      setData(data);
      setPagin(pagin);
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
            fetchAllCategory(
              pagin.pageSize,
              data.length === 1 && pagin.currentPage > 1
                ? pagin.currentPage - 1
                : pagin.currentPage,
            );
          }, 500);
        }
      } else {
        toast.error(response.error.data.message);
      }
    }
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    fetchAllCategory(
      pageSize,
      page,
    );
  };
  
  useEffect(() => {
    fetchAllCategory(10, 1);
  }, []);


  return (
    <>
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Category" />
        <ComponentCard title="Category">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate("/setting/category/form")}
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

export default MainCategories;
