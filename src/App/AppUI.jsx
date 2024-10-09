import React from "react";
import { ColsanitasVideoCallContext } from "../context";

/** Importación componentes */
import Formulario from "../pages/Formulario";
import { OutOfTime } from "../pages/OutOfTime";
import { CalendarLoader } from "../Atoms/CalendarLoader";
import Footer from "../Molecules/Footer";
import logo from "../assets/images/logo.png";

/** Importación imagenes */
import mainImage from "../assets/images/main-img.jpg";

/** Importación estilos  */
import "./App.css";

const AppUI = () => {
  const {
    actualDay,
    actualHour,
    calendarLoader,
    setCalendarLoader,
    validateSchedule,
    onTime,
  } = React.useContext(ColsanitasVideoCallContext);
  const [lastUpdateTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      // Verifica si hay un cambio en la fecha u hora desde la última actualización
      const hasDateTimeChanged =
        lastUpdateTime.getDay() !== actualDay ||
        lastUpdateTime.getHours() !== actualHour;

      if (hasDateTimeChanged) {
        // Realiza la recarga automática si hay un cambio
        window.location.reload();
      }
    }, 100); // intervalo de 0.1 segundos para la recarga

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [actualDay, actualHour, lastUpdateTime]);

  React.useEffect(() => {
    console.log(onTime);
    setCalendarLoader(true);
    validateSchedule();
  }, [onTime]);

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
      {onTime !== 1 ? (
        <div className="ot-cont">
          {calendarLoader ? <CalendarLoader /> : <OutOfTime />}
          <Footer />
        </div>
      ) : (
        <div className="form-container">
          {calendarLoader ? <CalendarLoader /> : <Formulario />}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default AppUI;
