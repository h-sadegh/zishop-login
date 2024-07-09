import { Axios, getHeader } from "../Axios";
import { useMutation } from "react-query";
import { ConfirmType, ForgetPasswordType, LoginType } from "../../Login.props";
import { getState, getStatePersist } from "../../store/Store";
import { ProfileType } from "../../components/profile/Profile.props";

export const useLoginWithPassword = () => {
  return useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const res = await Axios({
        url: "/users/sign-in/",
        method: "post",
        headers: {
          ...getHeader(),
          "Content-Type": "application/json",
        },
        data: { username, password },
      });
      // const setNotify = getState("setNotify");
      // if (res.status !== 200 && res.status !== 201)
      //   setNotify({ text: `نام‌کاربری یا رمز عبور وارد شده اشتباه است!` });
      return res.data as ConfirmType;
    },
  );
};

export const useSendOtp = () => {
  return useMutation(
    async ({
      username,
      force_otp,
    }: {
      username: string;
      force_otp: boolean;
    }) => {
      if (!username) return;
      const res = await Axios({
        url: "otp/make-otp/",
        method: "post",

        data: { username, force_otp: force_otp },
      });
      return res.data as LoginType;
    },
  );
};

export const useUpdateProfile = () => {
  return useMutation(
    async ({ data, user_id }: { data: ProfileType; user_id: string }) => {
      const res = await Axios({
        url: `users/${user_id}/`,
        method: "patch",
        data,
      });
      const setNotify = getState("setNotify");
      if ([200, 201].indexOf(res.status) >= 0) {
        setNotify({ text: `تغییرات با موفقیت اعمال شد` });
        const setUser = getStatePersist("setUser");
        setUser(res?.data);
      }
      return res.data;
    },
  );
};

export const useVerifyOtp = () => {
  return useMutation(
    async ({
      username,
      otp_code,
      otp_token,
    }: {
      username: string;
      otp_code: string;
      otp_token: string;
    }) => {
      const res = await Axios({
        url: "/otp/sign-in/",
        method: "post",
        headers: {
          ...getHeader(),
          "Content-Type": "application/json",
        },
        data: { username, otp_code, otp_token },
      });
      return res.data as ConfirmType;
    },
  );
};

export const useForgetPassword = () => {
  return useMutation(async (username: string) => {
    if (!username) return;
    const res = await Axios({
      url: "users/forget-password/",
      method: "post",

      data: { username },
    });
    return res.data as ForgetPasswordType;
  });
};
