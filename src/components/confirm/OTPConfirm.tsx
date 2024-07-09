import { useEffect, useState } from "react";
// @ts-ignore
import styles from "./OTPConfirm.module.css";
import cookie from "js-cookie";
import * as React from "react";
import { OtpType } from "../../Login.props";
import { OTPInput } from "input-otp";
import { useNavigate } from "react-router-dom";
import {
  useForgetPassword,
  useSendOtp,
  useVerifyOtp,
} from "../../service/api/User";
import { getState, getStatePersist } from "../../store/Store";
import NavigationBarLogo from "../navigation/NavigationBarLogo";
import Button from "../common/button";
import { ButtonTypes } from "../common/button/ButtonTypes.enum";
import { ButtonColorTypes } from "../common/button/ButtonColorTypes.enum";

function OTPConfirm({
  dataOtp,
  handleEditMobile,
  handleSubmitLogin,
  forceOTP,
  isForgetPassword = false,
}: {
  dataOtp: OtpType;
  handleEditMobile: (mobile: string) => void;
  handleSubmitLogin: (existed: any) => void;
  forceOTP: boolean;
  isForgetPassword?: boolean;
}) {
  const [otpCode, setOtpCode] = useState<string>();
  const [seconds, setSeconds] = useState(120);
  const [token, setToken] = useState<string>(dataOtp.otp_token);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [otpToken, setOtpToken] = useState(dataOtp.otp_token);

  const navigate = useNavigate();

  const {
    isLoading,
    data: verifyOTPData,
    isSuccess,
    mutate: verifyOtp,
    isError: verifyOTPError,
  } = useVerifyOtp();

  const {
    mutate: sendOtp,
    data: otpData,
    isSuccess: sendOTPIsSuccess,
    error,
    isError,
  } = useSendOtp();

  const {
    mutate: sendForgetPassword,
    isLoading: FPLoading,
    isSuccess: FPIsSuccess,
    data: FPData,
    error: FPError,
    isError: FPIsError,
  } = useForgetPassword();

  useEffect(() => {
    if (!isSuccess) return;
    const date = new Date();
    date.setTime(+date + 60 * 86400000);
    cookie.set("auth", verifyOTPData.access_token, { expires: date });
    const setUserMobile = getStatePersist("setUserMobile");
    setUserMobile(dataOtp.mobile);
    handleSubmitLogin(verifyOTPData);
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (verifyOTPError) setOtpCode("");
  }, [verifyOTPError]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (sendOTPIsSuccess) {
      if (otpData?.otp_token) {
        setOtpToken(otpData?.otp_token);
        setSeconds(120);
      }
    }
  }, [sendOTPIsSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleOtpSubmit(value?: string) {
    if (value && value.length === 4)
      verifyOtp({
        username: dataOtp.mobile,
        otp_token: otpToken,
        otp_code: value,
      });
    else {
      const setNotify = getState("setNotify");
      setNotify({
        type: "warning",
        text: "کد تایید باید ۴ رقمی باشد",
      });
    }
    // router.push("/user/submit-information");
  }

  function handleOtpChange(value: string) {
    setOtpCode(value);
    if (value.length === 4) handleOtpSubmit(value);
  }

  function handleBack() {
    handleEditMobile(dataOtp.mobile);
  }

  function handleLoginWithPassword() {
    navigate("/user/with-password");
  }

  useEffect(() => {
    // Exit early if countdown is finished
    if (seconds <= 0) {
      return;
    }

    // Set up the timer
    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const otpAgain = () => {
    if (isForgetPassword) {
      sendForgetPassword(dataOtp.mobile);
    } else sendOtp({ username: dataOtp.mobile, force_otp: forceOTP });
  };

  return (
    <>
      <NavigationBarLogo />
      <form className={styles.container} ref={formRef}>
        <div style={{ maxWidth: 600 }}>
          <p className={styles.login_signup}>تایید شماره موبایل</p>
          <p className={styles.otp_description}>
            {"کد تایید به شماره موبایل "}
            <span className={styles.phone_number_text}>{dataOtp.mobile}</span>
            {" ارسال شد."}
          </p>

          <OTPInput
            autoFocus
            maxLength={4}
            style={{ width: "calc" }}
            value={otpCode}
            onChange={handleOtpChange}
            render={({ slots }) => (
              <div className={styles.opt_container}>
                {slots.map((slot, idx) => (
                  <div key={idx} {...slot} className={styles.otp_input}>
                    {slot.char}
                    {/* Fake Caret */}
                    {slot.hasFakeCaret && (
                      <div className={styles.otp_caret_container}>
                        <div className={styles.otp_caret} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          />
          {seconds > 0 ? (
            <div className={styles.confirm_timer}>
              {formatTime(seconds)} تا درخواست مجدد کد
            </div>
          ) : (
            <div onClick={otpAgain} className={styles.reload_timer}>
              <img
                style={{ width: 12, height: 12 }}
                src="/static/svg/search01.svg"
                width={12}
                height={12}
                alt="reload"
                color="#007AFF"
              />
              <p className={styles.reload_timer_typography}>
                ارسال مجدد کد با پیامک
              </p>
            </div>
          )}
        </div>
        <div>
          <Button
            title={"تایید و ادامه"}
            icon={"/static/svg/arrow-right.svg"}
            iconPosition="right"
            variant={ButtonTypes.CONTAINED}
            color={ButtonColorTypes.PRIMARY}
            loading={isLoading}
            disabled={isLoading}
            contentStyle={{ width: "100%" }}
            onClick={() => handleOtpSubmit(otpCode)}
          />
          {isForgetPassword ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                onClick={handleLoginWithPassword}
                className={styles.change_phone_text}
              >
                {"ورود با کلمه عبور"}
              </div>
              <div
                style={{
                  height: "24px",
                  width: "1px",
                  backgroundColor: "#D3D3D3",
                }}
              />
              <div
                // href={""}
                onClick={handleBack}
                className={styles.change_phone_text}
              >
                {"تغییر شماره موبایل"}
              </div>
            </div>
          ) : (
            <div
              // href={""}
              onClick={handleBack}
              className={styles.change_phone_text}
            >
              {"تغییر شماره موبایل"}
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default OTPConfirm;
