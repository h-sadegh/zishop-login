import { ButtonHTMLAttributes } from "react";

// @ts-ignore
import styles from "./Button.module.css";
import { ButtonTypes } from "./ButtonTypes.enum";
import { ButtonColorTypes } from "./ButtonColorTypes.enum";
import { ExtraButtonType } from "./Button.props";
import Loading from "../loading";

function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & ExtraButtonType,
) {
  const {
    title,
    icon,
    iconPosition = "left",
    loading = false,
    variant = ButtonTypes.CONTAINED,
    color = ButtonColorTypes.PRIMARY,
    contentStyle = {},
    iconStyle = {},
    iconCustomColor = undefined,
    iconCustomSize = undefined,
    ...rest
  } = props;

  const buttonStyleClassName = {
    [ButtonTypes.CONTAINED]: {
      [ButtonColorTypes.PRIMARY]: {
        button: styles.button_primary_contained,
        text: styles.title_primary_contained,
      },
      [ButtonColorTypes.SECONDARY]: {
        button: styles.button_secondary_contained,
        text: styles.title_secondary_contained,
      },
    },
    [ButtonTypes.OUTLINED]: {
      [ButtonColorTypes.PRIMARY]: {
        button: styles.button_primary_outlined,
        text: styles.title_primary_outlined,
      },
      [ButtonColorTypes.SECONDARY]: {
        button: styles.button_secondary_outlined,
        text: styles.title_secondary_outlined,
      },
    },
    [ButtonTypes.TEXT]: {
      [ButtonColorTypes.PRIMARY]: {
        button: styles.button_primary_text,
        text: styles.title_primary_text,
      },
      [ButtonColorTypes.SECONDARY]: {
        button: styles.button_secondary_text,
        text: styles.title_secondary_text,
      },
    },
  };

  const buttonTextColor = {
    [ButtonTypes.CONTAINED]: {
      [ButtonColorTypes.PRIMARY]: "#FFF",
      [ButtonColorTypes.SECONDARY]: "#FFF",
    },
    [ButtonTypes.OUTLINED]: {
      [ButtonColorTypes.PRIMARY]: "#F06400",
      [ButtonColorTypes.SECONDARY]: "#000",
    },
    [ButtonTypes.TEXT]: {
      [ButtonColorTypes.PRIMARY]: "#F06400",
      [ButtonColorTypes.SECONDARY]: "#000",
    },
  };

  return (
    <button
      className={[
        styles.button,
        buttonStyleClassName[variant][color].button,
      ].join(" ")}
      style={contentStyle}
      {...rest}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {icon && iconPosition === "right" && (
            <img
              alt=""
              src={icon}
              style={{
                width: iconCustomSize ?? 16,
                height: iconCustomSize ?? 16,
              }}
              width={iconCustomSize ?? 16}
              height={iconCustomSize ?? 16}
              className={[title && styles.icon_right, iconStyle].join(" ")}
              // color={iconCustomColor}
            />
          )}
          {title && (
            <span
              className={[
                styles.title,
                buttonStyleClassName[variant][color].text,
              ].join(" ")}
            >
              {title}
            </span>
          )}
          {icon && iconPosition === "left" && (
            <img
              alt={""}
              // color={buttonTextColor[variant][color]}
              src={icon}
              style={{
                width: iconCustomSize ?? 16,
                height: iconCustomSize ?? 16,
              }}
              width={iconCustomSize ?? 16}
              height={iconCustomSize ?? 16}
              className={[title && styles.icon_left, iconStyle].join(" ")}
            />
          )}
        </>
      )}
    </button>
  );
}

export default Button;
