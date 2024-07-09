// @ts-ignore
import style from "./Popups.module.css";
import * as React from "react";
const PopupsView = ({
  open,
  onClose,
  content,
  styles,
  maxWidth,
  styleBody,
}: {
  open?: boolean;
  onClose: () => void;
  content?: React.JSX.Element;
  styles: React.CSSProperties;
  maxWidth?: number | string;
  styleBody?: React.CSSProperties;
}) => {
  if (!open) return null;

  return (
    <div style={styleBody} onClick={onClose} className={style.e_lnL2L8}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ maxWidth: maxWidth }}
      >
        <div style={styles}>{content}</div>
      </div>
    </div>
  );
};

export default PopupsView;
