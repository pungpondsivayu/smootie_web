import { ComponentType } from "react";
import MainDashborad from "../view/Dashboard/MainDashborad";
import MainBranch from "../view/setting/branch/MainBranch";
import FormBranch from "../view/setting/branch/FormBranch";
import MainCategory from "../view/setting/categories/MainCategories";
import MainMenu from "../view/setting/menu/MainMenu";
import FormMenu from "../view/setting/menu/FormMenu";
import MainIngredient from "../view/setting/Ingredient/MainIngredient";
import FormIngredient from "../view/setting/Ingredient/FormIngredient";
import MainEmployee from "../view/setting/employee/MainEmployee";
import FormEmployee from "../view/setting/employee/FormEmployee";
import FormCategories from "../view/setting/categories/FormCategories";
import MainSale from "../view/Sale/MainSale";
import MainWarehouse from "../view/warehouse/MainWarehouse";
import { Roles } from "../common/SD";
import MainTransection from "../view/warehouse/MainTransection";
import TransectionForm from "../view/warehouse/TransectionForm";
import MainOrder from "../view/order/MainOrder";
import OrderDetail from "../view/order/OrderDetail";
import MainCouterStock from "../view/warehouse/MainCouterStock";

interface IroutesConfig {
  path: string;
  component: ComponentType<any>;
  allowedRoles: string[];
}

const routeConfig: IroutesConfig[] = [
  // user route
  // admin route
  { path: "/dashboard", component: MainDashborad, allowedRoles: ["Admin" , "Manager" , "Starf"] },
  { path: "/setting/branch", component: MainBranch, allowedRoles: ["Admin"] },
  { path: "/setting/branch/form", component: FormBranch, allowedRoles: ["Admin"]},
  { path: "/setting/category", component: MainCategory, allowedRoles: ["Admin"] },
  { path: "/setting/category/form", component: FormCategories, allowedRoles: ["Admin"] },
  { path: "/setting/menu", component: MainMenu, allowedRoles: ["Admin","Manager","Starf"] },
  { path: "/setting/menu/form", component: FormMenu, allowedRoles: ["Admin"]},
  { path: "/setting/ingredient", component: MainIngredient, allowedRoles: ["Admin"] },
  { path: "/setting/ingredient/form", component: FormIngredient, allowedRoles: ["Admin"] },
  { path: "/setting/employee", component: MainEmployee, allowedRoles: ["Admin", "Manager"] },
  { path: "/setting/employee/form", component: FormEmployee, allowedRoles: ["Admin" , "Manager"] },
  { path: "/sale", component: MainSale, allowedRoles: ["Manager" , "Starf"] },
  { path: "/order", component: MainOrder, allowedRoles: ["Admin" ,"Manager" , "Starf"] },
  { path: "/order/detail", component: OrderDetail, allowedRoles: ["Admin" ,"Manager" , "Starf"] },
  { path: "/warehouse", component: MainWarehouse, allowedRoles: ["Manager","Starf"]},
  { path: "/warehouse/transection", component: MainTransection, allowedRoles: ["Manager","Starf"]},
  { path: "/warehouse/transection/form", component: TransectionForm, allowedRoles: ["Manager","Starf"]},
  { path: "/warehouse/couter", component: MainCouterStock, allowedRoles: ["Manager","Starf"]},
  
];

export const PublicRoutes = routeConfig.filter(
  (route) => route.allowedRoles.length === 0
);
export const PrivateRoutes = routeConfig.filter(
  (route) => route.allowedRoles.length > 0
);
