import React from "react";
import { BaseModal } from "../pages/BaseModal";
import { Image } from "../Atoms/Image";
import Header from "./Header";
import Button from "../Atoms/Button";
import { Paragraph } from "../Atoms/Paragraph";
import { CloseIcon } from "../Atoms/CloseIcon";
import infoIcon from "../assets/images/info-circle.svg";
import "../styles/WrongUserModal.css";

const WSErrorModal = ({ setShowModal }) => {
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
          "Estimado usuario, lamentamos informarte que en este momento estamos presentando intermitencias en nuestro servicio, te pedimos por favor que intentes de nuevo más tarde."
        }
        linesNumber={1}
      />
      <Button
        variant={"primary"}
        className={"acceptButton"}
        value={"Aceptar"}
        onClick={() => setShowModal(false)}
      />
    </BaseModal>
  );
};

export default WSErrorModal;
