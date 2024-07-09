export type LoginType = {
  otp_token: string;
  use_otp: boolean;
};

export type OtpType = {
  otp_token: string;
  mobile: string;
  use_otp?: boolean;
};

export type ConfirmType = {
  access_token: string;
  existed: boolean;
  message: string;
  refresh_token: string;
};

export type ForgetPasswordType = {
  otp_token: string;
};
