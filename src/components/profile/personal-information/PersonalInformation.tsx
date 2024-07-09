// @ts-ignore
import styles from "./PersonalInformation.module.css";

import { personalInfoConfig } from "./PersonalInformation.config";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { getStatePersist } from "../../../store/Store";
import NavigationBarLogo from "../../navigation/NavigationBarLogo";
import Popups from "../../common/Popups";
import Input from "../../common/input";
import Button from "../../common/button";
import { ButtonTypes } from "../../common/button/ButtonTypes.enum";
import { ButtonColorTypes } from "../../common/button/ButtonColorTypes.enum";
import { emailValidation, mobileValidation } from "../../../util/Validation";
import passwordValidation from "../../login/PasswordValidation";
import { useUpdateProfile } from "../../../service/api/User";
import InputNumber from "../../common/number";
import PasswordValidation from "../../login/PasswordValidation";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const auth = Cookies.get("auth");
  const userInfo = getStatePersist("user");
  const [editKey, setEditKey] = useState("");
  const [showEditDialog, setShowEditDialog] = useState<any>(false);
  const [showPassword, setShowPassword] = useState<any>(false);
  const { mutate: updateProfile, isLoading, isSuccess } = useUpdateProfile();
  const [userPayload, setUserPayload] = useState<any>(userInfo);

  const navigate = useNavigate();

  const handleShowEditDialog = (key: string) => {
    if (key === "first_name") setEditKey("name");
    else setEditKey(key);
    setShowEditDialog(true);
  };

  const handleUpdateProfile = () => {
    //@ts-ignore
    const { user_id = "" } = jwtDecode(auth ?? "");
    updateProfile({ data: userPayload, user_id: user_id });
  };

  const handleLogOut = () => {
    cookie.remove("auth");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isSuccess) {
      setEditKey("");
      setUserPayload(userInfo);
      setShowEditDialog(false);
    }
  }, [isSuccess]);

  return (
    <>
      <NavigationBarLogo />
      <div style={{ padding: "18px 0px 82px" }}>
        <p
          style={{
            color: "black",
            margin: "0px 0px 12px",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          اطلاعات کاربری
        </p>
        <div className={styles.personal_info_container}>
          {personalInfoConfig.map((item, index) => (
            <div
              style={
                personalInfoConfig.length === index + 1
                  ? {
                      border: "none",
                      marginBottom: "0px",
                      paddingBottom: "0px",
                    }
                  : {}
              }
              className={styles.personal_info_item_container}
              key={item.id}
            >
              <div>
                <p className={styles.personal_info_item_title}>{item.title}</p>
                <p className={styles.personal_info_item_data}>
                  {item.key1 === "password"
                    ? item.value
                    : userInfo[item.key1] && userInfo[item.key1] !== ""
                      ? userInfo[item.key1]
                      : "------"}
                  {item.key2 &&
                    userInfo[item.key2] &&
                    userInfo[item.key2] !== "" &&
                    " " + userInfo[item.key2]}
                </p>
              </div>
              <img
                color={"#F06400"}
                onClick={() => handleShowEditDialog(item.key1)}
                src="/static/svg/edit.svg"
                alt="edit"
                style={{
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
              />
            </div>
          ))}
        </div>
        {/* <p
          style={{
            color: "black",
            margin: "18px 0px 12px",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          جزئیات اعتبارات
        </p>
        <div className={styles.personal_info_container}>
          {personalCreditInfo.map((item, index) => (
            <div
              style={
                personalInfoConfig.length === index + 1
                  ? {
                      border: "none",
                      marginBottom: "0px",
                      paddingBottom: "0px",
                    }
                  : {}
              }
              className={styles.personal_info_item_container}
              key={item.id}
            >
              <p className={styles.personal_info_item_title}>{item.title}</p>
              <p className={styles.personal_info_item_data}>{item.value}</p>
            </div>
          ))}
        </div> */}
        <div className={styles.personal_info_log_out} onClick={handleLogOut}>
          خروج از حساب کاربری
          <img
            color={"#f06400"}
            src={"/static/svg/Arrow-left-white.svg"}
            style={{ marginLeft: 5 }}
          />{" "}
        </div>
      </div>
      <Popups
        isMobile={true}
        visible={showEditDialog}
        setVisible={(value) => setShowEditDialog(value)}
        maxHeight="auto"
        height="auto"
        content={
          <>
            <div className={styles.personal_info_modal_header}>
              <img
                onClick={() => setShowEditDialog(false)}
                src={"/static/plus.svg"}
                alt="close"
                style={{ transform: "rotate(45deg)" }}
              />
              <p
                style={{
                  margin: "0px",
                  color: "#282828",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                ویرایش اطلاعات کاربری
              </p>
            </div>
            <div style={{ padding: "18px" }}>
              {editKey === "name" ? (
                <>
                  <Input
                    label="نام"
                    handlechange={(e) =>
                      setUserPayload({ ...userPayload, first_name: e })
                    }
                    placeholder="نام خود را وارد کنید."
                    style={{ marginBottom: "36px" }}
                    required
                    value={userPayload?.first_name ?? ""}
                  />
                  <Input
                    label="نام خانوادگی"
                    handlechange={(e) =>
                      setUserPayload({ ...userPayload, last_name: e })
                    }
                    placeholder="نام خانوادگی خود را وارد کنید."
                    style={{ marginBottom: "36px" }}
                    required
                    value={userPayload?.last_name ?? ""}
                  />
                </>
              ) : editKey === "phone_number" ? (
                <InputNumber
                  label="شماره تلفن"
                  handlechange={(e: any) => setUserPayload({ phone_number: e })}
                  placeholder="شماره تلفن خود را وارد کنید."
                  style={{ marginBottom: "36px" }}
                  required
                  value={userPayload?.phone_number ?? ""}
                />
              ) : editKey === "email" ? (
                <Input
                  label="ایمیل"
                  handlechange={(e) => setUserPayload({ email: e })}
                  placeholder="ایمیل خود را وارد کنید."
                  style={{ marginBottom: "36px" }}
                  required
                  value={userPayload?.email ?? ""}
                />
              ) : (
                <>
                  <Input
                    label="رمز عبور"
                    handlechange={(e) => setUserPayload({ password: e })}
                    placeholder="رمز عبور خود را وارد کنید."
                    style={{ marginBottom: "36px" }}
                    required
                    type={showPassword ? "text" : "password"}
                    customIcon="/static/svg/invisible.svg"
                    handleCustomIconClicked={() =>
                      setShowPassword(!showPassword)
                    }
                  />
                  <PasswordValidation
                    password={userPayload?.password ?? ""}
                    startValidation={true}
                  />
                </>
              )}
              <Button
                title="ذخیره"
                variant={ButtonTypes.CONTAINED}
                color={ButtonColorTypes.PRIMARY}
                style={{ width: "100%" }}
                onClick={handleUpdateProfile}
                disabled={
                  (editKey === "name" &&
                    (!userPayload?.first_name || !userPayload?.last_name)) ||
                  (editKey === "email" &&
                    !emailValidation(userPayload?.email)) ||
                  (editKey === "phone_number" &&
                    !mobileValidation(userPayload?.phone_number)) ||
                  (editKey === "password" &&
                    !passwordValidation(userPayload?.password ?? ""))
                }
                loading={isLoading}
              />
            </div>
          </>
        }
      />
    </>
  );
};

export default PersonalInformation;
