export interface IAllEmployee{
    employeeId: number,
    branchId: number,
    roleId: number,
    fullname: string,
    email: string,
    phoneNumber: string,
    passwordHash: string,
    hireDate: string,
    status: string,
    createdDate: string,
    createdBy: string,
    isUsed: boolean,
    image: string
    branch : Branch,
    role : Role
}

export interface ISaveEmployee {
    EmployeeId : number,
    BranchId  : number,
    RoleId  : number,
    Fullname  : string,
    Email  : string,
    PhoneNumber : string,
    PasswordHash  : string,
    HireDate  : string,
    Status  : string,
    CreatedBy  : string,
    IsUsed  : boolean,
    ImageFile: File | string   
}

export interface Branch{
  branchId: number,
  name: string
}

export interface Role{
    roleId: number,
    name: string
  }