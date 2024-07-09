// @ts-ignore
import styles from "./ZilinkPolicies.module.css";

const ZilinkPolicies = ({
  setShowZilinkPlatformDetailsModal,
}: {
  setShowZilinkPlatformDetailsModal: (value: boolean) => void;
}) => {
  return (
    <div className={styles.zilink_system_details_container}>
      <div
        className={styles.zilink_system_details_header}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          src="/static/svg/clear.svg"
          width={24}
          height={24}
          style={{ width: 24, height: 24 }}
          alt="close"
          onClick={() => setShowZilinkPlatformDetailsModal(false)}
          color="#000"
        />
        <p className={styles.zilink_system_details_header_text}>
          سامانه یکپارچه زیلینک
        </p>
      </div>
      <div className={styles.zilink_system_details_content}>
        <p className={styles.zilink_system_details_text}>
          با ثبت‌نام در سامانه یکپارچه زیلینک، حساب کاربری شما در این سامانه
          ایجاد خواهد شد.
        </p>
        <ul style={{ paddingInlineStart: "18px" }}>
          <li className={styles.zilink_system_details_text}>
            اگر خریدار هستید:
          </li>
          <p className={styles.zilink_system_details_text}>
            از این پس با ورود به هر سایت دیگری که توسط زیلینک ساخته شده باشد،
            اطلاعات کاربری شما به صورت پیش‌فرض در آن ذخیره بوده و نیازی به
            ثبت‌نام مجدد نخواهید داشت.
          </p>
          <li className={styles.zilink_system_details_text}>
            اگر فروشنده هستید:
          </li>
          <p className={styles.zilink_system_details_text}>
            از این پس می‌توانید بدون نیاز به ثبت‌نام مجدد، از تمامی امکانات و
            ابزارهای زیلینک استفاده کنید.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default ZilinkPolicies;
