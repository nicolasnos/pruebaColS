import React from "react";
import { BaseModal } from "../pages/BaseModal";
import { Image } from "../Atoms/Image";
import Header from "./Header";
import Button from "../Atoms/Button";
import { Paragraph } from "../Atoms/Paragraph";
import { CloseIcon } from "../Atoms/CloseIcon";
import infoIcon from "../assets/images/info-circle.svg";
import "../styles/WrongUserModal.css";

const WrongUserModal = ({ setShowModal }) => {
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
        text={"Este es un canal de atención para usuarios de"}
        linesNumber={1}
        span={true}
        spanText={" Medicina Prepagada Colsanitas / Medisanitas"}
        spanClassName={"bold"}
      />
      <div className="bodyModal">
        <Paragraph
          text={`Si deseas adquirir nuestros servicios ingresa a https://www.colsanitas.com/en/planes o comunícate con nuestra línea de atención 6014871920 en Bogotá o 018000979020 a nivel nacional.`}
        />
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
