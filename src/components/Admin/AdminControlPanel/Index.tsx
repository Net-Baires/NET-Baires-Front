import React, { useEffect, useState } from "react";
import { getEventsLive } from "../../../services/eventsServices";
import { isEmpty } from "../../../services/objectsservices";
import { EventDetail } from "../../../services/models/Events/Event";
import { NavLink } from "react-router-dom";
import { CardWrapper } from "../../Common/CardWrapper";
import { EventActions } from "./EventActions";
import { SecureElement } from '../../Auth/SecureElement';
import { subscribeDisconnectedMember, subscribeConnectedMember } from '../../../services/syncCommunicationServices';

type ControlPanelProps = {};
const ControlPanel: React.SFC<ControlPanelProps> = () => {
  const [eventsLive, setEventsLive] = useState(new Array<EventDetail>());
  const [countUserLoggued, setCountUserLoggued] = useState(0);
  useEffect(() => {
    getEventsLive().then(e => {
      setEventsLive(e);
    });
    subscribeDisconnectedMember(e => {
      setCountUserLoggued(e.totalConnected);
    })
    subscribeConnectedMember(e => {
      setCountUserLoggued(e.totalConnected);
    })
  }, []);
  return (
    <>
      {!isEmpty(eventsLive) && (
        <>
          <div className="col-sm-12">
            <div className="alert alert-primary" role="alert">
              <p>
                Estos son los eventos que se encuentran ocurriendo en este
                momento.
                {/* <a
              href="index-form-package.html"
              target="_blank"
              className="alert-link"
            >
              CHECKOUT
            </a> */}
              </p>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Eventos en Vivo</h5>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="row">
        {eventsLive &&
          eventsLive.map(event => (
            <div key={event.id} className="col-xl-4 col-md-6">
              <div className="card user-designer">
                <div className="card-block text-center">
                  <div className="event-live-card-title">
                    <h5>{event.title}</h5>
                  </div>
                  <div className="event-live-card-image-container">
                    <img
                      className="event-live-card-image"
                      style={{ height: "170px" }}
                      src={
                        event.imageUrl != null
                          ? event.imageUrl
                          : "/assets/images/imagenotfound.png"
                      }
                      alt="dashboard-user"
                    ></img>
                  </div>
                  <div className="row m-t-30">
                    <div className="col-md-4 col-6">
                      <h5>{event.registered}</h5>
                      <span className="text-muted">Registrados</span>
                    </div>
                    <div className="col-md-4 col-6">
                      <h5>{event.attended}</h5>
                      <span className="text-muted">Presentes</span>
                    </div>
                    <div className="col-md-4 col-12">
                      <h5>{event.didNotAttend}</h5>
                      <span className="text-muted">Ausentes</span>
                    </div>
                  </div>
                  <div className="designer m-t-30">
                    <SecureElement roles={["Admin", "Organizer"]}>
                      <NavLink
                        exact
                        className="btn btn-primary shadow-2 text-uppercase btn-block"
                        activeClassName="active"
                        to={`/admin/events/${event.id}/live/panel`}
                      >
                        Panel de Control
                    </NavLink>
                    </SecureElement>
                    <SecureElement roles={["Member"]}>
                      <NavLink
                        exact
                        className="btn btn-primary shadow-2 text-uppercase btn-block"
                        activeClassName="active"
                        to={`/member/events/${event.id}/live/panel`}
                      >
                        Panel de Control
                    </NavLink>
                    </SecureElement>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-md-3 col-xl-3">
          <div className="card theme-bg assets-value">
            <div className="bg-img"></div>
            <div className="card-block  text-center">
              <i className="fas fa-users f-50 text-white m-b-20"></i>
              <h5 className="text-white m-b-15">Usuarios Conectados</h5>
              <h3 className="text-white f-w-300">{countUserLoggued}</h3>
              {/* <span className="text-white">60% More than last Month</span> */}
            </div>
          </div>
        </div>
        <EventActions></EventActions>
      </div>
    </>
  );
};
export default ControlPanel;
