import React, { useState } from "react";
import { ColsanitasVideoCallContext } from "../context";
import { BaseModal } from "../pages/BaseModal";
import { CloseIcon } from "../Atoms/CloseIcon";
import { WarningIcon } from "../Atoms/WarningIcon";
import { Input } from "../Atoms/Input";
import Button from "../Atoms/Button";
import Header from "./Header";
import "../styles/BaseModal.css";
import "../styles/SelectContactType.css";

const SelectContactType = () => {
  const {
    formData,
    setShowContactModal,
    setShowValidateOtpModal,
    setOtpCode,
    setVideoCallLink,
    setSelectedCellphone,
    setSelectedEmail,
    subContactType,
    setSubContactType,
    setShowWSEModal,
    servUserEmail,
    servUserCellphone,
    modalLoader,
    setModalLoader,
    executeService,
    setModalType,
    validateSchedule,
  } = React.useContext(ColsanitasVideoCallContext);

  const [checkedEmail, setCheckedEmail] = useState(false);
  const [checkedCellphone, setCheckedCellphone] = useState(false);
  const [selectError, setSelectError] = useState(false);

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
    // console.log(e);
    e.preventDefault();
    let operation = "userConsultOTP";
    let typeId = formData.docType;
    let numId = formData.docNum;
    let contactMethod = subContactType;
    let otpForwarding = 0;
    setModalLoader(true);
    if (!e.target[0].checked && !e.target[1].checked) {
      setSelectError(true);
      setModalLoader(false);
      return;
    }

    const apiCall = await executeService(
      [
        "operation",
        "typeDocument",
        "numberDocument",
        "otpMetod",
        "otpForwarding",
      ],
      operation,
      typeId,
      numId,
      contactMethod,
      otpForwarding
    );

    if (apiCall.message[0].estado === "EXITOSO") {
      setOtpCode(apiCall.message[0].message);
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
  };

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
        onSubmit={(e) => {
          validateSchedule();
          handleSubmit(e);
        }}
        className="colsanitas-contact-type-form"
        name="contact-type"
      >
        <div className="radius-cont">
          <Input
            type="colsanitasRadioBtn"
            label={servUserEmail}
            value={servUserEmail}
            name={"sndEmail"}
            checked={checkedEmail}
            onChange={handleSelect}
          />
        </div>
        <div className="radius-cont">
          <Input
            type="colsanitasRadioBtn"
            label={servUserCellphone}
            value={servUserCellphone}
            name={"sndCellphone"}
            checked={checkedCellphone}
            onChange={handleSelect}
          />
        </div>
        {selectError ? (
          <p style={{ color: "#b50303" }}>Debes escoger una opción</p>
        ) : null}
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
