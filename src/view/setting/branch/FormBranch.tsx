import React, { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import SearachSelect from "../../../components/form/SearachSelect";
import {
  getDistrictsByProvince,
  getProvinces,
  getSubdistrictsByDistrict,
} from "../../../helper/TranformAddressData";
import { IDropDown, IResponse } from "../../../@types/global";
import TextArea from "../../../components/form/input/TextArea";
import Switch from "../../../components/form/switch/Switch";
import Button from "../../../components/ui/button/Button";
import { Form, Formik } from "formik";
import { IAllBranch, ISaveBranch } from "../../../@types/branch/BranchType";
import { SaveBranchSchema } from "./Validation";
import { useAppSelector } from "../../../redux/store/hook";
import { useSaveBranchMutation } from "../../../controller/Branch.Controllers";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { formatDateLocalized, formatDateTimeLocalized } from "../../../utils/date/formatDate";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

function FormBranch() {
  //use hook
  const navigate = useNavigate();
  const location = useLocation();

  //setting value
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>("");
  const [provinceOptions, setProvinceOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [districtOptions, setDistrictOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [subdistrictOptions, setSubdistrictOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const { id }: any = useAppSelector((state) => state.auth.user);
  const branchData: IAllBranch = location.state?.branch;
  // query
  const [saveBranch] = useSaveBranchMutation();

  //function

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

  const HandleSubmit = async (values: ISaveBranch) => {
    console.log(values)
    const response : IResponse<any> = await saveBranch(values)
    if (response && response.data) {
      const res = response.data;
      if (res?.statusCode == 200 && res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate("/setting/branch");
        }, 1000);
      }
    } else {
      toast.error(response.error.data.message);
    }
  };

  useEffect(() => {
    const provinces = getProvinces();
    setProvinceOptions(provinces);

    // ถ้ามี branchData (update mode)
    if (branchData) {
      const province = provinces.find(p => p.label === branchData.province);
        if (province) {
          setSelectedProvince(province.label);
          const districts = getDistrictsByProvince(province.value);
          setDistrictOptions(districts);

          const district = districts.find(
            (d) => d.label === branchData.district
          );
          if (district) {
            setSelectedDistrict(district.label);
            const subdistricts = getSubdistrictsByDistrict(district.value);
            setSubdistrictOptions(subdistricts);

            const subdistrict = subdistricts.find(
              (s) => s.label === branchData.subDistrict
            );
            if (subdistrict) {
              setSelectedSubdistrict(subdistrict.label);
            }
          }
        }
    }
  }, []);

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Form-branch" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard title={`${!branchData ? "Create" : "Update"} branch`}>
          <Formik
            initialValues={{
              branchId: branchData?.branchId || 0,
              province: branchData?.province || "",
              district: branchData?.district || "",
              subDistrict: branchData?.subDistrict || "",
              postalCode: branchData?.postalCode || "",
              addressDetail: branchData?.addressDetail || "",
              createdBy: `${id}`,
              isUsed: branchData?.isUsed ?? true,
            }}
            validationSchema={SaveBranchSchema}
            onSubmit={(values: ISaveBranch) => HandleSubmit(values)}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="input">Provinces</Label>
                    <SearachSelect
                      options={provinceOptions}
                      placeholder={
                        branchData?.province === ""
                          ? "Provinces"
                          : selectedProvince
                      }
                      onChange={(e: any) => {
                        handleProvinceChange(e);
                        setFieldValue("province", e.label);
                      }}
                      className="w-full dark:bg-dark-900"
                    />
                    {errors.province && touched.province ? (
                      <div className="text-red-700">{errors.province}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="input">District</Label>
                    <SearachSelect
                      options={districtOptions}
                      placeholder={
                        branchData?.district === ""
                          ? "District"
                          : selectedDistrict
                      }
                      onChange={(e: any) => {
                        handleDistrictChange(e);
                        setFieldValue("district", e.label);
                      }}
                      className="w-full dark:bg-dark-900"
                    />
                    {errors.district && touched.district ? (
                      <div className="text-red-700">{errors.district}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="input">Subdistrict</Label>
                    <SearachSelect
                      options={subdistrictOptions}
                      placeholder={
                        branchData?.subDistrict === ""
                          ? "Subdistrict"
                          : selectedSubdistrict
                      }
                      onChange={(e: any) => {
                        handleSubdistrictChange(e);
                        setFieldValue("subDistrict", e.label);
                      }}
                      className="w-full dark:bg-dark-900"
                    />
                    {errors.subDistrict && touched.subDistrict ? (
                      <div className="text-red-700">{errors.subDistrict}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="postalCode">PostalCode</Label>
                    <Input
                      type="text"
                      id="postalCode"
                      placeholder="postalCode"
                      value={values.postalCode}
                      onChange={(e) => {
                        setFieldValue("postalCode", e.target.value);
                      }}
                    />
                    {errors.postalCode && touched.postalCode ? (
                      <div className="text-red-700">{errors.postalCode}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label>Description</Label>
                    <TextArea
                      value={values.addressDetail}
                      onChange={(value) => {
                        setFieldValue("addressDetail", value);
                      }}
                      rows={6}
                    />
                    {errors.addressDetail && touched.addressDetail ? (
                      <div className="text-red-700">{errors.addressDetail}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Switch
                      label={values.isUsed ? "Is used" : "Non used"}
                      defaultChecked={branchData?.isUsed ?? true}
                      onChange={(e) => {
                        setFieldValue("isUsed", e);
                      }}
                    />
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        navigate("/setting/branch");
                      }}
                    >
                      cancel
                    </Button>
                    <Button size="sm" variant="success" type="submit">
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </ComponentCard>
        {branchData && (
          <ComponentCard
            title={`${!branchData ? "Create" : "Update"} branch`}
            className="h-fit"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="postalCode">create by</Label>
                <Input
                  type="text"
                  id="postalCode"
                  placeholder="postalCode"
                  value={branchData && branchData.createdBy}
                  readonly={true}
                />
              </div>
              <div>
                <Label htmlFor="postalCode">create date</Label>
                <Input
                  type="text"
                  id="postalCode"
                  placeholder="postalCode"
                  value={
                    branchData &&
                    formatDateLocalized(branchData.createdDate, {
                      lang: "en",
                      yearType: "BE",
                    })
                  }
                  readonly={true}
                />
              </div>
            </div>
          </ComponentCard>
        )}
      </div>
    </div>
  );
}

export default FormBranch;
