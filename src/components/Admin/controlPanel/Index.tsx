import React, { useEffect, useState } from "react";
import { getEventsLive } from "../../../services/eventsServices";
import { isEmpty } from "../../../services/objectsservices";
import { EventDetail } from "../../../services/models/Events/Event";
import { NavLink } from "react-router-dom";
import { CardWrapper } from "../../Common/CardWrapper";
import { EventActions } from "./EventActions";

type ControlPanelProps = {};
const ControlPanel: React.SFC<ControlPanelProps> = () => {
  const [eventsLive, setEventsLive] = useState(new Array<EventDetail>());
  useEffect(() => {
    getEventsLive().then(e => {
      setEventsLive(e);
    });
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
              <label className="text-muted">
                Copy/paste source code in your page in just couples of seconds.
              </label>
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
      {eventsLive &&
        eventsLive.map(event => (
          <div className="col-xl-4 col-md-6">
            <div className="card user-designer">
              <div className="card-block text-center">
                <div className="event-live-card-title">
                  <h5>{event.title}</h5>
                </div>
                <span className="d-block mb-4">UX Designer</span>
                <img
                  className="event-live-card-image"
                  style={{ width: "200px" }}
                  src={event.imageUrl}
                  alt="dashboard-user"
                ></img>
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
                  <NavLink
                    exact
                    className="btn btn-primary shadow-2 text-uppercase btn-block"
                    activeClassName="active"
                    to={`/admin/events/${event.id}/live/panel`}
                  >
                    Panel de Control
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      <EventActions></EventActions>
    </>
  );
};
export default ControlPanel;
