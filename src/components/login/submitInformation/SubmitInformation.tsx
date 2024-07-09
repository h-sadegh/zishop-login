import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// @ts-ignore
import styles from "./SubmitInformation.module.css";
import { useUpdateProfile } from "../../../service/api/User";
import { getStatePersist } from "../../../store/Store";
import { useNavigate } from "react-router-dom";
import { mobileValidation } from "../../../util/Validation";
import NavigationBarLogo from "../../navigation/NavigationBarLogo";
import ZilinkPlatform from "../ZilinkPlatform";
import InputNumber from "../../common/number";
import Input from "../../common/input";
import PasswordValidation from "../PasswordValidation";
import PrivacyAndPolicyText from "../PrivacyAndPolicyText";
import Button from "../../common/button";
import { ButtonTypes } from "../../common/button/ButtonTypes.enum";
import { ButtonColorTypes } from "../../common/button/ButtonColorTypes.enum";

const SubmitInformation = () => {
  const auth = Cookies.get("auth");
  const { mutate: updateProfile, isLoading, isSuccess } = useUpdateProfile();
  const mobile = getStatePersist("userMobile");
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    mobile: mobile,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    startValidation: false,
  });

  const formConfig = [
    {
      key: "first_name",
      label: "نام",
      placeholder: "لطفاً نام خود را وارد کنید.",
      required: true,
      value: formData.first_name,
    },
    {
      key: "last_name",
      label: "نام خانوادگی",
      placeholder: "لطفاً نام خانوادگی خود را وارد کنید.",
      required: true,
      value: formData.last_name,
    },
    {
      key: "email",
      label: "ایمیل",
      placeholder: "لطفاً ایمیل خود را وارد کنید.",
      required: false,
      value: formData.email,
    },
    {
      key: "password",
      label: "رمز عبور",
      placeholder: "لطفاً رمز عبور خود را وارد کنید.",
      required: true,
      value: formData.password,
    },
  ];

  useEffect(() => {
    if (!isSuccess) return;
    navigate("/profile/personal-information");
  }, [isSuccess]);

  function handleInputChange(key: string, value: string) {
    if (key === "password") {
      setFormData({ ...formData, [key]: value, startValidation: true });
    } else setFormData({ ...formData, [key]: value });
  }

  function handleSubmit() {
    //@ts-ignore
    const { user_id = "" } = jwtDecode(auth ?? "");
    let payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.mobile,
      password: formData.password,
    };
    updateProfile({ data: payload, user_id: user_id });
  }

  function profileValidation() {
    if (
      !mobileValidation(formData.mobile ?? "") ||
      formData.first_name.length === 0 ||
      formData.last_name.length === 0 ||
      formData.password.length < 8 ||
      !/[A-Z]/g.test(formData.password) ||
      !/[a-z]/g.test(formData.password) ||
      !/\d/.test(formData.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    )
      return false;
    else return true;
  }

  return (
    <>
      <NavigationBarLogo />
      <div className={styles.container}>
        <p className={styles.login_signup}>ثبت‌نام</p>
        <ZilinkPlatform />
        <div className={styles.form_container}>
          <InputNumber
            required
            label={"شماره موبایل"}
            value={formData.mobile}
            handlechange={(value) => {}}
            placeholder={"لطفاً شماره موبایل خود را وارد کنید."}
            subtext={"شماره موبایل باید ۱۱ رقم باشد و با ۰۹ شروع شود."}
          />
          {formConfig.map(({ key, label, placeholder, value, required }) => (
            <Input
              key={key}
              label={label}
              value={value}
              required={required}
              handlechange={(value) => handleInputChange(key, value)}
              placeholder={placeholder}
              type={key === "password" && !showPass ? "password" : "text"}
              customIcon={
                key === "password" ? "/static/svg/invisible.svg" : undefined
              }
              handleCustomIconClicked={() => setShowPass(!showPass)}
            />
          ))}
        </div>
        <PasswordValidation
          password={formData.password}
          startValidation={formData.startValidation}
        />
        <PrivacyAndPolicyText />
        <Button
          title={"ذخیره"}
          variant={ButtonTypes.CONTAINED}
          color={ButtonColorTypes.PRIMARY}
          contentStyle={{ width: "100%" }}
          disabled={!profileValidation()}
          onClick={handleSubmit}
          loading={isLoading}
        />
      </div>
    </>
  );
};

export default SubmitInformation;
