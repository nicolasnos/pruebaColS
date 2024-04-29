import React, { useState, useEffect } from "react";
import { HolidayCalculator } from "../App/HolidayCalculator";
import { Client } from "../App/Client";

const ColsanitasVideoCallContext = React.createContext();

const ColsanitasVideoCallProvider = ({ children }) => {
  const [actualDate, setActualDate] = useState(new Date());
  const holidayCalc = new HolidayCalculator();
  const client = new Client();

  /** Se inicializa un objeto que va a almacenar los datos que recolecte el formulario. Esto evitará manejar un estado por campo en el formulario */
  const initialData = {
    docType: "",
    docNum: 0,
    fullName: "",
    userEmail: "",
    cellphoneNum: "",
    serviceType: "",
    accepted: false,
  };

  /** Array con los tipos de documento que puede seleccionar el usuario */
  const opcionesDocs = [
    {
      id: 0,
      name: "Selecciona una opción",
      value: "",
      stringValue: "",
    },
    {
      id: 1,
      name: "Cédula de Ciudadania",
      value: "1",
      stringValue: "CC",
    },
    {
      id: 8,
      name: "Tarjeta de Identidad",
      value: "8",
      stringValue: "TI",
    },
    {
      id: 7,
      name: "Registro Civil",
      value: "7",
      stringValue: "RC",
    },
    {
      id: 2,
      name: "Cédula Extranjería",
      value: "2",
      stringValue: "CE",
    },
    {
      id: 6,
      name: "Pasaporte",
      value: "6",
      stringValue: "PA",
    },
    {
      id: 3,
      name: "Menor sin Identificación",
      value: "3",
      stringValue: "MSI",
    },
    {
      id: 4,
      name: "Número de Identificación Tributaria",
      value: "4",
      stringValue: "NIT",
    },
    {
      id: 5,
      name: "Número de Identificación Patronal",
      value: "5",
      stringValue: "NIP",
    },
    {
      id: 9,
      name: "Carné Diplomático",
      value: "9",
      stringValue: "CD",
    },
    {
      id: 10,
      name: "Certificado de Nacido Vivo",
      value: "10",
      stringValue: "CN",
    },
    {
      id: 11,
      name: "Salvoconducto de Permanencia",
      value: "11",
      stringValue: "SC",
    },
    {
      id: 12,
      name: "Pasaporte ONU",
      value: "12",
      stringValue: "ONU",
    },
    {
      id: 13,
      name: "Permiso Especial",
      value: "13",
      stringValue: "PE",
    },
    {
      id: 14,
      name: "Permiso por protección Temporal",
      value: "14",
      stringValue: "PT",
    },
  ];

  /** Array con los tipos de servicio que puede seleccionar el usuario */
  const opcionesServ = [
    {
      value: "",
      name: "Selecciona una opción",
    },
    {
      value: 1,
      name: "Autorizaciones",
    },
    {
      value: 2,
      name: "Validación cartera y Estado de Cuenta",
    },
    {
      value: 3,
      name: "Soporte de canales virtuales",
    },
    {
      value: 4,
      name: "Información general",
    },
  ];

  /** Empezamos a setear los estados */
  // const [isHoliday, setIsHoliday] = useState(false);
  const [key] = useState("33aee550240479398ff95acf320dc455");
  const [checked, setChecked] = useState(false); // Para el check de TyC del formulario
  const [disabled, setDisabled] = useState(true); // Para el botón de "Ingresar"
  const [goBackButton, setGoBackButton] = useState(true);
  const [resendDisabled, setResendDisabled] = useState(true); // Activa o inactiva el botón de volver a enviar código
  const [checkDisabled, setCheckDisabled] = useState(true); // Para habilitar el checkbox cuando los datos del form estén completos
  const [showUnauthModal, setShowUnauthModal] = useState(false); // Para mostrar el modal de datos errados
  const [showContactModal, setShowContactModal] = useState(false); // Para mostrar el modal de tipo de contacto
  const [showValidateOtpModal, setShowValidateOtpModal] = useState(false); // para mostrar el modal de validación de la otp
  const [handleClass, setHandleClass] = useState("unChecked"); // Para manejar la clase en los componentes
  const [formData, setFormData] = useState(initialData); // Para manejar la recolección de datos del formulario
  const [selectedEmail, setSelectedEmail] = useState(""); // Para guardar el email seleccionado para envío de la otp
  const [selectedCellphone, setSelectedCellphone] = useState(""); // Para guardar el celular seleccionado para el envío de la otp
  const [otpCode, setOtpCode] = useState(""); // Para el manejo de la otp
  const [subContactType, setSubContactType] = useState("");
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showWSEModal, setShowWSEModal] = useState(false);
  const [servUserEmail, setServUserEmail] = useState("");
  const [servUserCellphone, setServUserCellphone] = useState("");
  const [videoCallLink, setVideoCallLink] = useState("");
  const [showDiffDataModal, setShowDiffDataModal] = useState(false);
  const [url] = useState(
    "https://sndl.cariai.com/pre-colsanitas-videollamada/process"
  );
  // Errores de inputs
  const [otpError, setOtpError] = useState(false);
  const [docTypeError, setDocTypeError] = useState(false);
  const [docNumError, setDocNumError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [serviceTypeError, setServiceTypeError] = useState(false);
  const [checkError, setCheckError] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(false);
  // Loader
  const [loader, setLoader] = useState(false);
  /** Se definen las funciones básicas */

  /** Esta función se utilizará para reemplazar algunos carácteres del email y el celular del usuario cuando
   * solicite el envío de la otp */
  function hideData(email, cellphone) {
    let hiddenEmail = "";
    let hiddenCellphone = "";

    if (email.includes("@")) {
      const [username, domain] = email.split("@");
      if (email !== "") {
        const hiddenUsername =
          username.substring(0, 2) +
          "*".repeat(username.length - 4) +
          username.slice(-2);

        hiddenEmail = `${hiddenUsername}@${domain}`;
      }
    }

    if (cellphone.length === 10) {
      if (cellphone !== "") {
        hiddenCellphone =
          cellphone.substring(0, 3) +
          "*".repeat(cellphone.length - 5) +
          cellphone.slice(-2);
      }
    }

    return {
      hiddenEmail: hiddenEmail,
      hiddenCellphone: hiddenCellphone,
    };
  }

  /** Este useEffect se encarga de hacer console logs para probar distintas cosas en index.js */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActualDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  });

  const actualDay = actualDate.getDay();
  const actualHour = actualDate.getHours();
  let isHoliday = holidayCalc.isHoliday(actualDate);

  return (
    <ColsanitasVideoCallContext.Provider
      value={{
        client,
        opcionesDocs,
        opcionesServ,
        checked,
        setChecked,
        disabled,
        setDisabled,
        goBackButton,
        setGoBackButton,
        resendDisabled,
        setResendDisabled,
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
        otpError,
        setOtpError,
        subContactType,
        setSubContactType,
        showPermissionModal,
        setShowPermissionModal,
        loader,
        setLoader,
        hideData,
        actualDay,
        actualHour,
        isHoliday,
        showWSEModal,
        setShowWSEModal,
        servUserEmail,
        setServUserEmail,
        servUserCellphone,
        setServUserCellphone,
        videoCallLink,
        setVideoCallLink,
        showDiffDataModal,
        setShowDiffDataModal,
        url,
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
        key,
      }}
    >
      {children}
    </ColsanitasVideoCallContext.Provider>
  );
};

export { ColsanitasVideoCallContext, ColsanitasVideoCallProvider };
