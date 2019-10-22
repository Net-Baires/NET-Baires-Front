import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import {
  getEventsToSync,
  cancelEventsToSync,
  syncEventsToSync,
  updateEvent
} from "../../../services/eventsServices";
import { EventToSync } from "../../../services/models/Events/EventToSync";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";

type EventsToSyncProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type EventsToSyncParams = {
  id: number;
};

type EventsToSyncPropsAndRouter = EventsToSyncParams & EventsToSyncProps;
const EventsToSyncComponent: React.SFC<
  RouteComponentProps<EventsToSyncPropsAndRouter> & EventsToSyncProps
> = ({ loading, ready }) => {
  let history = useHistory();

  const defaultEventsToSync = new Array<EventToSync>();
  const [eventsToSync, setEventoToSync] = useState(defaultEventsToSync);
  useEffect(() => {
    loading();
    getEventsToSync().then(s => {
      setEventoToSync(s);
      ready();
    });
  }, []);

  const handleCloseEvent = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventToSync
  ) => {
    event.preventDefault();
    eventToSync.live = false;
    eventToSync.done = true;
    loading();
    updateEvent(eventToSync.id, eventToSync).then(x => {
      getEventsToSync().then(s => {
        setEventoToSync(s);
        ready();
      });
    });
  };
  const handleLiveEvent = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventToSync,
    isLive: boolean
  ) => {
    event.preventDefault();
    eventToSync.live = isLive;

    loading();
    updateEvent(eventToSync.id, eventToSync).then(x => {
      getEventsToSync().then(s => {
        setEventoToSync(s);
        ready();
      });
    });
  };
  return (
    <>
      {eventsToSync && (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Fecha</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {eventsToSync.map(event => (
              <tr key={event.id}>
                <th scope="row">{event.id}</th>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>
                  {!event.live ? (
                    <button
                      type="button"
                      onClick={e => handleLiveEvent(e, event, true)}
                      className="btn btn-success"
                    >
                      Comenzar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={e => handleLiveEvent(e, event, false)}
                      className="btn btn-warning"
                    >
                      Detener
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={e => handleCloseEvent(e, event)}
                    className="btn btn-primary"
                  >
                    Cerrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
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
