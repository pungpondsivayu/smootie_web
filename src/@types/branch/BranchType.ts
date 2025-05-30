export interface IAllBranch {
  branchId: number;
  branchName: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;   
  addressDetail: string;
	createdDate: string;
	createdBy: string;
  isUsed: boolean;
}

export interface ISaveBranch {
  branchId: number;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
  addressDetail: string;
  createdBy: string;
  isUsed: boolean;
}
