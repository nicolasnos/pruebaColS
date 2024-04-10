import React, { useState, useEffect } from "react";
import { ColsanitasVideoCallContext } from "../context";

import { BaseModal } from "../pages/BaseModal";
import { WarningIcon } from "../Atoms/WarningIcon";
import Header from "../Molecules/Header";
import { Paragraph } from "../Atoms/Paragraph";
import { OtpInput } from "../Atoms/OtpInput";
import { Timer } from "../Atoms/Timer";
import Button from "../Atoms/Button";
import { CloseIcon } from "../Atoms/CloseIcon";

import "../styles/ValidateOtpModal.css";

const ValidateOtpModal = ({ email, cellphone, contactType, callApi }) => {
  const {
    otpError,
    setOtpError,
    url,
    key,
    otpCode,
    setShowPermissionModal,
    setHandleClass,
    setShowValidateOtpModal,
    resendDisabled,
    setResendDisabled,
    goBackButton,
    setGoBackButton,
    disabled,
    setDisabled,
    formData,
    subContactType,
    setOtpCode,
    setShowContactModal,
    setShowWSEModal,
  } = React.useContext(ColsanitasVideoCallContext);

  /** Se crea el estado para los segundos y se inicializa en 60 segundos. */
  const [seconds, setSeconds] = useState(60);
  let text = "";
  let text2 = "";

  /** Se crea el useEffect para que cada vez que el estado de segundos cambie, se actualice el contador. Esto se hace cada 1000ms o 1s */
  useEffect(() => {
    let timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const [otp, setOtp] = useState("");
  const onChange = (value) => {
    setOtpError(false);
    setOtp(value);
  };

  const valOtpApi = async (operation, otp, userOtp) => {
    let data = new FormData();
    data.append("operation", operation);
    data.append("otp", otp);
    data.append("userOtp", userOtp);
    data.append("key", key);

    const requestOptions = {
      method: "POST",
      body: data,
      redirect: "follow",
    };

    const res = fetch(url, requestOptions);
    return res;
  };

  const validateOtp = async () => {
    let operation = "validateOtp";
    const res = await valOtpApi(operation, otpCode, otp);
    if (res.status === 200) {
      handleClickClose();
      setShowPermissionModal(true);
    } else if (res.status === 400) {
      setOtpError(true);
      setHandleClass("error");
      setOtp("");
    } else {
      console.log(res.status);
      setShowWSEModal(true);
      setShowValidateOtpModal(false);
      setOtp("");
    }
  };

  const handleClickClose = () => {
    setOtp("");
    setSeconds(60);
    setShowValidateOtpModal(false);
    setOtpError(false);
  };

  const handleClickBack = () => {
    setOtp("");
    setSeconds(60);
    setShowValidateOtpModal(false);
    setShowContactModal(true);
    setOtpError(false);
  };

  const handleClickResend = async () => {
    let operation = "userConsultOTP";
    let typeId = formData.docType;
    let numId = formData.docNum;
    let userName = formData.fullName;
    let email = formData.userEmail;
    let cellphone = formData.cellphoneNum;
    let service = formData.serviceType;
    let contactMethod = subContactType;
    let otpForwarding = 1;

    const apiCall = await callApi(
      operation,
      typeId,
      numId,
      userName,
      email,
      cellphone,
      service,
      contactMethod,
      otpForwarding
    );

    if (apiCall.message === "Success") {
      setOtpCode(apiCall.id);
      setShowValidateOtpModal(true);
      setShowContactModal(false);
    } else {
      console.log("Error al obtener el código de seguridad", apiCall);
      setShowWSEModal(true);
      setShowValidateOtpModal(false);
    }

    setSeconds(60);
  };

  if (contactType === email) {
    text = "Correo: ";
    text2 = email;
  } else if (contactType === cellphone) {
    text = "Celular";
    text2 = cellphone;
  }

  useEffect(() => {
    if (otp.length === 6) {
      setHandleClass("success");
      setDisabled(false);
    } else if (otp.length < 6) {
      setDisabled(true);
    }

    if (seconds === 0) {
      setResendDisabled(false);
      setGoBackButton(false);
    } else {
      setResendDisabled(true);
      setGoBackButton(true);
    }
  }, [
    otp.length,
    otp,
    setHandleClass,
    setDisabled,
    seconds,
    setResendDisabled,
    setGoBackButton,
  ]);

  return (
    <BaseModal>
      <div className="modal-close-icon">
        <span onClick={handleClickClose}>
          <CloseIcon />
        </span>
      </div>
      <WarningIcon />
      <Header type={3} text={"Código de seguridad"} />
      <Paragraph
        linesNumber={2}
        className={"otp-modal-paragraph"}
        text={`Revisa tu correo y/o celular 
        \nHemos enviado un código de confirmación de 6 dígitos. No olvides ingresar el código lo antes posible`}
      />
      <Paragraph
        className={"otp-modal-cellphone"}
        text={text2}
        span={true}
        spanPosition={"start"}
        spanText={text}
      />
      <form type="submit" className="otp-form">
        <OtpInput value={otp} valueLength={6} onChange={onChange} />
        {otpError ? (
          <Paragraph
            linesNumber={1}
            className={"error-paragraph"}
            text={"Código incorrecto"}
          />
        ) : null}
        <div className="otp-modal-footer">
          <Paragraph
            linesNumber={1}
            className={"otp-modal-footer-paragraph"}
            text={"¿No tienes un código?"}
          />
          <Button
            variant={"resendOtp"}
            disabled={resendDisabled}
            value={"Volver a enviar el código"}
            onClick={handleClickResend}
            setResendDisabled={setResendDisabled}
          />
          <Timer seconds={seconds} />
        </div>
        <div className="otp-btn-container">
          <Button
            variant={"modalGoBackBtn"}
            value={"Regresar"}
            className={"modal-btn-back"}
            onClick={handleClickBack}
            disabled={goBackButton}
            setGoBackButton={setGoBackButton}
          />
          <Button
            variant={"primary"}
            value={"Ingresar"}
            disabled={disabled}
            className={"modal-btn-send"}
            onClick={validateOtp}
          />
        </div>
      </form>
    </BaseModal>
  );
};

export { ValidateOtpModal };
