import React, { useEffect, useState, SyntheticEvent } from "react";
import { EventLiveDetail } from "../../services/models/Events/EventLiveDetail";
import { confirmAlert } from 'react-confirm-alert';
import { updateEvent } from '../../services/eventsServices';
import { SecureElement } from '../Auth/SecureElement';
type EventLiveTimeProps = {
  eventDetail: EventLiveDetail;
};
export const EventLiveTime: React.SFC<EventLiveTimeProps> = ({ eventDetail }) => {

  const [hour, setHours] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [second, setSeconds] = useState(0);
  useEffect(() => {
    let dateToAdd = new Date(eventDetail.startLiveTime);
    setInterval(() => {
      const today = dateToAdd;
      const endDate = new Date();
      const hours = parseInt(
        ((Math.abs(endDate - today) / (1000 * 60 * 60)) % 24).toString()
      );
      const minutes = parseInt(
        ((Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60)) % 60).toString()
      );
      const seconds = parseInt(
        ((Math.abs(endDate.getTime() - today.getTime()) / 1000) % 60).toString()
      );
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);
  }, [])
  const handlePauseEvent = (
    event: SyntheticEvent<HTMLElement>
  ) => {
    event.preventDefault();
    confirmAlert({
      title: "Detener Evento",
      message: "¿Esta seguro que quiere detener el evento?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            updateEvent(eventDetail.id, {
              generalAttended: false,
              live: false
            }).then(() => {
            });
          }
        },
        {
          label: "No",
          onClick: () => { }
        }
      ]
    });
  };
  return (
    <div className="col-md-6 col-xl-4">
      <div className="card theme-bg">
        <div className="card-header borderless">
          <h5 className="text-white">Evento Live</h5>
        </div>
        <div className="card-block text-center card-container-general">
          <h2 className="f-w-300 m-b-30 text-white timer-time-title">
            {hour}:{minute}:{second}
          </h2>
          <SecureElement roles={["Admin", "Organizer"]}>
            <i
              style={{ cursor: "pointer" }}
              onClick={handlePauseEvent}
              className="feather icon-pause f-50 text-white d-block m-b-25"
            ></i>
          </SecureElement>
          <SecureElement roles={["Member"]}>
            <i
              className="feather icon-pause f-50 text-white d-block m-b-25"
            ></i>
          </SecureElement>
        </div>
      </div>
    </div>
  );
};
