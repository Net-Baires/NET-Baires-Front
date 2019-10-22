import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { EventToSync } from "../../services/models/Events/EventToSync";
import { getEventsLive } from "../../services/eventsServices";
type EventsInLiveToSyncProps = {
  name: string;
};
type EventsInLiveToSyncParams = {
  id: number;
};

type EventsInLiveToSyncPropsAndRouter = EventsInLiveToSyncParams &
  EventsInLiveToSyncProps;
export const EventsInLive: React.SFC<
  RouteComponentProps<EventsInLiveToSyncPropsAndRouter>
> = () => {
  let history = useHistory();

  const defaultEventsInLiveToSync = new Array<EventToSync>();
  const [EventsInLiveToSync, setEventoToSync] = useState(
    defaultEventsInLiveToSync
  );
  useEffect(() => {
    getEventsLive().then(s => setEventoToSync(s));
  }, []);

  const handleCancelEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleInfoEvent = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventToSync
  ) => {
    event.preventDefault();
    history.push(`/member/reportAssistance/${eventToSync.id}`);
  };
  return (
    <>
      {EventsInLiveToSync && (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Fuente</th>
              <th scope="col">Fecha</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {EventsInLiveToSync.map(event => (
              <tr key={event.id}>
                <th scope="row">{event.id}</th>
                <td>{event.title}</td>
                <td>{event.platform}</td>
                <td>{event.date}</td>
                <td>
                  <button
                    type="button"
                    onClick={e => handleInfoEvent(e, event)}
                    className="btn btn-info"
                  >
                    Anunciarme
                  </button>
                  <button
                    type="button"
                    onClick={e => handleCancelEvent(e, event)}
                    className="btn btn-secondary"
                  >
                    Detalle
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
