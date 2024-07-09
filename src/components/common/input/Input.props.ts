import * as React from "react";

export type ExtraInputType = {
  error?: string;
  subtext?: string;
  label?: string;
  useref?: 0 | 1;
  labelstyle?: React.CSSProperties;
  inputstyle?: React.CSSProperties;
  topplaceholderstyle?: React.CSSProperties;
  inputclassname?: string | undefined;
  ltr?: 0 | 1;
  ariaLabel?: string;
  clearButton?: boolean;
  handlechange: (value: string) => void;
  customIcon?: string;
  handleCustomIconClicked?: () => void;
};
