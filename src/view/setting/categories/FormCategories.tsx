import React, { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { IDropDown, IResponse } from "../../../@types/global";
import TextArea from "../../../components/form/input/TextArea";
import Switch from "../../../components/form/switch/Switch";
import Button from "../../../components/ui/button/Button";
import { Form, Formik } from "formik";
import { SaveCategorySchema } from "./Validation";
import { useAppSelector } from "../../../redux/store/hook";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { formatDateLocalized } from "../../../utils/date/formatDate";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { IAllCategory, ISaveCategory } from "../../../@types/category/CategoryType";
import { useSaveCategoryMutation } from "../../../controller/Category.Controllers";

function FormCategories() {
  //use hook
  const navigate = useNavigate();
  const location = useLocation();

  //setting value
  const { id }: any = useAppSelector((state) => state.auth.user);
  const categoryData: IAllCategory = location.state?.category;
  // query
  const [saveCategory] = useSaveCategoryMutation();

  //function
  const HandleSubmit = async (values: ISaveCategory) => {
    const response: IResponse<any> = await saveCategory(values);
    if (response && response.data) {
      const res = response.data;
      if (res?.statusCode == 200 && res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate("/setting/category");
        }, 1000);
      }
    } else {
      toast.error(response.error.data.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Form-branch" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard
          title={`${!categoryData ? "Create" : "Update"} category`}
        >
          <Formik
            initialValues={{
              categoryId: categoryData?.categoryId ?? 0,
              name: categoryData?.name ?? "",
              description: categoryData?.description ?? "",
              createdBy: `${id}`,
              isUsed: categoryData?.isUsed ?? true,
            }}
            validationSchema={SaveCategorySchema}
            onSubmit={(values: ISaveCategory) => HandleSubmit(values)}
          >
            {({ errors, touched, setFieldValue, values }) => (
              <Form>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="postalCode">Name</Label>
                    <Input
                      type="text"
                      id="name"
                      placeholder="name"
                      value={values.name}
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                      }}
                    />
                    {errors.name && touched.name ? (
                      <div className="text-red-700">{errors.name}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label>Description</Label>
                    <TextArea
                      value={values.description}
                      onChange={(value) => {
                        setFieldValue("description", value);
                      }}
                      rows={6}
                    />
                    {errors.description && touched.description ? (
                      <div className="text-red-700">{errors.description}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label>status</Label>
                    <Switch
                      label={values.isUsed ? "Is used" : "Non used"}
                      defaultChecked={categoryData?.isUsed ?? true}
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
                        navigate("/setting/category");
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
        {categoryData && (
          <ComponentCard
            title={`${!categoryData ? "Create" : "Update"} branch`}
            className="h-fit"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="postalCode">create by</Label>
                <Input
                  type="text"
                  id="postalCode"
                  placeholder="postalCode"
                  value={categoryData?.createdBy ?? ""}
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
                    categoryData &&
                    formatDateLocalized(categoryData?.createdDate, {
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
export default FormCategories;
