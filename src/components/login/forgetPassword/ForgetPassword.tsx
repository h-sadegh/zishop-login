import { useState } from "react";
import ForgetPasswordNumber from "./ForgetPasswordNumber";
import NewPassword from "./NewPassword";
import { OtpType } from "../../../Login.props";
import OTPConfirm from "../../confirm";

const ForgetPassword = () => {
  // const [refresh] = useState(new Date());
  const [useSendOtp, setUseSendOtp] = useState<OtpType>();
  const [mobile, setMobile] = useState<string>();
  const [newPasswordData, setNewPasswordData] = useState();
  // useProfile(false, refresh);

  function handleSubmit(verifyOTPData: any) {
    setNewPasswordData(verifyOTPData);
    // if (backUrl) router.replace(backUrl).then();
    // else setIsSubmitPage(true);
  }

  function handleEditMobile(mobile: string) {
    setMobile(mobile);
    setUseSendOtp(undefined);
  }

  function isSuccessMobile(data: OtpType) {
    if (!data.otp_token && !data.mobile) return;
    setUseSendOtp(data);
  }

  return !useSendOtp ? (
    <ForgetPasswordNumber
      isSuccessMobile={isSuccessMobile}
      mobileBack={mobile}
    />
  ) : newPasswordData ? (
    <NewPassword newPasswordData={newPasswordData} />
  ) : (
    <OTPConfirm
      dataOtp={useSendOtp}
      handleEditMobile={handleEditMobile}
      handleSubmitLogin={handleSubmit}
      forceOTP={false}
      isForgetPassword={true}
    />
  );
};

export default ForgetPassword;
