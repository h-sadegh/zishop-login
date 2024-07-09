import { CSSProperties } from "react";

import { ButtonTypes } from "./ButtonTypes.enum";
import { ButtonColorTypes } from "./ButtonColorTypes.enum";

export type ExtraButtonType = {
  icon?: string;
  iconPosition?: "right" | "left";
  loading?: boolean;
  variant?: ButtonTypes;
  color?: ButtonColorTypes;
  contentStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  iconCustomColor?: string;
  iconCustomSize?: number;
};
