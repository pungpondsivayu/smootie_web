import { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import SearachSelect from "../../../components/form/SearachSelect";
import Button from "../../../components/ui/button/Button";
import {
  getDistrictsByProvince,
  getProvinces,
  getSubdistrictsByDistrict,
} from "../../../helper/TranformAddressData";
import { IDeleteReq, IDropDown, IPagin } from "../../../@types/global";
import Label from "../../../components/form/Label";
import { useDeleteBranchMutation, useLazyGetBranchsQuery } from "../../../controller/Branch.Controllers";
import { IAllBranch } from "../../../@types/branch/BranchType";
import Showdata from "./Showdata";
import Pagination from "../../../components/global/Pagination";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { useDebounce } from 'use-debounce';
import AlertMessage from "../../../components/global/SweertAlert";
import toast from "react-hot-toast";

function MainBranch() {
  //use hook 
  const navigate = useNavigate()
  //setting value
  const [data, setData] = useState<IAllBranch[]>([]);
  const [pagin, setPagin] = useState<IPagin>({
    currentPage: 1,
    pageSize: 10,
    totalRows: 0,
    totalPages: 0,
  });
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>("");
  const [debouncedProvince] = useDebounce(selectedProvince, 500);
  const [debouncedDistrict] = useDebounce(selectedDistrict, 500);
  const [debouncedSubdistrict] = useDebounce(selectedSubdistrict, 500);
  const [loading, setLoading] = useState<boolean>(false);

  const [provinceOptions, setProvinceOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [districtOptions, setDistrictOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [subdistrictOptions, setSubdistrictOptions] = useState<
    { value: number; label: string }[]
  >([]);
  // const provinceOptions = getProvinces().map(p => ({ value: p.value, label: p.label }));

  //query
  const [GetBranchs] = useLazyGetBranchsQuery();
  const [deleteBranch] = useDeleteBranchMutation();


  //function

    const GetAllProvinces = () =>
      setProvinceOptions(
        getProvinces().map((p) => ({ value: p.value, label: p.label }))
      );
  const handleProvinceChange = (value: IDropDown) => {
    setSelectedProvince(value.label);
    setDistrictOptions(
      getDistrictsByProvince(value.value).map((d) => ({
        value: d.value,
        label: d.label,
      }))
    );
  };

  const handleDistrictChange = (value: IDropDown) => {
    setSelectedDistrict(value.label);
    setSubdistrictOptions(
      getSubdistrictsByDistrict(value.value).map((s) => ({
        value: s.value,
        label: s.label,
      }))
    );
  };

  const handleSubdistrictChange = (value: IDropDown) => {
    setSelectedSubdistrict(value.label);
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    fetchAllBranch(
      pageSize,
      page,
      selectedProvince,
      selectedDistrict,
      selectedSubdistrict
    );
  };

  async function fetchAllBranch(
    pageSize: number,
    currentPage: number,
    province: string,
    district: string,
    subDistrict: string
  ) {
    setLoading(true);
    const res = await GetBranchs({
      pageSize,
      currentPage,
      province,
      district,
      subDistrict,
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
      title: `คุณต้องการ ${deleteReq.name} ใช่หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    });
    if (result.isConfirmed) {
      const response : any = await deleteBranch(deleteReq.id)
      if (response && response.data) {
        const res = response.data;
        if (res?.statusCode == 200 && res?.success) {
          toast.success(res?.message);
          setTimeout(() => {
            fetchAllBranch(
              pagin.pageSize,
              data.length === 1 && pagin.currentPage > 1
                ? pagin.currentPage - 1
                : pagin.currentPage,
              selectedProvince,
              selectedDistrict,
              selectedSubdistrict
            );
          }, 500);

        }
      } else {
        toast.error(response.error.data.message);
      }
    }
  }
  
  useEffect(() => {
    Promise.all([GetAllProvinces(), fetchAllBranch(10, 1, "", "", "")]);
  }, []);

  useEffect(() => {
    fetchAllBranch(
      pagin.pageSize,
      pagin.currentPage,
      selectedProvince,
      selectedDistrict,
      selectedSubdistrict
    );
  }, [debouncedProvince, debouncedDistrict, debouncedSubdistrict]);

  return (
    <>
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Branch" />
        <ComponentCard>
          <div className="flex flex-wrap justify-between items-end gap-2">
            <div className="flex flex-wrap  gap-2 items-end">
              <div>
                <Label>Provinces</Label>
                <SearachSelect
                  options={provinceOptions}
                  placeholder="Provinces"
                  onChange={(e: any) => {
                    handleProvinceChange(e);
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
              <div>
                <Label>District</Label>
                <SearachSelect
                  options={districtOptions}
                  placeholder="District"
                  onChange={(e: any) => {
                    handleDistrictChange(e);
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
              <div>
                <Label>Subdistrict</Label>
                <SearachSelect
                  options={subdistrictOptions}
                  placeholder="Subdistrict"
                  onChange={(e: any) => {
                    handleSubdistrictChange(e);
                  }}
                  className="w-2xs dark:bg-dark-900"
                />
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => fetchAllBranch(10, 1, "", "", "")}
              >
                Clear All
              </Button>
            </div>
          </div>
        </ComponentCard>
        <ComponentCard title="Branch">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate("/setting/branch/form")}
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

export default MainBranch;
