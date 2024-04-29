import React from "react";
import { ColsanitasVideoCallContext } from "../context";

/** Importación componentes */
import Formulario from "../pages/Formulario";
import { OutOfTime } from "../pages/OutOfTime";
import Footer from "../Molecules/Footer";
//import { Testing } from "../pages/Testing";
import logo from "../assets/images/logo.png";

/** Importación imagenes */
import mainImage from "../assets/images/main-img.jpg";

/** Importación estilos  */
import "./App.css";

const AppUI = () => {
  const { actualDay, actualHour, isHoliday } = React.useContext(
    ColsanitasVideoCallContext
  );

  return (
    <div className="container">
      <figure className="logo-cont">
        <img src={logo} alt="Logo Colsanitas" className="logo-colsanitas" />
      </figure>
      <img
        src={mainImage}
        alt="Personas interactuando con el computador"
        className="main-image"
      />
      {actualDay === 0 /*No olvidar descomentar esta línea en paso a prod*/ ||
      (actualDay === 6 && actualHour < 8) ||
      (actualDay === 6 && actualHour >= 14) ||
      (actualDay !== 6 && actualHour < 8) ||
      (actualDay !== 6 && actualHour >= 20) ||
      //ANTES DE PASAR A PRODUCCIÓN VOLVER A 18
      isHoliday === true ? (
        <div className="ot-cont">
          <OutOfTime />
          <Footer />
        </div>
      ) : (
        <div className="form-container">
          <Formulario />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AppUI;
