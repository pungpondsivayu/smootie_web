import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import Badge from "../../../components/ui/badge/Badge";
import { IDropDown, IPagin, IResponse } from "../../../@types/global";
import {
  LoadingTable,
  NoInfoFound,
} from "../../../components/global/AnimateTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../../../components/global/Tooltip";
import { useNavigate } from "react-router";
import {
  IAllMenu,
  IAllMenuRecip,
  ISaveMenuRecipe,
} from "../../../@types/menu/MenuType";
import ImageViewer from "../../../components/global/ImageViewer";
import { useAppSelector } from "../../../redux/store/hook";
import { Roles } from "../../../common/SD";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import { useEffect, useState } from "react";
import { useDeleteMenuRecipeMutation, useLazyGetAlMenurecipeByMenuIdQuery, useSaveMenuRecipeMutation } from "../../../controller/MenuRecipe.Controllers";
import Button from "../../../components/ui/button/Button";
import { Form, Formik } from "formik";
import { SaveMenuRecipeSchema } from "./Validation";
import SearachSelect from "../../../components/form/SearachSelect";
import Label from "../../../components/form/Label";
import { useLazyGetIngredientDropdownQuery } from "../../../controller/Ingredient.Controllers";
import Input from "../../../components/form/input/InputField";
import { ISaveIngredient } from "../../../@types/Ingredient/IngredientType";
import toast from "react-hot-toast";

interface IProps {
  data: IAllMenu[];
  loading: boolean;
  pagin: IPagin;
  onDelete: (id: number, string: string) => void;
}

