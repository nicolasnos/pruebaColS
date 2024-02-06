import React, { useMemo } from "react";
import "../styles/OtpInput.css";

const OtpInput = ({ value, valueLength, onChange }) => {
  const valueItems = useMemo(() => {
    // Constuct an array from string value
    const valueArray = value.split("");
    const re = new RegExp(/^\d+$/);

    // The array should have a lenght equal to valueLength
    const items = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (re.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const focusNextElement = (target) => {
    const nextElementSibling = target.nextElementSibling;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const focusPreviousElement = (target) => {
    const previousElementSibling = target.previousElementSibling;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnchange = (e, idx) => {
    const target = e.target;
    let targetValue = target.value.trim(); // Remove leading and trailing spaces
    const re = new RegExp(/^\d+$/);
    const isTargetValueDigit = re.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) return;

      focusNextElement(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e) => {
    const target = e.target;
    const key = e.key;
    const targetValue = target.value;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusNextElement(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusPreviousElement(target);
    }

    // Keep the selection range position
    target.setSelectionRange(0, targetValue.length);

    if (key !== "Backspace" || target.value !== "") {
      return;
    }

    focusPreviousElement(target);
  };

  const inputOnFocus = (e) => {
    const target = e.target;
    target.select();
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className="otp-group">
      {valueItems.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="otp-input"
          value={digit}
          onChange={(e) => inputOnchange(e, index)}
          onKeyDown={inputOnKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
};

export { OtpInput };
