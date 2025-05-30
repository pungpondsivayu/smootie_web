export interface IPagin {
  currentPage: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
}

export interface IResponse<T extends Record<string, any>> {
  data?: {
    data?: T;
    pagin?: IPagin;
    statusCode: number;
    success: boolean;
    message: string;
  };
  error?: any;
}

export interface IDropDown<T = number> {
  value: T;
  label: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUserResponse {
  id: string;
  fullName: string;
  email: string;
  profile: string;
  role: string;
  branchId: number,
  token: IToken;
}

export interface IAuthState {
  user: IUserResponse | null;
  isAuthenticated: boolean;
}

export interface ILoginReq {
  email: string;
  password: string;
}

export interface IDeleteReq {
  id: number | string;
  name: string;
}
