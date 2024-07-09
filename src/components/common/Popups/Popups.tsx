import React, { Dispatch, SetStateAction, useEffect } from "react";
import { PopupsType } from "./Popups.props";
import PopupsView from "./PopupsView";
function Popups({
  content,
  visible,
  setVisible,
  maxWidth,
  view,
  isMobile,
  icon,
  overflow,
  styleBody,
  sourceView,
  height = "100vh",
  maxHeight = "auto",
}: {
  content?: React.JSX.Element;
  visible?: boolean;
  maxWidth?: number | "100vw";
  setVisible: Dispatch<SetStateAction<boolean | undefined>>;
  view?: PopupsType | PopupsType.fullPopup;
  isMobile?: boolean;
  icon?: React.JSX.Element;
  overflow?: string;
  sourceView?: boolean | false;
  styleBody?: React.CSSProperties;
  height?: string;
  maxHeight?: string;
}) {
  let stylePopup = {};
  let stylePopupBottomSheet = {};

  switch (view) {
    case PopupsType.centerPopup:
      stylePopup = {
        top: "50%",
        left: "50%",
        width: 370,
        height: "auto",
        backgroundColor: "#ffffff",
        transform: "translate(-50%, -50%)",
        position: "fixed",
      };
      break;
    case PopupsType.bottomSheetPopup:
      stylePopupBottomSheet = {
        bottom: 0, // Position at the top
        borderTopLeftRadius: "10px", // Round bottom corners
        borderTopRightRadius: "10px",
        padding: "20px",
        position: "fixed",
        width: "100%",
        maxWidth: "var(--max-Width)",
        backgroundColor: "#fff",
      };
      break;
    default:
      stylePopup = {
        backgroundColor: "#ffffff",
        overflow: "auto",
        height: height,
        maxHeight: maxHeight,
        maxWidth: isMobile ? "100vw" : maxWidth,
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderRadius: "8px 8px 0px 0px",
      };
  }

  const styleClosedBottomSheet = {
    content: {
      bottom: "-100%", // Hide above the viewport
    },
  };

  useEffect(() => {
    if (view === PopupsType.centerPopup || sourceView) return;
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {icon}
      <PopupsView
        open={visible}
        onClose={() => {
          setVisible(!visible);
        }}
        maxWidth={isMobile ? "100vw" : maxWidth}
        styleBody={styleBody}
        styles={
          isMobile
            ? view === PopupsType.bottomSheetPopup
              ? visible
                ? stylePopupBottomSheet
                : styleClosedBottomSheet
              : stylePopup
            : stylePopup
        }
        content={content}
      />
    </>
  );
}

export default React.memo(Popups);
