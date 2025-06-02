import { Roles } from "../../common/SD";
import { GridIcon } from "../../icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartLine,
  faChartPie,
  faGear,
  faNetworkWired,
  faTableList,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  role?: string[];
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const navItems: NavItem[] = [
  {
    icon: <FontAwesomeIcon icon={faChartPie} />,
    name: "Dashboard",
    role: [Roles.ADMIN, Roles.Manager, Roles.Starf],
    path: "/dashboard",
  },
  {
    icon: <FontAwesomeIcon icon={faCashRegister} />,
    name: "Sale",
    role: [Roles.Manager, Roles.Starf],
    path: "/sale",
  },
  {
    icon: <FontAwesomeIcon icon={faTableList} />,
    name: "Order",
    role: [Roles.ADMIN, Roles.Manager, Roles.Starf],
    path: "/order",
  },
  {
    icon: <FontAwesomeIcon icon={faWarehouse} />,
    name: "Warehouse",
    role: [Roles.Manager, Roles.Starf],
    subItems: [
      { name: "warehouse", path: "/warehouse", pro: false },
      { name: "couter", path: "/warehouse/couter", pro: false },
    ],
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    name: "Setting",
    role: [Roles.ADMIN],
    subItems: [
      { name: "Branch", path: "/setting/branch", pro: false },
      { name: "Category", path: "/setting/category", pro: false },
      { name: "Menu", path: "/setting/menu", pro: false },
      { name: "ingredient", path: "/setting/ingredient", pro: false },
      { name: "employee", path: "/setting/employee", pro: false },
    ],
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    name: "Setting",
    role: [Roles.Manager],
    subItems: [
      { name: "employee", path: "/setting/employee", pro: false },
      { name: "Menu", path: "/setting/menu", pro: false },
    ],
  },
   {
    icon: <FontAwesomeIcon icon={faGear} />,
    name: "Setting",
    role: [Roles.Starf],
    subItems: [
      { name: "Menu", path: "/setting/menu", pro: false },
    ],
  },
];
export const othersItems: NavItem[] = [];
