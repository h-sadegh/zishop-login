import { useEffect, useState } from "react";
import cookie from "js-cookie";
// @ts-ignore
import styles from "./WithPassword.module.css";
import InputNumber from "../common/number";
import Input from "../common/input";
import { useNavigate } from "react-router-dom";
import NavigationBarLogo from "../navigation/NavigationBarLogo";
import { mobileValidation } from "../../util/Validation";
import { useLoginWithPassword } from "../../service/api/User";
import ZilinkPlatform from "../login/ZilinkPlatform";
import Button from "../common/button";
import { ButtonTypes } from "../common/button/ButtonTypes.enum";
import { ButtonColorTypes } from "../common/button/ButtonColorTypes.enum";

const WithPassword = ({
  defaultMobile,
  loginWithOTP,
}: {
  defaultMobile?: string;
  loginWithOTP: (mobile: string) => void;
}) => {
  const [mobile, setMobile] = useState<string>(defaultMobile ?? "");
  const [inputErrorMsg, setInputErrorMsg] = useState<string>("");
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState<string>("");
  const { isLoading, data, isSuccess, mutate: login } = useLoginWithPassword();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuccess) return;
    const date = new Date();
    date.setTime(+date + 60 * 86400000);
    cookie.set("auth", data.access_token, { expires: date });
    navigate("/profile/personal-information", { replace: true });
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && mobile && password.length >= 8) submitForm();
  };

  const handlePhoneNumberChange = (value?: string) => {
    setMobile(value || "");
    if (mobileValidation(mobile)) setInputErrorMsg("");
  };

  const handlePasswordChange = (value?: string) => {
    setPassword(value || "");
  };

  const handleLoginWithOTP = () => {
    if (loginWithOTP) loginWithOTP(mobile);
    else navigate("/user?otp=true");
  };

  const submitForm = () => {
    login({ username: mobile, password: password });
  };

  const handleForgetPassword = () => {
    navigate("/user/forget-password");
  };

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
            handlechange={handlePhoneNumberChange}
            placeholder="لطفاً شماره موبایل خود را وارد کنید."
            error={inputErrorMsg}
            style={{ marginBottom: "32px" }}
          />
          <Input
            required
            useref={1}
            label={"رمز عبور"}
            value={password}
            onKeyDown={handleKeyDown}
            handlechange={handlePasswordChange}
            placeholder="لطفاً رمز عبور خود را وارد کنید."
            error={inputErrorMsg}
            type={!showPass ? "password" : "text"}
            customIcon="/static/svg/invisible.svg"
            handleCustomIconClicked={() => setShowPass(!showPass)}
          />
        </div>
        <div>
          <Button
            title={"تایید و ادامه"}
            icon={"/static/svg/arrow-right-white.svg"}
            iconPosition="right"
            variant={ButtonTypes.CONTAINED}
            color={ButtonColorTypes.PRIMARY}
            contentStyle={{ width: "100%" }}
            onClick={submitForm}
            loading={isLoading}
            disabled={
              isLoading || !mobileValidation(mobile) || password.length < 8
            }
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
              onClick={handleForgetPassword}
              className={styles.change_phone_text}
            >
              {"فراموشی رمز عبور"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithPassword;
