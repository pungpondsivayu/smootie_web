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
import Showdata from "./Showdata";
import { useDeleteIngredientMutation, useLazyGetIngredientQuery } from "../../../controller/Ingredient.Controllers";
import { IAllIngredient } from "../../../@types/Ingredient/IngredientType";

function MainIngredient() {
  //use hook 
  const navigate = useNavigate()
  //setting value
  const [data, setData] = useState<IAllIngredient[]>([]);
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 10,
    totalRows: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);

  //query
  const [GetIngredient] = useLazyGetIngredientQuery();
  const [deleteIngredient] = useDeleteIngredientMutation();


  //function
  async function fetchAllIngredient(
    pageSize: number,
    currentPage: number,
  ) {
    setLoading(true);
    const res = await GetIngredient({
      pageSize,
      currentPage,
    });
    setLoading(false);
    if (res.data && !res.isError) {
      const { data, pagin } = res.data;
      console.log(data)
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
      const response : any = await deleteIngredient(deleteReq.id)
      if (response && response.data) {
        const res = response.data;
        if (res?.statusCode == 200 && res?.success) {
          toast.success(res?.message);
          setTimeout(() => {
            fetchAllIngredient(
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
    fetchAllIngredient(
      pageSize,
      page,
    );
  };
  
  useEffect(() => {
    fetchAllIngredient(10, 1);
  }, []);


  return (
    <>
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Ingredient" />
        <ComponentCard title="Ingredient">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate("/setting/ingredient/form")}
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

export default MainIngredient;
