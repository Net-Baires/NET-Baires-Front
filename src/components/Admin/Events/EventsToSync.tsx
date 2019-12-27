import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getEventsToSync } from "../../../services/eventsServices";
import { EventToSync } from "../../../services/models/Events/EventToSync";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { EventToSyncActions } from "./EventToSyncActions";
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";
import { formatStringDate } from "../../../helpers/DateHelpers";
import { CardWrapper } from "../../Common/CardWrapper";

type EventsToSyncProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type EventsToSyncParams = {
  id: string;
};

type EventsToSyncPropsAndRouter = EventsToSyncParams & EventsToSyncProps;
const EventsToSyncComponent: React.SFC<RouteComponentProps<
  EventsToSyncPropsAndRouter
> &
  EventsToSyncProps> = ({ loading, ready }) => {
  const history = useHistory();
  const defaultEventsToSync = new Array<EventToSync>();
  const [eventsToSync, setEventoToSync] = useState(defaultEventsToSync);
  useEffect(() => {
    loading();
    getEventsToSync().then(s => {
      setEventoToSync(s);
      ready();
    });
  }, []);

  const handlerReadyAction = () => {
    getEventsToSync().then(s => {
      setEventoToSync(s);
      ready();
    });
  };
  const handleEditEvent = (
    event: MouseEvent<HTMLButtonElement>,
    meEvent: EventToSync
  ) => {
    event.preventDefault();
    history.push(`/admin/events/${meEvent.id}/edit`);
  };

  return (
    <div className="row">
      {eventsToSync &&
        eventsToSync.map(event => (
          <div className="col-xl-4 col-md-6">
            <div className="card user-designer">
              <div className="card-block text-center event-list-card">
                <h5 className="event-list-card-title">{event.title}</h5>
                <span className="d-block mb-4">
                  {formatStringDate(event.date)}
                </span>
                <img
                  className="img-fluid rounded-circle-event-list"
                  style={{ width: "70px;" }}
                  src={
                    event.imageUrl != null
                      ? event.imageUrl
                      : "/assets/images/imagenotfound.png"
                  }
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
                <div className="designer m-t-30 row eventToSync-container">
                  <EventToSyncActions
                    eventAction={event}
                    loading={loading}
                    ready={handlerReadyAction}
                  ></EventToSyncActions>
                  <button
                    data-tip="Editar Evento"
                    type="button"
                    onClick={e => handleEditEvent(e, event)}
                    className="btn btn-primary events-actions-button"
                  >
                    <i className="far fa-edit"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const EventsToSync = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsToSyncComponent);
