import React, { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { IDropDown, IResponse } from "../../../@types/global";
import Switch from "../../../components/form/switch/Switch";
import Button from "../../../components/ui/button/Button";
import { Form, Formik } from "formik";
import { SaveIngredientSchema } from "./Validation";
import { useAppSelector } from "../../../redux/store/hook";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { formatDateLocalized } from "../../../utils/date/formatDate";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import { IAllIngredient, ISaveIngredient } from "../../../@types/Ingredient/IngredientType";
import { useSaveIngredientMutation } from "../../../controller/Ingredient.Controllers";
import SearachSelect from "../../../components/form/SearachSelect";

const UnitData: IDropDown[] = [
  {
    value: 0,
    label: "มิลลิลิตร (ml)",
  },
  {
    value: 1,
    label: "ลิตร (L)",
  },
  {
    value: 2,
    label: "ช้อนชา (tsp)",
  },
  {
    value: 3,
    label: "ช้อนโต๊ะ (tbsp)",
  },
  {
    value: 4,
    label: "ออนซ์ (oz)",
  },
  {
    value: 5,
    label: "กรัม (g)",
  },
  {
    value: 6,
    label: "กิโลกรัม (kg)",
  },
  {
    value: 7,
    label: "ช้อนชา (tsp)",
  },
];
function FormIngredient() {
  //use hook
  const navigate = useNavigate();
  const location = useLocation();

  //setting value
  const { id }: any = useAppSelector((state) => state.auth.user);
  const ingredientData: IAllIngredient = location.state?.ingredient;
  // query
  const [saveIngredient] = useSaveIngredientMutation();

  //function
  const HandleSubmit = async (values: ISaveIngredient) => {
    const response: IResponse<any> = await saveIngredient(values);
    console.log(response)
    if (response && response.data) {
      const res = response.data;
      if (res?.statusCode == 200 && res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate("/setting/ingredient");
        }, 1000);
      }
    } else {
      toast.error(response.error.data.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Form-Ingredient" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard
          title={`${!ingredientData ? "Create" : "Update"} Ingredient`}
        >
          <Formik
            initialValues={{
              ingredientId: ingredientData?.ingredientId ?? 0,
              name: ingredientData?.name ?? "",
              unit: ingredientData?.unit ?? "",
              createdBy: `${id}`,
              isUsed: ingredientData?.isUsed ?? true,
            }}
            validationSchema={SaveIngredientSchema}
            onSubmit={(values: ISaveIngredient) => HandleSubmit(values)}
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
                <Label>branch</Label>
                <SearachSelect
                  options={UnitData}
                  placeholder="Unit"
                  onChange={(e: any) => {
                    setFieldValue("unit", e.label);
                  }}
                  className="w-full dark:bg-dark-900"
                />
              </div>
                  <div>
                    <Label>status</Label>
                    <Switch
                      label={values.isUsed ? "Is used" : "Non used"}
                      defaultChecked={ingredientData?.isUsed ?? true}
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
                        navigate("/setting/ingredient");
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
        {ingredientData && (
          <ComponentCard
            title={`${!ingredientData ? "Create" : "Update"} branch`}
            className="h-fit"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="postalCode">create by</Label>
                <Input
                  type="text"
                  id="postalCode"
                  placeholder="postalCode"
                  value={ingredientData?.createdBy ?? ""}
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
                    ingredientData &&
                    formatDateLocalized(ingredientData?.createdDate, {
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
export default FormIngredient;
