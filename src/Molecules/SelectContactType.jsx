import React, { useState, useEffect } from "react";
import { BaseModal } from "../pages/BaseModal";
import { CloseIcon } from "../Atoms/CloseIcon";
import { WarningIcon } from "../Atoms/WarningIcon";
import { Input } from "../Atoms/Input";
import Button from "../Atoms/Button";
import Header from "./Header";
import "../styles/BaseModal.css";
import "../styles/SelectContactType.css";

const SelectContactType = ({
  email,
  cellphone,
  valueEmail,
  valueCellphone,
  setSelectedEmail,
  setSelectedCellphone,
  setShowValidateOtpModal,
  setOtpCode,
  setShowContactModal,
  subContactType,
  setSubContactType,
  client,
  url,
  setVideoCallLink,
  formData,
  callApi,
  setShowWSEModal,
  modalLoader,
  setModalLoader,
  setModalType,
}) => {
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [checkedCellphone, setCheckedCellphone] = useState(false);

  const handleSelect = (e) => {
    let targetName = e.target;

    if (targetName.name === "sndEmail") {
      setCheckedEmail(true);
      setCheckedCellphone(false);
      setSelectedEmail(targetName.value);
      setSelectedCellphone("");
      setSubContactType("email");
    } else if (targetName.name === "sndCellphone") {
      setCheckedCellphone(true);
      setCheckedEmail(false);
      setSelectedCellphone(targetName.value);
      setSelectedEmail("");
      setSubContactType("telefono");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let operation = "userConsultOTP";
    let typeId = formData.docType;
    let numId = formData.docNum;
    let userName = formData.fullName;
    let email = formData.userEmail;
    let cellphone = formData.cellphoneNum;
    let service = formData.serviceType;
    let contactMethod = subContactType;
    let otpForwarding = 0;
    setModalLoader(true);
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

    if (apiCall.status === 200) {
      setOtpCode(apiCall.message[0].codigoOtp);
      setVideoCallLink(apiCall.message[0].url);
      setModalLoader(false);
      setShowValidateOtpModal(true);
      setShowContactModal(false);
      setModalType("validateOtp");
    } else {
      console.log("Error al obtener el código de seguridad", apiCall);
      setModalLoader(false);
      setShowWSEModal(true);
      setShowContactModal(false);
    }

    // console.log(e.target.name);
  };

  useEffect(() => {
    // console.log("dentro del useEffect", checkedEmail, checkedCellphone);
  });

  return (
    <BaseModal className={"contact-type-base-modal"}>
      <figure className="modal-close-icon">
        <span
          onClick={() => {
            setShowContactModal(false);
            setModalLoader(false);
          }}
        >
          <CloseIcon />
        </span>
      </figure>
      <WarningIcon />
      <Header
        type={3}
        text={"Código de seguridad"}
        className={"contact-type-h3"}
      />
      <p className="select-contact-type-modal-p">
        Selecciona el <span>número de celular</span> o{" "}
        <span>correo electrónico</span> donde deseas recibir el código de
        confirmación
      </p>
      <form
        onSubmit={handleSubmit}
        className="colsanitas-contact-type-form"
        name="contact-type"
      >
        <div className="radius-cont">
          <Input
            type="colsanitasRadioBtn"
            label={email}
            value={valueEmail}
            name={"sndEmail"}
            checked={checkedEmail}
            onChange={handleSelect}
          />
        </div>
        <div className="radius-cont">
          <Input
            type="colsanitasRadioBtn"
            label={cellphone}
            value={valueCellphone}
            name={"sndCellphone"}
            checked={checkedCellphone}
            onChange={handleSelect}
          />
        </div>
        <div className="colsanitas-btn-cont">
          {/* <Input type="submit" label={"Enviar"} /> */}
          <Button
            variant={"loaderButton"}
            value={"Enviar"}
            type={"submit"}
            loaderBtn={modalLoader}
          />
        </div>
      </form>
    </BaseModal>
  );
};

export { SelectContactType };
