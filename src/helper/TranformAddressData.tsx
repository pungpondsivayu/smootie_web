// addressUtils.ts

import { IDropDown } from "../@types/global";
import addressData  from "../helper/json/addressData.json";

export const getProvinces = (): IDropDown[] => {
  const map = new Map<number, string>();
  addressData.forEach(item => map.set(item.ProvincesId, item.ProvincesNameTh));
  return Array.from(map).map(([value, label]) => ({ value, label }));
};

export const getDistrictsByProvince = (provinceId: number): IDropDown[] => {
  const map = new Map<number, string>();
  addressData
    .filter(item => item.ProvincesId === provinceId)
    .forEach(item => map.set(item.DistrictsId, item.DistrictsNameTh));
    return Array.from(map).map(([value, label]) => ({ value, label }));
  };

export const getSubdistrictsByDistrict = (districtId: number): IDropDown[] => {
  const map = new Map<number, string>();
  addressData
    .filter((item) => item.DistrictsId === districtId)
    .forEach((item) => map.set(item.SubdistrictsId, item.SubdistrictsNameTh));
  return Array.from(map).map(([value, label]) => ({ value, label }));
};


export const getProvincesฺByname = (searchName?: string): IDropDown[] => {
  const map = new Map<number, string>();

  addressData.forEach((item) => {
    const provinceName = item.ProvincesNameTh;

    // ถ้ามี searchName และไม่ตรงกับชื่อ => ข้าม
    if (searchName && !provinceName.includes(searchName)) return;

    map.set(item.ProvincesId, provinceName);
  });

  return Array.from(map).map(([value, label]) => ({ value, label }));
};

// ดึงอำเภอจากชื่อจังหวัด
export const getDistrictsByProvinceName = (provinceNameTh: string): IDropDown[] => {
  const map = new Map<number, string>();
  addressData
    .filter(item => item.ProvincesNameTh === provinceNameTh)
    .forEach(item => map.set(item.DistrictsId, item.DistrictsNameTh));
  return Array.from(map).map(([value, label]) => ({ value, label }));
};

// ดึงตำบลจากชื่ออำเภอ
export const getSubdistrictsByDistrictName = (districtNameTh: string): IDropDown[] => {
  const map = new Map<number, string>();
  addressData
    .filter(item => item.DistrictsNameTh === districtNameTh)
    .forEach(item => map.set(item.SubdistrictsId, item.SubdistrictsNameTh));
  return Array.from(map).map(([value, label]) => ({ value, label }));
};
