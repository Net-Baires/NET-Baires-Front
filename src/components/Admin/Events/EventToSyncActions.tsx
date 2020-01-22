import React, { MouseEvent } from "react";
import { updateEvent, syncEvent } from "../../../services/eventsServices";
import { UpdateEvent } from "../../../services/models/Events/Event";
import ReactTooltip from "react-tooltip";
import { SecureElement } from '../../Auth/SecureElement';
import { NavLink, useHistory } from 'react-router-dom';
import { EventToSync } from '../../../services/models/Events/EventToSync';

type EventToSyncActionsProps = {
  eventAction: EventToSync;
  loading: () => void;
  ready: (idEvent: number) => void;
};
type EventToSyncActionsParams = {};

type EventToSyncActionsPropsAndRouter = EventToSyncActionsParams &
  EventToSyncActionsProps;
export const EventToSyncActions: React.SFC<EventToSyncActionsPropsAndRouter> = ({
  loading,
  ready,
  eventAction
}) => {
  const history = useHistory();
  const handleCloseEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    eventAction.live = false;
    eventAction.done = true;
    loading();
    updateEvent(eventAction.id, {
      live: false,
      done: true
    } as UpdateEvent).then(() => {
      ready(eventAction.id);
    });
  };
  const handleEditEvent = (
    event: MouseEvent<HTMLButtonElement>,
    meEvent: EventToSync
  ) => {
    event.preventDefault();
    history.push(`/app/events/${meEvent.id}/edit`);
  };
  const handleSyncEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    eventAction.live = false;
    eventAction.done = true;
    loading();
    syncEvent(eventAction.id).then(() => {
      ready(eventAction.id);
    });
  };
  const handleLiveEvent = (
    event: MouseEvent<HTMLButtonElement>,
    isLive: boolean
  ) => {
    event.preventDefault();
    eventAction.live = isLive;

    loading();
    updateEvent(eventAction.id, { live: isLive } as UpdateEvent).then(() =>
      ready(eventAction.id)
    );
  };
  "      to={`/app/events/${event.id}/live/panel`}"
  return (
    <div className="row">
      <div className="col">
        {!eventAction.live ? (
          <button
            data-tip="Comenzar evento, poner en Live"
            type="button"
            onClick={e => handleLiveEvent(e, true)}
            className="btn btn-success events-actions-button"
          >
            <i className="fas fa-play"></i>
          </button>
        ) : (
            <button
              data-tip="Detener evento que se encuentra Live"
              type="button"
              onClick={e => handleLiveEvent(e, false)}
              className="btn btn-warning events-actions-button"
            >
              <i className="fas fa-stop"></i>
            </button>
          )}
      </div>
      {!eventAction.done &&
        <div className="col">

          <button
            data-tip="Cerrar evento (Marcar como ya ejecutado)"
            type="button"
            onClick={e => handleCloseEvent(e)}
            className="btn btn-danger events-actions-button"
          >
            <i className="fas fa-window-close"></i>
          </button>
        </div>
      }
      <div className="col">

        <button
          data-tip="Sincronizar evento"
          type="button"
          onClick={e => handleSyncEvent(e)}
          className="btn btn-info events-actions-button"
        >
          <i className="fas fa-sync"></i>
        </button>
      </div>
      {eventAction.live &&
        <SecureElement roles={["Admin", "Organizer"]}>
          <div className="col">
            <NavLink
              exact
              data-tip="Abrir panel de evento en vivo"
              className="btn btn-info events-actions-button"
              activeClassName="active"
              to={`/app/events/${eventAction.id}/live/panel`}
            >
              <i className="fab fa-cpanel"></i>
            </NavLink>
          </div>
        </SecureElement>
      }

      <div className="col">
        <button
          data-tip="Editar Evento"
          type="button"
          onClick={e => handleEditEvent(e, eventAction)}
          className="btn btn-primary events-actions-button"
        >
          <i className="far fa-edit"></i>
        </button>
      </div >

      <ReactTooltip />
    </div>
  );
};
