import { InputHTMLAttributes, useRef, useEffect } from "react";

// @ts-ignore
import styles from "./Input.module.css";
import { ExtraInputType } from "./Input.props";

const Input = (
  props: InputHTMLAttributes<HTMLInputElement> & ExtraInputType,
) => {
  const {
    ltr,
    useref,
    disabled,
    subtext,
    error,
    style,
    label,
    required,
    placeholder,
    ariaLabel,
    inputclassname,
    inputstyle,
    labelstyle,
    value,
    handlechange,
    clearButton = true,
    customIcon,
    handleCustomIconClicked,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (useref && inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    handlechange && handlechange(e.target.value);

  const handleClearInput = () => {
    handlechange("");
    if (inputRef?.current) inputRef.current.focus();
  };

  return (
    <div
      className={`${Boolean(ltr) ? styles.input_left : styles.input_right} ${
        disabled ? styles.disabled : ""
      }`}
      style={{
        ...{ height: subtext || error ? 78 : 60 },
        ...style,
      }}
    >
      {label && (
        <p
          className={`${styles.label || ""} ${error ? styles.text_error : ""} ${
            required ? styles.label_required : ""
          }`}
          style={labelstyle || {}}
        >
          {label || ""}
        </p>
      )}
      <div className={styles.input_container}>
        <input
          aria-label={placeholder || ariaLabel}
          className={`${styles.input || ""} ${inputclassname || ""} ${
            Boolean(ltr) ? styles.input_left : styles.input_right
          }   ${error ? styles.input_error : ""}`}
          style={inputstyle || {}}
          ref={inputRef}
          onChange={handleChangeValue}
          {...props}
        />
        {clearButton && Boolean(value) && (
          <button className={styles.clear_button} onClick={handleClearInput}>
            <img src="/static/svg/clear.svg" width={20} height={20} alt="" />
          </button>
        )}
        {customIcon && (
          <button
            className={styles.clear_button}
            onClick={handleCustomIconClicked}
          >
            <img
              src={customIcon}
              style={{ width: 20, height: 20 }}
              width={20}
              height={20}
              alt=""
            />
          </button>
        )}
      </div>
      {(error || subtext) && (
        <p
          className={`${styles.subtext} ${
            error ? `${styles.text_error} ${styles.error_icon}` : ""
          }`}
        >
          {error || subtext}
        </p>
      )}
    </div>
  );
};

export default Input;
