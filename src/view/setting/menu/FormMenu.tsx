import React, { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { IDropDown, IResponse } from "../../../@types/global";
import Switch from "../../../components/form/switch/Switch";
import Button from "../../../components/ui/button/Button";
import { Form, Formik } from "formik";
import { SaveMenuSchema } from "./Validation";
import { useAppSelector } from "../../../redux/store/hook";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { formatDateLocalized } from "../../../utils/date/formatDate";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { IAllCategory } from "../../../@types/category/CategoryType";
import {
  useLazyGetDropdownQuery,
  useSaveCategoryMutation,
} from "../../../controller/Category.Controllers";
import SearachSelect from "../../../components/form/SearachSelect";
import FileInput from "../../../components/form/input/FileInput";
import { IAllMenu, ISaveMenu } from "../../../@types/menu/MenuType";
import ResponsiveImage from "../../../components/ui/images/ResponsiveImage";
import { convertToSimpleFormData } from "../../../utils/SendForm";
import { useSaveMenuMutation } from "../../../controller/Menu.Controllers";
function FormMenu() {
  //use hook
  const navigate = useNavigate();
  const location = useLocation();

  //setting value
  const menuData: IAllMenu = location.state?.menu;
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(menuData?.image ?? "");
  const [categoryDropdown, setCategoryDropdown] = useState<IDropDown[]>([]);
  const { id }: any = useAppSelector((state) => state.auth.user);
  const category: string = location.state?.category;
  // query
  const [saveMenu] = useSaveMenuMutation();
  const [getCategoryDropdown] = useLazyGetDropdownQuery();

  //function
  const HandleSubmit = async (values: ISaveMenu) => {
    const formData = convertToSimpleFormData(values);
    const response: IResponse<any> = await saveMenu(formData);
    if (response && response.data) {
      const res = response.data;
      if (res?.statusCode == 200 && res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate("/setting/menu");
        }, 1000);
      }
    } else {
      toast.error(response.error.data.message);
    }
  };

  async function fetchCategoriesDropdown() {
    setLoading(true);
    const res = await getCategoryDropdown(null);
    setLoading(false);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setCategoryDropdown(data);
    }
  }

  const HandleFile = async (File: React.ChangeEvent<HTMLInputElement>) => {
    if (File.target.files && File.target.files[0]) {
      setImageUrl(URL.createObjectURL(File.target.files[0]));
    }
  };

  useEffect(() => {
    fetchCategoriesDropdown();
  }, []);

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Form-menu" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard title={`${!menuData ? "Create" : "Update"} menu`}>
          <Formik
            initialValues={{
              MenuId: menuData?.menuId ?? 0,
              Name: menuData?.name ?? "",
              Price: menuData?.price ?? 1,
              CreatedBy: `${id}`,
              IsUsed: menuData?.isUsed ?? true,
              CategoryId: menuData?.categoryId ?? 0,
              ImageFile: "",
            }}
            validationSchema={SaveMenuSchema}
            onSubmit={(values: ISaveMenu) => HandleSubmit(values)}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <div className="space-y-6">
                  {imageUrl && (
                    <div className="flex justify-center">
                      <ResponsiveImage
                        source={imageUrl}
                        className="w-full max-h-96 object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="name"
                      value={values.Name}
                      onChange={(e) => {
                        setFieldValue("Name", e.target.value);
                      }}
                    />
                    {errors.Name && touched.Name ? (
                      <div className="text-red-700">{errors.Name}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="Price">Price</Label>
                    <Input
                      type="number"
                      id="Price"
                      placeholder="Price"
                      value={values.Price}
                      onChange={(e) => {
                        setFieldValue("Price", e.target.value);
                      }}
                    />
                    {errors.Price && touched.Price ? (
                      <div className="text-red-700">{errors.Price}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="Price">
                      Category - {category && category}
                    </Label>
                    <SearachSelect
                      options={categoryDropdown}
                      placeholder="category"
                      onChange={(e: any) => {
                        setFieldValue("CategoryId", e.value);
                      }}
                      className="w-full dark:bg-dark-900"
                    />
                    {errors.CategoryId && touched.CategoryId ? (
                      <div className="text-red-700">{errors.CategoryId}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="Image">Image</Label>
                    <FileInput
                      onChange={(arg: React.ChangeEvent<HTMLInputElement>) => {
                        HandleFile(arg);
                        if (arg.target.files && arg.target.files[0]) {
                          setFieldValue("ImageFile", arg.target.files[0]); // ส่งค่าไฟล์ (ไม่ใช่ HTMLInputElement)
                        }
                      }}
                      className="custom-class"
                    />
                  </div>
                  <div>
                    <Label>status</Label>
                    <Switch
                      label={values.IsUsed ? "Is used" : "Non used"}
                      defaultChecked={menuData?.isUsed ?? true}
                      onChange={(e) => {
                        setFieldValue("IsUsed", e);
                      }}
                    />
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        navigate("/setting/menu");
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
        {menuData && (
          <ComponentCard
            title={`${!menuData ? "Create" : "Update"} branch`}
            className="h-fit"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="postalCode">create by</Label>
                <Input
                  type="text"
                  id="postalCode"
                  placeholder="postalCode"
                  value={menuData?.createdBy ?? ""}
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
                    menuData &&
                    formatDateLocalized(menuData?.createdDate, {
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
export default FormMenu;
