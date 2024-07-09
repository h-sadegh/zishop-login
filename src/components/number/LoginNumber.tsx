import { useEffect, useState } from "react";

// @ts-ignore
import styles from "./LoginNumber.module.css";

import { OtpType } from "../../Login.props";
import { useNavigate } from "react-router-dom";
import NavigationBarLogo from "../navigation/NavigationBarLogo";
import InputNumber from "../common/number";
import Button from "../common/button";
import { mobileValidation } from "../../util/Validation";
import { getState } from "../../store/Store";
import { ButtonTypes } from "../common/button/ButtonTypes.enum";
import { ButtonColorTypes } from "../common/button/ButtonColorTypes.enum";
import ZilinkPlatform from "../login/ZilinkPlatform";
import PrivacyAndPolicyText from "../login/PrivacyAndPolicyText";
import { useSendOtp } from "../../service/api/User";

function LoginNumber({
  isSuccessMobile,
  mobileBack,
  forceOTP,
}: {
  isSuccessMobile: (data: OtpType) => void;
  mobileBack?: string;
  forceOTP: boolean;
}) {
  const [mobile, setMobile] = useState<string>("");
  const navigate = useNavigate();
  const {
    mutate: sendOtp,
    isLoading,
    isSuccess,
    data,
    error,
    isError,
  } = useSendOtp();

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
        use_otp: data?.use_otp,
      });
    }
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  function submitForm(mobile: string) {
    if (isLoading) return;

    if (mobile?.length === 11 && mobile.match("^(\\+98|0098|98|0)?9\\d{9}$"))
      sendOtp({ username: mobile, force_otp: forceOTP });
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter" && mobile) submitForm(mobile);
  }

  function handleInputChange(value?: string) {
    setMobile(value || "");
  }

  return (
    <>
      <NavigationBarLogo />
      <div className={styles.container}>
        <div>
          <p className={styles.login_signup}>ورود/ ثبت‌نام</p>
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
            clearButton
          />
        </div>
        <div>
          <PrivacyAndPolicyText />
          <Button
            title={"ادامه"}
            icon={"/static/svg/Arrow-left-white.svg"}
            iconPosition="left"
            variant={ButtonTypes.CONTAINED}
            color={ButtonColorTypes.PRIMARY}
            loading={isLoading}
            disabled={isLoading || !mobileValidation(mobile)}
            onClick={() => submitForm(mobile)}
            contentStyle={{ width: "100%" }}
          />
        </div>
      </div>
    </>
  );
}

export default LoginNumber;
