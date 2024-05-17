import React from "react";
import { ColsanitasVideoCallContext } from "../context";
import PropTypes from "prop-types";
import clock from "../assets/images/clock.svg";
import "../styles/AttentionSchedule.css";

const AttentionSchedule = ({ wvType }) => {
  const { calendarText } = React.useContext(ColsanitasVideoCallContext);

  return (
    <div className="schedule-container">
      {wvType === "schedule" ? (
        <>
          <div className="div-header">
            <img src={clock} alt="Reloj" className="schedule-icon" />
            <p className="schedule-title">Horario de atención</p>
          </div>
          <p className="schedule-info">{calendarText}</p>
        </>
      ) : (
        <>
          <figure className="out-of-time-icon-cont">
            <img src={clock} alt="Reloj" className="out-of-time-icon" />
          </figure>
          <h4 className="out-of-time-title schedule-title">
            Horario de atención
          </h4>
          <p className="out-of-time-paragraph schedule-info">{calendarText}</p>
        </>
      )}
    </div>
  );
};

AttentionSchedule.propTypes = {
  wvType: PropTypes.string,
};

export { AttentionSchedule };
