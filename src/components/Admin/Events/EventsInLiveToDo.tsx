import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory, NavLink } from "react-router-dom";
import { EventToSync } from "../../../services/models/Events/EventToSync";
import { getEventsLive } from "../../../services/eventsServices";
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";
import { formatStringDate } from "../../../helpers/DateHelpers";
type EventsInLiveToDoProps = {
  name: string;
};
type EventsInLiveToDoParams = {
  id: number;
};

type EventsInLiveToDoPropsAndRouter = EventsInLiveToDoParams &
  EventsInLiveToDoProps;
export const EventsInLiveToDo: React.SFC<RouteComponentProps<
  EventsInLiveToDoPropsAndRouter
>> = () => {
  let history = useHistory();

  const defaultEventsInLiveToDo = new Array<EventToSync>();
  const [EventsInLiveToDo, setEventoToSync] = useState(defaultEventsInLiveToDo);
  useEffect(() => {
    getEventsLive().then(s => setEventoToSync(s));
  }, []);

  const handleCancelEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleAssistance = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventToSync
  ) => {
    event.preventDefault();
    history.push(`/admin/events/${eventToSync.id}/attendances/general`);
  };
  return (
    <>
      {EventsInLiveToDo && (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Fecha</th>
              <th scope="col" colSpan="2">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {EventsInLiveToDo.map(event => (
              <tr key={event.id}>
                <th scope="row">{event.id}</th>
                <td>{event.title}</td>
                <td>{formatStringDate(event.date)}</td>
                <td>
                  <button
                    type="button"
                    onClick={e => handleAssistance(e, event)}
                    className="btn btn-info"
                  >
                    Asistencia General
                  </button>
                </td>
                <td>
                  <NavLink
                    className="btn btn-success"
                    activeClassName="active"
                    to={`/admin/events/${event.id}/live/panel`}
                  >
                    Panel
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
