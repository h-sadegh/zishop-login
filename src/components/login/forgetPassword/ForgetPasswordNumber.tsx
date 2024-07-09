import { useEffect, useState } from "react";

// @ts-ignore
import styles from "./ForgetPassword.module.css";

import ZilinkPlatform from "../ZilinkPlatform";
import { OtpType } from "../../../Login.props";
import { useNavigate } from "react-router-dom";
import { useForgetPassword } from "../../../service/api/User";
import { getState } from "../../../store/Store";
import NavigationBarLogo from "../../navigation/NavigationBarLogo";
import InputNumber from "../../common/number";
import Button from "../../common/button";
import { ButtonTypes } from "../../common/button/ButtonTypes.enum";
import { ButtonColorTypes } from "../../common/button/ButtonColorTypes.enum";
import { mobileValidation } from "../../../util/Validation";

function ForgetPasswordNumber({
  isSuccessMobile,
  mobileBack,
}: {
  isSuccessMobile: (data: OtpType) => void;
  mobileBack?: string;
}) {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState<string>("");
  const [inputErrorMsg, setInputErrorMsg] = useState<string>("");

  const {
    mutate: sendForgetPassword,
    isLoading,
    isSuccess,
    data,
    error,
    isError,
  } = useForgetPassword();

  // const {
  //   mutate: sendOtp,
  //   isLoading,
  //   isSuccess,
  //   data,
  //   error,
  //   isError,
  // } = useSendOtp();

  useEffect(() => {
    if (mobileBack) {
      setMobile(mobileBack);
    }
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isError) {
      const setNotify = getState("setNotify");
      setNotify({
        type: "error", // @ts-ignore
        text: error?.response?.data?.actionMessage,
      });
    }
  }, [isError]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isSuccess) {
      isSuccessMobile({
        otp_token: data?.otp_token ? data.otp_token : "",
        mobile,
      });
    }
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  function submitForm() {
    if (isLoading) return;

    if (mobile?.length === 11 && mobile.match("^(\\+98|0098|98|0)?9\\d{9}$")) {
      sendForgetPassword(mobile);
    } else setInputErrorMsg("شماره موبایل نادرست است.");
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter" && mobile) submitForm();
  }

  function handleInputChange(value?: string) {
    setMobile(value || "");
    if ((value || "").match("^(\\+98|0098|98|0)?9\\d{9}$"))
      setInputErrorMsg("");
  }

  const handleLoginWithOTP = () => {
    navigate("/user?otp=true");
  };

  const handleLoginWithPassword = () => {
    navigate("/user/with-password");
  };

  return (
    <>
      <NavigationBarLogo />
      <div className={styles.container}>
        <div>
          <p className={styles.forget_password}>فراموشی رمز عبور</p>
          <ZilinkPlatform />
          <InputNumber
            required
            useref={1}
            maxLength={11}
            label={"شماره موبایل"}
            value={mobile}
            onKeyDown={handleKeyDown}
            handlechange={handleInputChange}
            placeholder="لطفاً شماره موبایل خود را وارد کنید."
            subtext="شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود."
            error={inputErrorMsg}
            clearButton
          />
        </div>
        <div>
          <Button
            title={"تایید و ادامه"}
            icon={"/static/svg/arrow-right-white.svg"}
            iconPosition="right"
            variant={ButtonTypes.CONTAINED}
            color={ButtonColorTypes.PRIMARY}
            loading={isLoading}
            disabled={isLoading || !mobileValidation(mobile)}
            contentStyle={{ width: "100%" }}
            onClick={submitForm}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              onClick={handleLoginWithOTP}
              className={styles.change_phone_text}
            >
              {"ورود با رمز یک‌بار‌مصرف"}
            </div>
            <div
              style={{
                height: "24px",
                width: "1px",
                backgroundColor: "#D3D3D3",
              }}
            />
            <div
              onClick={handleLoginWithPassword}
              className={styles.change_phone_text}
            >
              {"ورود با رمز عبور"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPasswordNumber;
