import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { EventToSync } from "../../services/models/Events/EventToSync";
import { getEventsLive } from "../../services/eventsServices";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { NotFound } from "../Common/NotFoun";
import { isEmpty } from "../../services/objectsservices";
import { formatStringDate } from "../../helpers/DateHelpers";
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

  const handleLiveEvent = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventToSync
  ) => {
    event.preventDefault();
    history.push(`/events/${eventToSync.id}/live`);
  };
  const handleInfoEvent = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventToSync
  ) => {
    event.preventDefault();
    history.push(`/member/events/${eventToSync.id}/attendance`);
  };
  return (
    <PageFullWidthWrapper>
      {!isEmpty(EventsInLiveToSync) ? (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              {/* <th scope="col">Fuente</th> */}
              <th scope="col">Fecha</th>
              <th scope="col">Imagen</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {EventsInLiveToSync.map(event => (
              <tr key={event.id}>
                <th scope="row">{event.id}</th>
                <td>{event.title}</td>
                {/* <td>{event.platform}</td> */}
                <td>{formatStringDate(event.date)}</td>
                <td>
                  <img
                    className="img-preview-list-events "
                    src={event.imageUrl}
                  ></img>
                </td>
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
                    onClick={e => handleLiveEvent(e, event)}
                    className="btn btn-success"
                  >
                    Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NotFound
          title="No hay eventos en LIVE"
          message="En este momento no estamos realizando ningún evento. Te invitamos a visitar nuestro sitio de meetup."
        ></NotFound>
      )}
    </PageFullWidthWrapper>
  );
};
