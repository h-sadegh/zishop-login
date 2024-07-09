import ZilinkPlatform from "../ZilinkPlatform";
import { useEffect, useState } from "react";
// @ts-ignore
import styles from "./ForgetPassword.module.css";
// @ts-ignore
import passwordValidationStyles from "../PasswordValidation.module.css";
import { jwtDecode } from "jwt-decode";
import { useUpdateProfile } from "../../../service/api/User";
import { useNavigate } from "react-router-dom";
import NavigationBarLogo from "../../navigation/NavigationBarLogo";
import Input from "../../common/input";
import PasswordValidation from "../PasswordValidation";
import Button from "../../common/button";
import { ButtonTypes } from "../../common/button/ButtonTypes.enum";
import { ButtonColorTypes } from "../../common/button/ButtonColorTypes.enum";

const NewPassword = ({ newPasswordData }: { newPasswordData: any }) => {
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState({
    new_password: "",
    repeatPassword: "",
    startValidation: false,
  });
  const { mutate: updateProfile, isLoading, isSuccess } = useUpdateProfile();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/user/with-password");
    }
  }, [navigate, isSuccess]);

  const handleKeyDown = (e: any) => {
    if (
      e.key === "Enter" &&
      password.new_password.length >= 8 &&
      password.new_password === password.repeatPassword
    )
      submitForm();
  };

  const handleLoginWithOTP = () => {
    navigate("/user?otp=true");
  };

  const submitForm = () => {
    //@ts-ignore
    const { user_id = "" } = jwtDecode(newPasswordData.access_token ?? "");
    let payload = {
      password: password.new_password,
    };
    updateProfile({ data: payload, user_id: user_id });
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
          <Input
            label="رمز عبور جدید"
            value={password.new_password}
            required={true}
            handlechange={(value) =>
              setPassword({
                ...password,
                new_password: value,
                startValidation: true,
              })
            }
            placeholder="لطفاً رمز عبور جدید خود را وارد کنید."
            type={!showPass ? "password" : "text"}
            customIcon="/static/svg/invisible.svg"
            handleCustomIconClicked={() => setShowPass(!showPass)}
            onKeyDown={handleKeyDown}
            style={{ marginBottom: "8px" }}
          />
          <PasswordValidation
            password={password.new_password}
            startValidation={password.startValidation}
          />
          <Input
            label="تکرار رمز عبور جدید"
            value={password.repeatPassword}
            required={true}
            handlechange={(value) =>
              setPassword({ ...password, repeatPassword: value })
            }
            placeholder="لطفاً رمز عبور جدید خود را مجدد وارد کنید."
            type={!showPass ? "password" : "text"}
            customIcon="/static/svg/invisible.svg"
            handleCustomIconClicked={() => setShowPass(!showPass)}
            onKeyDown={handleKeyDown}
            style={{ marginBottom: "8px" }}
          />
          <p className={passwordValidationStyles.password_information_title}>
            {"رمز عبور شما باید؛"}
          </p>
          <div
            className={passwordValidationStyles.password_information_container}
          >
            <p
              className={
                passwordValidationStyles.password_information_conditions
              }
            >
              <img
                src={
                  password.new_password === password.repeatPassword
                    ? "/static/svg/landing01.svg"
                    : "/static/svg/landing02.svg"
                }
                alt="status"
                width={16}
                height={16}
                className={passwordValidationStyles.password_status_image}
                style={{
                  opacity: password.startValidation ? 1 : 0,
                  width: 16,
                  height: 16,
                }}
              />
              با رمز عبور جدید یکی باشد.
            </p>
          </div>
        </div>
        <div>
          <Button
            title={"تایید و ادامه"}
            icon={"/static/svg/arrow-right-white.svg"}
            iconPosition="right"
            variant={ButtonTypes.CONTAINED}
            color={ButtonColorTypes.PRIMARY}
            loading={isLoading}
            disabled={
              isLoading ||
              password.new_password.length < 8 ||
              password.new_password !== password.repeatPassword
            }
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
};

export default NewPassword;
