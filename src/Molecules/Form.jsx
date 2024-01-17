import React, { useEffect, useRef, useState } from "react";
import { Input } from "../Atoms/Input";
import { AttentionSchedule } from "../Molecules/AttentionSchedule";
// import PermissionModal from "./PermissionModal";
import WrongUserModal from "./WrongUserModal";
import Button from "../Atoms/Button";
import Header from "../Molecules/Header";
import { SelectContactType } from "./SelectContactType";
import { ValidateOtpModal } from "./ValidateOtpModal";
import { DiffDataModal } from "./DiffDataModal";
import PermissionModal from "./PermissionModal";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/Formulario.css";

const Form = ({
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
  subContactType,
  setSubContactType,
  showPermissionModal,
  setShowPermissionModal,
  resendDisabled,
  setResendDisabled,
  goBackButton,
  setGoBackButton,
  client,
  otpError,
  setOtpError,
  // date,
}) => {
  const { docType, docNum, fullName, userEmail, cellphoneNum, serviceType } =
    formData;

  const captcha = useRef(null);
  const [noRobot, setNoRobot] = useState(false);
  const [servUserEmail, setServUserEmail] = useState("");
  const [servUserCellphone, setServUserCellphone] = useState("");
  const [videoCallLink, setVideoCallLink] = useState("");
  const [showDiffDataModal, setShowDiffDataModal] = useState(false);
  const [url] = useState(
    "https://sndl.cariai.com/colsanitas-videollamada/process"
  );
  const [docTypeError, setDocTypeError] = useState(false);
  const [docNumError, setDocNumError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [serviceTypeError, setServiceTypeError] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(false);

  const handleChange = (event) => {
    // setChecked(!checked);
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "fullName" && value !== "" && !/^[A-Za-z\s]+$/.test(value)) {
      // Si el valor no cumple con la validación, no actualizamos el estado
      return;
    }

    if (name === "docNum" && value.toString().length < 5) {
      setDocNumError(true);
    } else setDocNumError(false);

    if (name === "fullName" && value.length < 4) {
      setFullNameError(true);
    } else setFullNameError(false);

    if (name === "cellphoneNum" && value.toString().length < 10) {
      setPhoneError(true);
    } else setPhoneError(false);

    if (
      name === "cellphoneNum" &&
      value !== "" &&
      value.toString().length > 10
    ) {
      // Si el valor no cumple con la validación, no actualizamos el estado
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //nunca borrar este manejador tan mk
  const handleCheck = () => {
    setChecked(!checked);
    setFormData((prevData) => {
      return {
        ...prevData,
        accepted: !checked,
      };
    });
  };

  const handleErrorsInputs = (typeId, email, service) => {
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;

    if (typeId === "") {
      setDocTypeError(true);
    } else setDocTypeError(false);

    if (service === "") {
      setServiceTypeError(true);
    } else setServiceTypeError(false);

    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else setEmailError(false);

    if (typeId === "" || service === "" || !emailRegex.test(email)) {
      setDocTypeError(true);
      setEmailError(true);
      setServiceTypeError(true);
      return true;
    } else {
      setDocTypeError(false);
      setEmailError(false);
      setServiceTypeError(false);
      return false;
    }
  };

  const handleErrorsCheck = (check, robot) => {
    console.log("handle check", check, "recaptcha ", robot);
    if (!check) {
      setCheckError(true);
    } else setCheckError(false);

    if (!robot) {
      setRecaptchaError(true);
    } else setRecaptchaError(false);
    if (!check || !robot) {
      setCheckError(true);
      setRecaptchaError(true);
      return true;
    } else {
      setCheckError(false);
      setRecaptchaError(false);
      return false;
    }
  };

  const callApi = async (
    operation,
    typeId,
    numId,
    userName,
    email,
    cellphone,
    service,
    otpForwarding
  ) => {
    let data = new FormData();
    data.append("operation", operation);
    data.append("token", "Contraseña123@");
    data.append("useProduction", "false");
    data.append("typeDocument", typeId);
    data.append("numberDocument", numId);
    data.append("fullUserName", userName);
    data.append("emailUser", email);
    data.append("phoneUser", cellphone);
    data.append("serviceType", service);

    if (operation === "userConsultOTP") {
      data.append("otpMetod", subContactType);
      data.append("otpForwarding", otpForwarding);
    }

    let headers = new Headers();
    headers.append("Content-Type", "multipart/form-data");

    try {
      const response = await client.postData(url, data, headers);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const validateData = async (e) => {
    e.preventDefault();

    let operation = "userConsultVideoCall";
    let typeId = formData.docType;
    let numId = formData.docNum;
    let userName = formData.fullName;
    let email = formData.userEmail;
    let cellphone = formData.cellphoneNum;
    let service = formData.serviceType;
    let terms = formData.accepted;
    console.log("terminos", terms);
    let errors = handleErrorsInputs(typeId, email, service);
    let errors2 = handleErrorsCheck(terms, noRobot);
    if (errors || errors2) {
      /* console.log("inputs ", errors, "checks ", errors2); */
      return;
    }

    const apiCall = await callApi(
      operation,
      typeId,
      numId,
      userName,
      email,
      cellphone,
      service
    );
    // console.log("apiCall", apiCall.message[0].emailUsuario);
    if (apiCall.status === 200) {
      if (apiCall.message[0].estado === "HABILITADO") {
        setServUserEmail(apiCall.message[0].emailUsuario);
        setServUserCellphone(apiCall.message[0].telefonoUsuario);
        if (
          apiCall.message[0].emailUsuario === email &&
          apiCall.message[0].telefonoUsuario
        ) {
          // console.log("Los correos son iguales y va a mostrar el modal respectivo");
          setShowContactModal(true);
          // setShowValidateOtpModal(false);
        }

        if (
          apiCall.message[0].emailUsuario !== email ||
          apiCall.message[0].telefonoUsuario !== cellphone
        ) {
          // console.log("Los correos son diferentes y va a mostrar el modal respectivo");
          setShowDiffDataModal(true);
          setShowContactModal(false);
        }
      } else if (apiCall.message[0].estado === "NO HABILITADO") {
        setShowUnauthModal(true);
      }
    } else console.error("hubo error");
  };

  // const hiddenData = hideData(formData.userEmail, formData.cellphoneNum);
  const hiddenData = hideData(servUserEmail, servUserCellphone);

  /** Manejo de datos del componente para el renderizado */
  useEffect(() => {
    if (checked) {
      setHandleClass("checked");
    } else {
      setHandleClass("unChecked");
    }
    /* console.log(formData); */
    // console.log("Código otp: " + otpCode);
    // console.log("Time actual en form", date);
  }, [
    formData,
    checked,
    selectedCellphone,
    selectedEmail,
    otpCode,
    setCheckDisabled,
    setDisabled,
    setHandleClass,
    servUserCellphone,
    servUserEmail,
    setShowContactModal,
    // date,
    videoCallLink,
  ]);

  return (
    <div className="right-side">
      <div className="top">
        <Header />
        <AttentionSchedule wvType="schedule" />
      </div>
      <form className="form" type="submit">
        <div className="caja">
          <Input
            label="Tipo de documento"
            type="select"
            options={opcionesDocs}
            value={docType}
            name={"docType"}
            onChange={handleChange}
            id={"docType"}
            docTypeError={docTypeError}
          />
          <Input
            label="Número de documento"
            type={"number"}
            placeHolder="Ej: 1223456789"
            value={docNum}
            name={"docNum"}
            onChange={handleChange}
            numberDocError={docNumError}
          />
        </div>
        <div className="caja">
          <Input
            label="Nombre Completo"
            type={"text"}
            placeHolder="Ej: Juan Paz"
            value={fullName}
            name={"fullName"}
            onChange={handleChange}
            fullNameError={fullNameError}
          />
          <Input
            label="Correo electrónico"
            type={"email"}
            placeHolder="Ej: juan@gmail.com"
            value={userEmail}
            name={"userEmail"}
            onChange={handleChange}
            emailError={emailError}
          />
        </div>
        <div className="caja">
          <Input
            label="Número celular"
            type={"number"}
            placeHolder="Ej: 310222311"
            value={cellphoneNum}
            name={"cellphoneNum"}
            onChange={handleChange}
            phoneError={phoneError}
          />
          <Input
            label="Tipo de servicio"
            type={"select"}
            placeHolder="Ej: juan@gmail.com"
            options={opcionesServ}
            value={serviceType}
            name={"serviceType"}
            onChange={handleChange}
            serviceTypeError={serviceTypeError}
          />
        </div>
        {recaptchaError ? (
          <p
            style={{ color: "#b50303", textAlign: "center", marginTop: "15px" }}
          >
            Es necesario que verifiques que no eres un robot
          </p>
        ) : null}
        <div className="captchaBox">
          {/*Espacio para el captcha*/}
          <ReCAPTCHA
            ref={captcha}
            sitekey="6Lfdm0wpAAAAACPO3J7KJTxxV_qNo60rU5DdzMVQ"
            onChange={() => setNoRobot(true)}
          />
        </div>
        {checkError ? (
          <p
            style={{
              color: "#b50303",
              textAlign: "center",
              margin: "30px 0px 0px 0px",
            }}
          >
            Debes aceptar el tratamiento de datos personales
          </p>
        ) : null}
        <div className="checkInput">
          <input
            type="checkbox"
            onClick={handleCheck}
            name={"accepted"}
            checked={checked}
          />
          <p className={handleClass}>
            He leído y acepto el{" "}
            <a
              href="https://www.colsanitas.com/en/teminos-y-condiciones-web"
              target="_blank"
              rel="noopener noreferrer"
              className={`link--${handleClass ? handleClass : ""}`}
            >
              Tratamiento de datos personales
            </a>{" "}
            y{" "}
            <a
              href="https://www.colsanitas.com/en/ley-de-proteccion-de-datos"
              target="_blank"
              rel="noopener noreferrer"
              className={`link--${handleClass ? handleClass : ""}`}
            >
              {" "}
              Política de privacidad.
            </a>
          </p>
        </div>
        <div className="btn-container">
          <Button
            variant={"iconButton"}
            value={"Ingresar"}
            onClick={validateData}
            type={"button"}
          />
        </div>
      </form>
      {/* {showModal ? <PermissionModal setShowModal={setShowModal} /> : null} */}
      {showContactModal ? (
        <SelectContactType
          email={hiddenData.hiddenEmail}
          cellphone={hiddenData.hiddenCellphone}
          valueEmail={formData.userEmail}
          valueCellphone={formData.cellphoneNum}
          setSelectedEmail={setSelectedEmail}
          setSelectedCellphone={setSelectedCellphone}
          setShowValidateOtpModal={setShowValidateOtpModal}
          setOtpCode={setOtpCode}
          setShowContactModal={setShowContactModal}
          subContactType={subContactType}
          setSubContactType={setSubContactType}
          client={client}
          url={url}
          otpCode={otpCode}
          setVideoCallLink={setVideoCallLink}
          formData={formData}
          callApi={callApi}
        />
      ) : null}
      {showUnauthModal ? (
        <WrongUserModal setShowModal={setShowUnauthModal} />
      ) : null}
      {showValidateOtpModal ? (
        <ValidateOtpModal
          setShowValidateOtpModal={setShowValidateOtpModal}
          setShowContactModal={setShowContactModal}
          receivedOtp={otpCode}
          handleClass={handleClass}
          setHandleClass={setHandleClass}
          disabled={disabled}
          setDisabled={setDisabled}
          email={hiddenData.hiddenEmail}
          cellphone={hiddenData.hiddenCellphone}
          contactType={
            selectedCellphone !== ""
              ? hiddenData.hiddenCellphone
              : hiddenData.hiddenEmail
          }
          setOtpCode={setOtpCode}
          subContactType={subContactType}
          setShowPermissionModal={setShowPermissionModal}
          resendDisabled={resendDisabled}
          setResendDisabled={setResendDisabled}
          goBackButton={goBackButton}
          setGoBackButton={setGoBackButton}
          setVideoCallLink={setVideoCallLink}
          otpError={otpError}
          setOtpError={setOtpError}
          callApi={callApi}
          formData={formData}
        />
      ) : null}
      {showPermissionModal ? (
        <PermissionModal
          setShowPermissionModal={setShowPermissionModal}
          setShowContactModal={setShowContactModal}
          videoCallLink={videoCallLink}
        />
      ) : null}
      {showDiffDataModal ? (
        <DiffDataModal
          setShowDiffDataModal={setShowDiffDataModal}
          setVideoCallLink={setVideoCallLink}
          videoCallLink={videoCallLink}
          client={client}
          url={url}
          formData={formData}
        />
      ) : null}
    </div>
  );
};

export default Form;