export default function Showdata({ data, pagin, loading, onDelete }: IProps) {
  //use hook
  const navigate = useNavigate();
  const [Data, setData] = useState<IAllMenuRecip[]>([]);
  const [ingredientDeowdown, setIngredientDeowdown] = useState<IDropDown[]>([]);
  const [SaveMeurecipe, setSaveMeurecipe] = useState<ISaveMenuRecipe>();
  const [selectMenuId, setSelectMenuId] = useState<number>(0);
  const [isCreateMenuRecipe, setIsCreateMenuRecipe] = useState<boolean>(true);
  const [selectUpdateMenuRecipe, serSelectUpdateMenuRecipe] =
    useState<number>(0);
  const { isOpen, openModal, closeModal } = useModal();
  const { user }: any = useAppSelector((state) => state.auth);


  //function
  const [GetAlMenurecipe] = useLazyGetAlMenurecipeByMenuIdQuery();
  const [GetIngredientDropdown] = useLazyGetIngredientDropdownQuery();
  const [SaveMenuRecipe] = useSaveMenuRecipeMutation();
  const [DeleteMenuRecupe] = useDeleteMenuRecipeMutation();


 // fuction 
  async function fetchAllIMenuRecipe(manuId: number) {
    const res = await GetAlMenurecipe(manuId);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setData(data);
    }
  }

  async function fetchIngredientDropdown() {
    const res = await GetIngredientDropdown(null);
    if (res.data && !res.isError) {
      const { data } = res.data;
      setIngredientDeowdown(data);
    }
  }


  const HandleSubmit = async (values: ISaveMenuRecipe) => {
    const response: IResponse<any> = await SaveMenuRecipe(values);
    if (response && response.data) {
      const res = response.data;
      if (res?.statusCode == 200 && res?.success) {
        toast.success(res?.message);
        setTimeout(() => {
          setIsCreateMenuRecipe(true);
          fetchAllIMenuRecipe(selectMenuId);
        }, 1000);
      }
    } else {
      toast.error(response.error.data.message);
    }
  }

  useEffect(() => {
    isOpen ? fetchAllIMenuRecipe(selectMenuId) : setData([]);
  }, [isOpen]);

  useEffect(() => {
    if (isCreateMenuRecipe) {
      serSelectUpdateMenuRecipe(0);
      setSaveMeurecipe({
        recipeId: 0,
        menuId: 0,
        ingredientId: 0,
        quantity: 0,
        createdBy: "",
      });
    } else {
      fetchIngredientDropdown();
    }
  }, [isCreateMenuRecipe]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                No.
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Image
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              ></TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {loading ? (
              <LoadingTable colSpan={6} type="table" />
            ) : data && data.length === 0 ? (
              <NoInfoFound colSpan={6} />
            ) : (
              data &&
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}
                  </TableCell>
                  <TableCell className=" px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <ImageViewer src={item.image} name={item.name} />
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.category.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={item.isUsed ? "success" : "error"}>
                      {item.isUsed ? "Active" : "Non-active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Tooltip content={"สูตรเมนู"} color="success">
                      <FontAwesomeIcon
                        icon={faList}
                        className="text-xl text-success-400 cursor-pointer"
                        onClick={() => {
                          openModal();
                          setSelectMenuId(item.menuId);
                        }}
                      />
                    </Tooltip>
                    {user.role == Roles.ADMIN && (
                      <div className="flex gap-2">
                        <Tooltip content={"แก้ไขข้อมูล"} color="warning">
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="text-xl text-warning-400 cursor-pointer"
                            onClick={() => {
                              navigate("/setting/menu/form", {
                                state: {
                                  menu: item,
                                  category: item.category.name,
                                }, // ส่งข้อมูลไปหน้าแก้ไข
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip content={"ลบข้อมูล"} color="danger">
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="text-xl text-red-400 cursor-pointer"
                            onClick={() => onDelete(item.menuId, item.name)}
                          />
                        </Tooltip>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[780px] p-6 lg:p-10"
        >
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              Menu recipe
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              expedita dicta aperiam fuga soluta iure?
            </p>

            <div className="mt-8">
              <div className="flex justify-between mb-3">
                {user.role == Roles.ADMIN && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsCreateMenuRecipe(!isCreateMenuRecipe);
                    }}
                  >
                    Create new
                  </Button>
                )}
              </div>
              {isCreateMenuRecipe ? (
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Name
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Category
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Status
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      ></TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {Data && Data.length === 0 ? (
                      <NoInfoFound colSpan={6} />
                    ) : (
                      Data &&
                      Data.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {item.name}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {item.unit}
                          </TableCell>
                          <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {user.role == Roles.ADMIN && (
                              <div className="flex gap-2">
                                <Tooltip
                                  content={"แก้ไขข้อมูล"}
                                  color="warning"
                                >
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="text-xl text-warning-400 cursor-pointer"
                                    onClick={() => {
                                      setIsCreateMenuRecipe(false);
                                      setSaveMeurecipe({
                                        recipeId: item.recipeId,
                                        menuId: 0,
                                        ingredientId: item.ingredientId,
                                        quantity: item.quantity,
                                        createdBy: "",
                                      });
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip content={"ลบข้อมูล"} color="danger">
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className="text-xl text-red-400 cursor-pointer"
                                    onClick={() => {
                                      DeleteMenuRecupe(item.recipeId)
                                      fetchAllIMenuRecipe(selectMenuId)
                                    }
                                    }
                                  />
                                </Tooltip>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              ) : (
                <Formik
                  initialValues={{
                    recipeId: SaveMeurecipe?.recipeId ?? 0,
                    menuId: selectMenuId,
                    ingredientId: SaveMeurecipe?.ingredientId ?? 0,
                    quantity: SaveMeurecipe?.quantity ?? 0,
                    createdBy: `${user.id}`,
                  }}
                  validationSchema={SaveMenuRecipeSchema}
                  onSubmit={(values: ISaveMenuRecipe) => HandleSubmit(values)}
                >
                  {({ errors, touched, setFieldValue, values }) => (
                    <Form className="space-y-6">
                      <div>
                        <Label htmlFor="Price">Ingredient</Label>
                        <SearachSelect
                          options={ingredientDeowdown}
                          placeholder="category"
                          onChange={(e: any) => {
                            setFieldValue("ingredientId", e.value);
                          }}
                          className="w-full dark:bg-dark-900"
                        />
                        {errors.ingredientId && touched.ingredientId ? (
                          <div className="text-red-700">
                            {errors.ingredientId}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <Label htmlFor="quantity">quantity</Label>
                        <Input
                          type="number"
                          id="quantity"
                          placeholder="quantity"
                          value={values.quantity}
                          onChange={(e) => {
                            setFieldValue("quantity", e.target.value);
                          }}
                        />
                        {errors.quantity && touched.quantity ? (
                          <div className="text-red-700">{errors.quantity}</div>
                        ) : null}
                      </div>
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setIsCreateMenuRecipe(true);
                          }}
                        >
                          cancel
                        </Button>
                        <Button size="sm" variant="success" type="submit">
                          Save
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
