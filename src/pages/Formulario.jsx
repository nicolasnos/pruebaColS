import React from "react";
import Form from "../Molecules/Form";

const Formulario = ({
  initialData,
  validationArray,
  opcionesDocs,
  opcionesServ,
  checked,
  setChecked,
  disabled,
  setDisabled,
  checkDisabled,
  setCheckDisabled,
  showUnauthModal,
  setShowUnauthModal,
  showContactModal,
  setShowContactModal,
  showValidateOtpModal,
  setShowValidateOtpModal,
  handleClass,
  setHandleClass,
  formData,
  setFormData,
  selectedEmail,
  setSelectedEmail,
  selectedCellphone,
  setSelectedCellphone,
  otpCode,
  setOtpCode,
  hideData,
  dummySendOtp,
  subContactType,
  setSubContactType,
  showPermissionModal,
  setShowPermissionModal,
  client,
}) => {
  return (
    <div>
      <Form
        initialData={initialData}
        validationArray={validationArray}
        opcionesDocs={opcionesDocs}
        opcionesServ={opcionesServ}
        checked={checked}
        setChecked={setChecked}
        disabled={disabled}
        setDisabled={setDisabled}
        checkDisabled={checkDisabled}
        setCheckDisabled={setCheckDisabled}
        showUnauthModal={showUnauthModal}
        setShowUnauthModal={setShowUnauthModal}
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
        showValidateOtpModal={showValidateOtpModal}
        setShowValidateOtpModal={setShowValidateOtpModal}
        handleClass={handleClass}
        setHandleClass={setHandleClass}
        formData={formData}
        setFormData={setFormData}
        selectedEmail={selectedEmail}
        setSelectedEmail={setSelectedEmail}
        selectedCellphone={selectedCellphone}
        setSelectedCellphone={setSelectedCellphone}
        otpCode={otpCode}
        setOtpCode={setOtpCode}
        hideData={hideData}
        dummySendOtp={dummySendOtp}
        subContactType={subContactType}
        setSubContactType={setSubContactType}
        showPermissionModal={showPermissionModal}
        setShowPermissionModal={setShowPermissionModal}
        client={client}
      />
    </div>
  );
};

export default Formulario;
