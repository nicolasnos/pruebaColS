import React, { useEffect, useCallback } from "react";
import { ColsanitasVideoCallContext } from "../context";
import { BaseModal } from "../pages/BaseModal";
import { CloseIcon } from "../Atoms/CloseIcon";
import { WarningIcon } from "../Atoms/WarningIcon";
import { Paragraph } from "../Atoms/Paragraph";
import Button from "../Atoms/Button";
import "../styles/DiffDataModal.css";

const DiffDataModal = () => {
  const {
    setShowDiffDataModal,
    // client,
    // url,
    setVideoCallLink,
    formData,
    setShowPermissionModal,
    // key,
    setModalType,
    setShowWSEModal,
    executeService,
    validateSchedule,
  } = React.useContext(ColsanitasVideoCallContext);

  const handleClickClose = (e) => {
    e.preventDefault();
    setShowDiffDataModal(false);
  };

  // const callApi = async (
  //   typeId,
  //   numId,
  //   userName,
  //   email,
  //   cellphone,
  //   service,
  //   subContactType
  // ) => {
  //   let data = new FormData();
  //   data.append("operation", "userConsultOTP");
  //   data.append("token", "Contraseña123@");
  //   data.append("useProduction", "false");
  //   data.append("typeDocument", typeId);
  //   data.append("numberDocument", numId);
  //   data.append("fullUserName", userName);
  //   data.append("emailUser", email);
  //   data.append("phoneUser", cellphone);
  //   data.append("serviceType", service);
  //   data.append("otpMetod", subContactType);
  //   data.append("otpForwarding", 0);
  //   data.append("key", key);

  //   let headers = new Headers();
  //   headers.append("Content-Type", "multipart/form-data");

  //   try {
  //     const response = await client.postData(url, data, headers);
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchData = useCallback(async () => {
    try {
      let operation = "userConsultOTP";
      let idType = formData.docType;
      let idNum = formData.docNum;
      // let userName = formData.fullName;
      // let email = formData.userEmail;
      // let cellphone = formData.cellphoneNum;
      // let service = formData.serviceType;
      let contactMethod = "no";
      let otpForwarding = 0;

      const apiCallResult = await executeService(
        [
          "operation",
          "typeDocument",
          "numberDocument",
          "otpMetod",
          "otpForwarding",
        ],
        operation,
        idType,
        idNum,
        contactMethod,
        otpForwarding
      );

      if (apiCallResult.message[0].estado === "EXITOSO") {
        setVideoCallLink(apiCallResult.message[0].url);
        setModalType("diffData");
      } else {
        console.log("Hubo un error en el servicio", apiCallResult);
        setShowWSEModal(true);
        setShowDiffDataModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [formData, setVideoCallLink]);

  const changeModals = () => {
    setShowDiffDataModal(false);
    setShowPermissionModal(true);
  };

  useEffect(() => {
    fetchData(); // Llamada a la función fetchData al montar el componente
  }, [fetchData]);

  return (
    <BaseModal>
      <div className="modal-close-icon">
        <span onClick={handleClickClose}>
          <CloseIcon />
        </span>
      </div>
      <WarningIcon />
      <Paragraph
        className={"diff-data-modal-paragraph"}
        text={
          "Los datos de correo y teléfono que ingresaste no coinciden con nuestros registros. No obstante, tu solicitud será transferida con uno de nuestros asesores."
        }
      />
      <Button
        variant={"primary"}
        value={"Ingresar"}
        className={"modal-btn-send"}
        onClick={() => {
          validateSchedule();
          changeModals();
        }}
      />
    </BaseModal>
  );
};

export { DiffDataModal };
