import { IUserResponse } from "../@types/global";
import { BaseApi } from "../helper/controller/ConfigQuery";
import { setLoggedInUser } from "../redux/slice/auth.slice";
import { jwtDecode } from "jwt-decode";

export const AuthController = BaseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userReq) => ({
        url: "authen/login",
        method: "POST",
        header: {
          "Content-type": "application/json",
        },
        body: userReq,
      }),
      onQueryStarted: async (userId, { dispatch, queryFulfilled }) => {
        try {
          const user: IUserResponse = (await queryFulfilled).data.data;
          localStorage.setItem("accessToken", user.token.accessToken);
          localStorage.setItem("refreshToken", user.token.refreshToken);
          dispatch(setLoggedInUser(user));
        } catch (error) {
          console.error("error : ", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = AuthController;
