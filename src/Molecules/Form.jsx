import React, { useEffect, useRef } from "react";
import { ColsanitasVideoCallContext } from "../context";
import { Input } from "../Atoms/Input";
import { AttentionSchedule } from "../Molecules/AttentionSchedule";
import WSErrorModal from "../Molecules/WSErrorModal";
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

const Form = () => {
  const {
    formData,
    checked,
    setChecked,
    handleClass,
    setHandleClass,
    opcionesDocs,
    opcionesServ,
    showContactModal,
    showUnauthModal,
    showValidateOtpModal,
    showWSEModal,
    setShowWSEModal,
    setServUserEmail,
    setServUserCellphone,
    showDiffDataModal,
    setShowDiffDataModal,
    docTypeError,
    setDocTypeError,
    docNumError,
    setDocNumError,
    fullNameError,
    setFullNameError,
    emailError,
    setEmailError,
    phoneError,
    setPhoneError,
    serviceTypeError,
    setServiceTypeError,
    checkError,
    setCheckError,
    recaptchaError,
    setRecaptchaError,
    setFormData,
    callApi,
    loader,
    setLoader,
    setShowContactModal,
    setShowUnauthModal,
    showPermissionModal,
    modalTextType,
    setModalTextType,
    executeService,
    validateSchedule,
  } = React.useContext(ColsanitasVideoCallContext);

  const { docType, docNum, fullName, userEmail, cellphoneNum, serviceType } =
    formData;

  const captcha = useRef(null);

  //nunca borrar este manejador tan mk
  const handleCheck = () => {
    setChecked(!checked);
    /*  setFormData((prevData) => {
      return {
        ...prevData,
        accepted: !checked,
      };
    }); */
  };

  const handleErrorIDType = (typeId) => {
    if (typeId === 0 || typeId === "") {
      setDocTypeError(true);
      return true;
    } else {
      setDocTypeError(false);
      return false;
    }
  };

  const handleErrorIDNum = (docNum) => {
    const docRegex = /^[a-zA-Z0-9_]*$/;
    if (docNum.length <= 4 || docNum === 0 || !docRegex.test(docNum)) {
      setDocNumError(true);
      return true;
    } else {
      setDocNumError(false);
      return false;
    }
  };

  const handleErrorFullName = (fullName) => {
    if (fullName < 5) {
      setFullNameError(true);
      return true;
    } else {
      setFullNameError(false);
      return false;
    }
  };

  const handelErrorEmail = (email) => {
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;

    if (!emailRegex.test(email)) {
      setEmailError(true);
      return true;
    } else setEmailError(false);
    return false;
  };

  const handlePhoneError = (phone) => {
    if (phone.length < 10) {
      setPhoneError(true);
      return true;
    } else setPhoneError(false);
    return false;
  };

  const handleErrorService = (service) => {
    if (service === "") {
      setServiceTypeError(true);
      return true;
    } else {
      setServiceTypeError(false);
      return false;
    }
  };

  const handleErrorRobot = (robot) => {
    if (!robot) {
      setRecaptchaError(true);
      return true;
    } else setRecaptchaError(false);
    return false;
  };

  const handleErrorCheck = (check) => {
    if (!check) {
      setCheckError(true);
      return true;
    } else setCheckError(false);
    return false;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    /* if (name === "docType") {
      handleErrorIDType(value);
    } else setDocTypeError(false); */

    //NO LO BORRE
    if (
      name === "fullName" &&
      value !== "" &&
      !/^[A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]+$/.test(value)
    ) {
      // Si el valor no cumple con la validación, no actualizamos el estado
      return;
    }

    if (
      name === "cellphoneNum" &&
      value !== "" &&
      value.toString().length > 10
    ) {
      // Si el valor no cumple con la validación, no actualizamos el estado
      return;
    }

    // if (name === "accepted") {
    //   handleCheck();
    //   handleErrorCheck(!checked);
    //   /* setCheckError(true); */
    //   console.log("error ", handleErrorCheck(!checked));
    // } else setCheckError(false);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      accepted: checked,
    }));

    let error = false;

    switch (name) {
      case "docType":
        setDocTypeError(false);
        error = handleErrorIDType(value);
        setDocTypeError(error);
        break;
      case "docNum":
        error = handleErrorIDNum(value);
        setDocNumError(error);
        break;
      case "fullName":
        error = handleErrorFullName(value);
        setFullNameError(error);
        break;
      case "userEmail":
        error = handelErrorEmail(value);
        setEmailError(error);
        break;
      case "cellphoneNum":
        error = handlePhoneError(value);
        setPhoneError(error);
        break;
      case "serviceType":
        error = handleErrorService(value);
        setServiceTypeError(error);
        break;
      case "accepted":
        handleCheck();
        error = handleErrorCheck(checked);
        break;
      default:
        break;
    }
  };

  const handleCheckData = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      accepted: e.target.checked,
    }));
    handleErrorCheck(e.target.checked);
  };

  const validateData = async (e) => {
    e.preventDefault();

    let operation = "userConsultVideoCall";
    let typeId = formData.docType;
    let numId = formData.docNum;
    let userName = formData.fullName;
    let email = formData.userEmail.toLowerCase().trim();
    let cellphone = formData.cellphoneNum;
    let service = formData.serviceType;
    let terms = formData.accepted;
    // const hiddenData = hideData(email, cellphone);
    //manejo de errores
    let errortipoDoc = handleErrorIDType(typeId);
    let errorNumeroDoc = handleErrorIDNum(numId);
    let errorFullName = handleErrorFullName(userName);
    let errorEmail = handelErrorEmail(email);
    let errorServiceType = handleErrorService(service);
    let errorPhone = handlePhoneError(cellphone);
    let errorRobot = handleErrorRobot(captcha.current.getValue());
    let errorCheck = handleErrorCheck(terms);

    // console.log(email);

    if (
      errorCheck ||
      errorRobot ||
      errorPhone ||
      errorServiceType ||
      errorEmail ||
      errorFullName ||
      errorNumeroDoc ||
      errortipoDoc
    ) {
      setLoader(false);
      return;
    }

    setLoader(true);
    const apiCall = await executeService(
      [
        "operation",
        "typeDocument",
        "numberDocument",
        "fullNameUser",
        "emailUser",
        "phoneUser",
        "serviceType",
      ],
      operation,
      typeId,
      numId,
      userName,
      userEmail,
      cellphone,
      service
    );

    if (apiCall.status === 200) {
      setLoader(false);
      if (apiCall.message[0].estado === true) {
        setServUserEmail(apiCall.message[0].emailUsuario);
        setServUserCellphone(apiCall.message[0].telefonoUsuario);
        if (
          (apiCall.message[0].fitData === 1) |
          (apiCall.message[0].fitData === true)
        ) {
          setLoader(false);
          setShowContactModal(true);
        }

        if (
          (apiCall.message[0].fitData === 0) |
          (apiCall.message[0].fitData === false) |
          (apiCall.message[0].fitData === "")
        ) {
          setLoader(false);
          setShowDiffDataModal(true);
          setShowContactModal(false);
        }
      } else if (
        apiCall.message[0].estado === false &&
        apiCall.message[0].motivo === 1
      ) {
        setLoader(false);
        setShowUnauthModal(true);
        setModalTextType(0);
      } else if (
        apiCall.message[0].estado === false &&
        apiCall.message[0].motivo === "otro plan"
      ) {
        setLoader(false);
        setShowUnauthModal(true);
        setModalTextType(0);
      } else if (apiCall.message[0].motivo === 2) {
        setLoader(false);
        setShowUnauthModal(true);
        setModalTextType(1);
      }
    } else {
      setLoader(false);
      setShowWSEModal(true);
    }
  };

  /** Manejo de datos del componente para el renderizado */
  useEffect(() => {
    if (checked) {
      setHandleClass("checked");
    } else {
      setHandleClass("unChecked");
    }
  }, [formData, checked]);

  return (
    <div className="right-side">
      <div className="top">
        <Header />
        <AttentionSchedule wvType="schedule" />
      </div>
      <form className="form" type="submit">
        <div className="caja">
          <Input
            label={
              docTypeError
                ? "Selecciona un Tipo de documento"
                : "Tipo de documento"
            }
            type="select"
            options={opcionesDocs}
            value={docType}
            name={"docType"}
            onChange={(e) => {
              handleChange(e);
              validateSchedule();
            }}
            id={"docType"}
            docTypeError={docTypeError}
          />
          <Input
            label={
              docNumError
                ? "Escribe un número de documento válido"
                : "Número de documento"
            }
            type={"text"}
            placeHolder="Ej: 1223456789"
            value={docNum}
            name={"docNum"}
            onChange={(e) => {
              handleChange(e);
              validateSchedule();
            }}
            numberDocError={docNumError}
          />
        </div>
        <div className="caja">
          <Input
            label={
              fullNameError
                ? "Por favor escribe tu nombre completo"
                : "Nombre Completo"
            }
            type={"text"}
            placeHolder="Ej: Juan Paz"
            value={fullName}
            name={"fullName"}
            onChange={(e) => {
              handleChange(e);
              validateSchedule();
            }}
            fullNameError={fullNameError}
          />
          <Input
            label={
              emailError ? "Escribe un correo válido" : "Correo electrónico"
            }
            type={"email"}
            placeHolder="Ej: juan@gmail.com"
            value={userEmail}
            name={"userEmail"}
            onChange={(e) => {
              handleChange(e);
              validateSchedule();
            }}
            emailError={emailError}
          />
        </div>
        <div className="caja">
          <Input
            label={
              phoneError
                ? "Ingresa un número de celular válido"
                : "Numero celular"
            }
            type={"number"}
            placeHolder="Ej: 310222311"
            value={cellphoneNum}
            name={"cellphoneNum"}
            onChange={(e) => {
              handleChange(e);
              validateSchedule();
            }}
            phoneError={phoneError}
          />
          <Input
            label={
              serviceTypeError
                ? "Selecciona un tipo de servicio"
                : "Tipo de servicio"
            }
            type={"select"}
            placeHolder="Ej: juan@gmail.com"
            options={opcionesServ}
            value={serviceType}
            name={"serviceType"}
            onChange={(e) => {
              handleChange(e);
              validateSchedule();
            }}
            serviceTypeError={serviceTypeError}
          />
        </div>
        {recaptchaError ? (
          <p
            style={{ color: "#b50303", textAlign: "center", marginTop: "10px" }}
          >
            Es necesario que verifiques que no eres un robot
          </p>
        ) : (
          <div style={{ height: "20px", margin: "10px 0px 0px 0px" }}></div>
        )}
        <div className="captchaBox">
          {/*Espacio para el captcha*/}
          <ReCAPTCHA
            ref={captcha}
            sitekey="6Lfdm0wpAAAAACPO3J7KJTxxV_qNo60rU5DdzMVQ"
            onChange={() => {
              if (captcha.current.getValue()) {
                setRecaptchaError(false);
              }
            }}
          />
        </div>
        {checkError ? (
          <p
            style={{
              color: "#b50303",
              textAlign: "center",
              margin: "10px 0px 0px 0px",
            }}
          >
            Debes aceptar el tratamiento de datos personales
          </p>
        ) : (
          <div style={{ height: "20px", margin: "10px 0px 0px 0px" }}></div>
        )}
        <div className="checkInput">
          <input
            type="checkbox"
            onClick={handleCheck}
            onChange={handleCheckData}
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
            onClick={(e) => {
              validateSchedule();
              validateData(e);
            }}
            type={"button"}
            loader={loader}
          />
        </div>
      </form>
      {/* {showModal ? <PermissionModal setShowModal={setShowModal} /> : null} */}
      {showContactModal ? <SelectContactType /> : null}
      {showUnauthModal ? (
        <WrongUserModal modalTextType={modalTextType} />
      ) : null}
      {showValidateOtpModal ? <ValidateOtpModal callApi={callApi} /> : null}
      {showPermissionModal ? <PermissionModal /> : null}
      {showDiffDataModal ? <DiffDataModal /> : null}
      {showWSEModal ? <WSErrorModal setShowModal={setShowWSEModal} /> : null}
    </div>
  );
};

export default Form;
