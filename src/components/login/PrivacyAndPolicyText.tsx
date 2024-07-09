// @ts-ignore
import styles from "./PrivacyAndPolicyText.module.css";
import ZilinkPolicies from "./ZilinkPolicies";
import { useState } from "react";
import Popups from "../common/Popups";

const PrivacyAndPolicyText = () => {
  const [showZilinkPlatformDetailsModal, setShowZilinkPlatformDetailsModal] =
    useState<boolean>(false);

  return (
    <>
      <p className={styles.privacy_policy_text}>
        {"شما با ورود یا ثبت‌نام در سامانه یکپارچه زیلینک،"}
        <span
          onClick={() => setShowZilinkPlatformDetailsModal(true)}
          className={`${styles.privacy_policy_text} ${styles.link_text}`}
        >
          {"شرایط و قوانین"}
        </span>
        {" استفاده از سرویس‌های این سامانه و قوانین"}
        <a
          href={"/privacy"}
          className={`${styles.privacy_policy_text} ${styles.link_text}`}
        >
          {" حریم خصوصی "}
        </a>
        {"آن را می‌پذیرید."}
      </p>
      <Popups
        visible={showZilinkPlatformDetailsModal}
        setVisible={() =>
          setShowZilinkPlatformDetailsModal(!showZilinkPlatformDetailsModal)
        }
        isMobile={true}
        content={
          <ZilinkPolicies
            setShowZilinkPlatformDetailsModal={() =>
              setShowZilinkPlatformDetailsModal(false)
            }
          />
        }
        maxHeight="90vh"
        height="auto"
      />
    </>
  );
};

export default PrivacyAndPolicyText;
