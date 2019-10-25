import React, { MouseEvent } from "react";
import { updateEvent, syncEvent } from "../../../services/eventsServices";
import { UpdateEvent } from "../../../services/models/Events/Event";

export interface EventToSyncAction {
  id: number;
  live: boolean;
  done: boolean;
}
type EventToSyncActionsProps = {
  eventAction: EventToSyncAction;
  loading: () => void;
  ready: () => void;
};
type EventToSyncActionsParams = {};

type EventToSyncActionsPropsAndRouter = EventToSyncActionsParams &
  EventToSyncActionsProps;
export const EventToSyncActions: React.SFC<
  EventToSyncActionsPropsAndRouter
> = ({ loading, ready, eventAction }) => {
  const handleCloseEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    eventAction.live = false;
    eventAction.done = true;
    loading();
    updateEvent(eventAction.id, {
      live: false,
      done: true
    } as UpdateEvent).then(() => {
      ready();
    });
  };

  const handleSyncEvent = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    eventAction.live = false;
    eventAction.done = true;
    loading();
    syncEvent(eventAction.id).then(() => {
      ready();
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
      ready()
    );
  };
  return (
    <>
      {!eventAction.live ? (
        <button
          type="button"
          onClick={e => handleLiveEvent(e, true)}
          className="btn btn-success events-actions-button"
        >
          <i className="fas fa-play"></i>
        </button>
      ) : (
        <button
          type="button"
          onClick={e => handleLiveEvent(e, false)}
          className="btn btn-warning events-actions-button"
        >
          <i className="fas fa-stop"></i>
        </button>
      )}
      <button
        type="button"
        onClick={e => handleCloseEvent(e)}
        className="btn btn-danger events-actions-button"
      >
        <i className="fas fa-window-close"></i>
      </button>
      <button
        type="button"
        onClick={e => handleSyncEvent(e)}
        className="btn btn-info events-actions-button"
      >
        <i className="fas fa-sync"></i>
      </button>
    </>
  );
};
