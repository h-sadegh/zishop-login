// @ts-ignore
import styles from "./PasswordValidation.module.css";

const PasswordValidation = ({
  password,
  startValidation,
}: {
  password: string;
  startValidation: boolean;
}) => {
  return (
    <>
      <p className={styles.password_information_title}>
        {"رمز عبور شما باید؛"}
      </p>
      <div className={styles.password_information_container}>
        <p className={styles.password_information_conditions}>
          <img
            src={
              password.length < 8
                ? "/static/svg/landing02.svg"
                : "/static/svg/landing01.svg"
            }
            alt="status"
            width={16}
            height={16}
            className={styles.password_status_image}
            style={{ opacity: startValidation ? 1 : 0, width: 16, height: 16 }}
          />
          {"حداقل ۸ حرف باشد."}{" "}
        </p>
        <p className={styles.password_information_conditions}>
          <img
            src={
              /[A-Z]/g.test(password) && /[a-z]/g.test(password)
                ? "/static/svg/landing01.svg"
                : "/static/svg/landing02.svg"
            }
            alt="status"
            width={16}
            height={16}
            className={styles.password_status_image}
            style={{ opacity: startValidation ? 1 : 0, width: 16, height: 16 }}
          />
          {"شامل حروف بزرگ و کوچک باشد."}
        </p>
        <p className={styles.password_information_conditions}>
          <img
            src={
              /\d/.test(password)
                ? "/static/svg/landing01.svg"
                : "/static/svg/landing02.svg"
            }
            alt="close"
            width={16}
            height={16}
            className={styles.password_status_image}
            style={{ opacity: startValidation ? 1 : 0, width: 16, height: 16 }}
          />
          {"شامل عدد باشد."}
        </p>
        <p className={styles.password_information_conditions}>
          <img
            src={
              /[!@#$%^&*(),.?":{}|<>]/.test(password)
                ? "/static/svg/landing01.svg"
                : "/static/svg/landing02.svg"
            }
            alt="close"
            width={16}
            height={16}
            className={styles.password_status_image}
            style={{ opacity: startValidation ? 1 : 0, width: 16, height: 16 }}
          />
          {"شامل علامت باشد. (!@#$%^&*)"}
        </p>
      </div>
    </>
  );
};

export default PasswordValidation;
