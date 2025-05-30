import React, { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import { IDropDown, IResponse } from "../../../@types/global";
import Switch from "../../../components/form/switch/Switch";
import Button from "../../../components/ui/button/Button";
import { Form, Formik } from "formik";
import { SaveEmployeeSchema } from "./Validation";
import { useAppSelector } from "../../../redux/store/hook";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { formatDateLocalized, parseDateByMode } from "../../../utils/date/formatDate";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import {
  useLazyGetRoleDropdownQuery,
} from "../../../controller/Role.Controllers";
import {
  useLazyGetBranchDropdownQuery,
} from "../../../controller/Branch.Controllers";
import SearachSelect from "../../../components/form/SearachSelect";
import FileInput from "../../../components/form/input/FileInput";
import ResponsiveImage from "../../../components/ui/images/ResponsiveImage";
import { convertToSimpleFormData } from "../../../utils/SendForm";
import { IAllEmployee, ISaveEmployee } from "../../../@types/employee/EmployeeType";
import DatePicker from "../../../components/form/date-picker";
import { useSaveEmployeeMutation } from "../../../controller/Employee.Controllers";
import { EyeCloseIcon, EyeIcon } from "../../../icons";
import { Roles } from "../../../common/SD";
function FormEmployee() {
  //use hook
  const navigate = useNavigate();
  const location = useLocation();

  //setting value
  const employeeData: IAllEmployee = location.state?.employee;
  const role: string = location.state?.role;
  const branch: string = location.state?.branch;
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(employeeData?.image ?? "");
  const [branchDropdown, setCBranchDropdown] = useState<IDropDown[]>([]);
  const [roleDropdown, setRoleDropdown] = useState<IDropDown[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const { user }: any = useAppSelector((state) => state.auth);
  // query
  const [saveEmployee] = useSaveEmployeeMutation();
  const [getRoleDropdown] = useLazyGetRoleDropdownQuery();
  const [getBranchDropdown] = useLazyGetBranchDropdownQuery();

  //function
  const HandleSubmit = async (values: ISaveEmployee) => {
    const formData = convertToSimpleFormData(values);
    const response: IResponse<any> = await saveEmployee(formData);
    if (response && response.data) {
      const res = response.data;
      if (res?.statusCode == 200 && res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          navigate("/setting/employee");
        }, 1000);
      }
    } else {
      toast.error(response.error.data.message);
    }
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

  async function fetchRoleDropdown() {
    setLoading(true);
    const res = await getRoleDropdown(null);
    setLoading(false);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setRoleDropdown(data);
    }
  }

  const HandleFile = async (File: React.ChangeEvent<HTMLInputElement>) => {
    if (File.target.files && File.target.files[0]) {
      setImageUrl(URL.createObjectURL(File.target.files[0]));
    }
  };

  useEffect(() => {
    Promise.all([fetchBranchDropdown() , fetchRoleDropdown()])
  }, []);

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Form-employee" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard
          title={`${!employeeData ? "Create" : "Update"} employee`}
        >
          <Formik
            initialValues={{
              EmployeeId: employeeData?.employeeId ?? 0,
              BranchId: user ? user.branchId : employeeData?.branchId ?? 0,
              RoleId: employeeData?.roleId ?? 0,
              Fullname: employeeData?.fullname ?? "",
              Email: employeeData?.email ?? "",
              PhoneNumber: employeeData?.email ?? "",
              PasswordHash: employeeData?.passwordHash ?? "",
              HireDate: employeeData?.hireDate ?? "",
              Status: employeeData?.status ?? "Active",
              CreatedBy: `${user.id}`,
              IsUsed: employeeData?.isUsed ?? true,
              ImageFile: "",
            }}
            validationSchema={SaveEmployeeSchema}
            onSubmit={(values: ISaveEmployee) => HandleSubmit(values)}
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
                  {user.role == Roles.ADMIN && (
                    <div>
                      <Label htmlFor="Branch">
                        Branch - {branch && branch}
                      </Label>
                      <SearachSelect
                        options={branchDropdown}
                        placeholder="Branch"
                        onChange={(e: any) => {
                          setFieldValue("BranchId", e.value);
                        }}
                        className="w-full dark:bg-dark-900"
                      />
                      {errors.BranchId && touched.BranchId ? (
                        <div className="text-red-700">{errors.BranchId}</div>
                      ) : null}
                    </div>
                  )}

                  <div>
                    <Label htmlFor="Role">Role - {role && role}</Label>
                    <SearachSelect
                      options={roleDropdown}
                      placeholder="Role"
                      onChange={(e: any) => {
                        setFieldValue("RoleId", e.value);
                      }}
                      className="w-full dark:bg-dark-900"
                    />
                    {errors.RoleId && touched.RoleId ? (
                      <div className="text-red-700">{errors.RoleId}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="Fullname">Fullname</Label>
                    <Input
                      type="text"
                      id="Fullname"
                      placeholder="Fullname"
                      value={values.Fullname}
                      onChange={(e) => {
                        setFieldValue("Fullname", e.target.value);
                      }}
                    />
                    {errors.Fullname && touched.Fullname ? (
                      <div className="text-red-700">{errors.Fullname}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="Email">Email</Label>
                    <Input
                      type="text"
                      id="Email"
                      placeholder="Email"
                      value={values.Email}
                      onChange={(e) => {
                        setFieldValue("Email", e.target.value);
                      }}
                    />
                    {errors.Email && touched.Email ? (
                      <div className="text-red-700">{errors.Email}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="PhoneNumber">PhoneNumber</Label>
                    <Input
                      type="text"
                      id="PhoneNumber"
                      placeholder="PhoneNumber"
                      value={values.PhoneNumber}
                      onChange={(e) => {
                        setFieldValue("PhoneNumber", e.target.value);
                      }}
                    />
                    {errors.PhoneNumber && touched.PhoneNumber ? (
                      <div className="text-red-700">{errors.PhoneNumber}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="PasswordHash">PasswordHash</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        value={values.PasswordHash}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("PasswordHash", e.target.value)
                        }
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                    {errors.PasswordHash && touched.PasswordHash ? (
                      <div className="text-red-700">{errors.PasswordHash}</div>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="Password ">HireDate </Label>
                    <DatePicker
                      mode="single"
                      id="Password"
                      placeholder="HireDate"
                      defaultDate={employeeData?.hireDate}
                      onChange={(e) => {
                        setFieldValue(
                          "HireDate",
                          parseDateByMode(
                            e[0].toLocaleDateString("sv-SE"),
                            "toisostring"
                          )
                        );
                      }}
                    />
                    {errors.HireDate && touched.HireDate ? (
                      <div className="text-red-700">{errors.HireDate}</div>
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
                    <Label>Status work</Label>
                    <Switch
                      label={
                        values.Status == "Active" ? "Active" : "Non Active"
                      }
                      defaultChecked={
                        employeeData?.status == "Active"
                          ? true
                          : values.Status == "Active"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        setFieldValue("Status", e ? "Active" : "Non Active");
                      }}
                    />
                  </div>
                  <div>
                    <Label>status</Label>
                    <Switch
                      label={values.IsUsed ? "Is used" : "Non used"}
                      defaultChecked={employeeData?.isUsed ?? true}
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
                        navigate("/setting/employee");
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
        {employeeData && (
          <ComponentCard
            title={`${!employeeData ? "Create" : "Update"} branch`}
            className="h-fit"
          >
            <div className="space-y-6">
              <div>
                <Label htmlFor="postalCode">create by</Label>
                <Input
                  type="text"
                  id="postalCode"
                  placeholder="postalCode"
                  value={employeeData?.createdBy ?? ""}
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
                    employeeData &&
                    formatDateLocalized(employeeData?.createdDate, {
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
export default FormEmployee;
