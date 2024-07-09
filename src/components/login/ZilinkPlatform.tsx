// @ts-ignore
import styles from "./ZilinkPlatform.module.css";
import { useState } from "react";
import ZilinkPolicies from "./ZilinkPolicies";
import Popups from "../common/Popups";

const ZilinkPlatform = () => {
  const [showZilinkPlatformDetailsModal, setShowZilinkPlatformDetailsModal] =
    useState<boolean>(false);

  return (
    <div className={styles.zilink_system}>
      <p className={styles.zilink_system_text}>سامانه یکپارچه زیلینک</p>
      <img
        onClick={() => setShowZilinkPlatformDetailsModal(true)}
        src="/static/warning.svg"
        width={18}
        height={18}
        style={{ width: 18, height: 18 }}
        alt="warning"
      />
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
    </div>
  );
};

export default ZilinkPlatform;
