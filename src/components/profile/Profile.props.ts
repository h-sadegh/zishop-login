export type ProfileType = {
  username?: string;
  national_code?: string;
  first_name?: string;
  last_name?: string;
  fatherName?: string;
  certificateNumber?: string;
  address?: string;
  phone_number?: string;
  mobile?: string;
  birthDate?: string;
  email?: string;
  provinceId?: number;
  provinceName?: string;
  cityId?: number;
  cityName?: string;
  gender?: string;
  role?: string | [string];
  user_id?: string | number;
  ssn?: string;
  birth_date?: string;
  password?: string;
};
export const UserRoleRow = {
  userVender: { path: "/panel/dashboard", title: "پنل فروشندگان" },
  userAdmin: { path: "/panel/register", title: "فروشنده شوید" },
};

export type userType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  nationalCode?: string;
  phoneNumber?: string;
  role?: string[];
  sub?: string;
  userName?: string;
};

export type ProfileRowType = {
  title: string;
  icon?: any;
  path?: string;
  onClick?: () => void;
  removeBorder?: boolean;
  soon?: boolean;
  execute?: string;
  needyLogin?: boolean;
};

export const ProfileDataRow: ProfileRowType[] = [
  {
    title: "ورود به حساب کاربری",
    path: "/user?backUrl=/profile",
    removeBorder: true,
    icon: "/static/svg/profile02.svg",
  },
  {
    title: "اطلاعات کاربری",
    path: "/profile/info",
    needyLogin: true,
    icon: "/static/svg/profile01.svg",
  },
  {
    title: "کالاهای مورد علاقه",
    path: "/bookmark",
    needyLogin: true,
    icon: "/static/svg/profile03.svg",
    removeBorder: true,
  },
  {
    title: "دیدگاه‌های ثبت شده",
    path: "/profile/comment",
    needyLogin: true,
    icon: "/static/svg/profile04.svg",
    // soon: true,
    removeBorder: true,
  },
  {
    title: "پنل فروشندگان",
    path: "/panel",
    needyLogin: true,
    icon: "/static/svg/profile05.svg",
    removeBorder: false,
  },
  {
    title: "خروج از حساب کاربری",
    execute: "SIGNOUT",
    icon: "/static/svg/profile02.svg",
  },
];
