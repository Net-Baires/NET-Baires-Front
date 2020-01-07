import React, { } from "react";
import { EventDetail } from '../../services/models/Events/Event';
import { NavLink } from "react-router-dom";
import { SecureElement } from '../Auth/SecureElement';

type ControlPanelEventsLiveProps = {
  eventsDetail: EventDetail[];
};
const ControlPanelEventsLive: React.SFC<ControlPanelEventsLiveProps> = ({ eventsDetail }) => {

  return (
    <>
      {eventsDetail &&
        eventsDetail.map(event => (
          <div key={event.id} className="col-xl-4 col-md-6">
            <div className="card user-designer">
              <div className="card-block text-center">
                <div className="event-live-card-title">
                  <h5>{event.title}</h5>
                </div>
                {/* <span className="d-block mb-4">UX Designer</span> */}
                <div className="event-live-card-image-container">
                  <img
                    className="event-live-card-image"
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
                      to={`/app/events/${event.id}/live/panel`}
                    >
                      Panel de Control
          </NavLink>
                  </SecureElement>
                  <SecureElement roles={["Member"]}>
                    <NavLink
                      exact
                      className="btn btn-primary shadow-2 text-uppercase btn-block"
                      activeClassName="active"
                      to={`/app/events/${event.id}/live/panel`}
                    >
                      Panel de Control
          </NavLink>
                  </SecureElement>
                </div>
              </div>
            </div>
          </div>))}
    </>
  );
};
export default ControlPanelEventsLive;
