import { useState } from "react";

import { OtpType } from "./Login.props";
import LoginNumber from "./components/number";
import WithPassword from "./components/withPassword";
import OTPConfirm from "./components/confirm";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  // const [refresh] = useState(new Date());
  const search = useLocation().search;
  const otp = new URLSearchParams(search).get("id");
  const navigate = useNavigate();
  const [useSendOtp, setUseSendOtp] = useState<OtpType>();
  const [mobile, setMobile] = useState<string>();
  const [forceOtp, setForceOTP] = useState(otp ?? false);

  // useProfile(false, refresh);

  function handleSubmit(verifyOTPData: any) {
    if (verifyOTPData.has_information) {
      navigate("/profile/personal-information", { replace: true });
    } else navigate("/user/submit-information", { replace: true });
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

  function handleLoginWithOTP(mobile: string) {
    setMobile(mobile);
    setForceOTP(true);
    setUseSendOtp(undefined);
  }

  return !useSendOtp ? (
    <LoginNumber
      isSuccessMobile={isSuccessMobile}
      mobileBack={mobile}
      forceOTP={Boolean(forceOtp)}
    />
  ) : useSendOtp.use_otp ? (
    <OTPConfirm
      dataOtp={useSendOtp}
      handleEditMobile={handleEditMobile}
      handleSubmitLogin={handleSubmit}
      forceOTP={Boolean(forceOtp)}
    />
  ) : (
    <WithPassword
      defaultMobile={useSendOtp.mobile}
      loginWithOTP={(mobile: string) => handleLoginWithOTP(mobile)}
    />
  );
};

export default Login;
