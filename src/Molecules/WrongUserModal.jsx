import React, { useEffect } from "react";
import { BaseModal } from "../pages/BaseModal";
import { Image } from "../Atoms/Image";
import Header from "./Header";
import Button from "../Atoms/Button";
import { Paragraph } from "../Atoms/Paragraph";
import { CloseIcon } from "../Atoms/CloseIcon";
import infoIcon from "../assets/images/info-circle.svg";
import "../styles/WrongUserModal.css";

const WrongUserModal = ({ setShowModal, modalTextType }) => {
  const [text, setText] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [textSpan, setTextSpan] = React.useState("");

  useEffect(() => {
    if (modalTextType === 1) {
      setText(
        "En este momento tu contrato no se encuentra activo. Para más detalles, comunícate con nuestra línea de atención al 6014871920 en Bogotá o a nivel nacional al 018000979020"
      );
    } else if (modalTextType === 2) {
      setText(
        "Tu usuario no tiene permisos para ingresar a este canal. Si tienes dudas comunícate con nuestra línea de atención al 601 4871920 o a nivel nacional al 018000979020"
      );
    } else {
      setTextSpan(" Medicina Prepagada Colsanitas / Medisanitas");
      setText2(
        "Si deseas adquirir nuestros servicios ingresa a https://www.colsanitas.com/en/planes o comunícate con nuestra línea de atención 6014871920 en Bogotá o 018000979020 a nivel nacional."
      );
    }
  }, [modalTextType]);

  return (
    <BaseModal>
      <div className="modalHeader">
        <figure className="close-permission">
          <span onClick={() => setShowModal(false)}>
            <CloseIcon />
          </span>
        </figure>
        <Image src={infoIcon} alt={"circulo de información"} />
        <Header text={"Aviso"} type={3} />
      </div>
      <Paragraph
        text={
          modalTextType !== 0
            ? text
            : "Este es un canal de atención para usuarios de"
        }
        linesNumber={1}
        span={modalTextType === 0 ? true : false}
        spanText={modalTextType === 0 ? textSpan : null}
        spanClassName={modalTextType === 0 ? "bold" : null}
      />
      <div className="bodyModal">
        <Paragraph text={modalTextType === 0 ? text2 : null} />
      </div>
      <Button
        variant={"primary"}
        className={"acceptButton"}
        value={"Aceptar"}
        onClick={() => setShowModal(false)}
      />
    </BaseModal>
  );
};

export default WrongUserModal;
