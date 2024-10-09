import colsanitasLogo from "../assets/images/logo.png";
import "../styles/CalendarLoader.css";

const CalendarLoader = () => {
  return (
    <figure className="loader-container">
      <img
        src={colsanitasLogo}
        alt="Logo Colsanitas"
        className="calendar-loader"
      ></img>
    </figure>
  );
};

export { CalendarLoader };
