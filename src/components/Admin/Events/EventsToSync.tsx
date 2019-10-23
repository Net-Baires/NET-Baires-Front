import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getEventsToSync } from "../../../services/eventsServices";
import { EventToSync } from "../../../services/models/Events/EventToSync";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { EventToSyncActions } from "./EventToSyncActions";
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";

type EventsToSyncProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type EventsToSyncParams = {
  id: string;
};

type EventsToSyncPropsAndRouter = EventsToSyncParams & EventsToSyncProps;
const EventsToSyncComponent: React.SFC<
  RouteComponentProps<EventsToSyncPropsAndRouter> & EventsToSyncProps
> = ({ loading, ready }) => {
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
    <PageFullWidthWrapper classWrapper="lgx-page-wrapper">
      {eventsToSync && (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Fecha</th>
              <th scope="col">Asistieron</th>
              <th scope="col">No Asistieron</th>
              <th scope="col">Plataforma</th>
              <th scope="col">Imagen</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {eventsToSync.map(event => (
              <tr key={event.id}>
                <th scope="row">{event.id}</th>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.attendedCount}</td>
                <td>{event.didNotAttendCount}</td>
                <td>
                  <img
                    className="img-preview-list-events"
                    src={event.imageUrl}
                  ></img>
                </td>
                <td>
                  {event.platform == "Meetup" && (
                    <img
                      className="platform-icon"
                      src="https://net-baires.azureedge.net/images/meetup-mini-logo.png"
                    ></img>
                  )}
                  {event.platform == "EventBrite" && (
                    <img
                      className="platform-icon"
                      src="https://net-baires.azureedge.net/images/eventbrite-mini-logo.png"
                    ></img>
                  )}
                </td>

                <td>
                  <EventToSyncActions
                    eventAction={event}
                    loading={loading}
                    ready={handlerReadyAction}
                  ></EventToSyncActions>
                  <button
                    type="button"
                    onClick={e => handleEditEvent(e, event)}
                    className="btn btn-primary"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageFullWidthWrapper>
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
