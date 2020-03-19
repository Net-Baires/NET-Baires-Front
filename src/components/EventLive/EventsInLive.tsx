import React, { useState, useEffect, MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { getEventsLive } from "../../services/eventsServices";
import { isEmpty } from "../../services/objectsservices";
import { AppState } from '../../store';
import { ready, loading } from '../../store/loading/actions';
import { connect } from 'react-redux';
import { EventDetail } from '../../services/models/Events/Event';
type EventsInLiveStateProps = {
  eventsLive: boolean;
};

const EventsInLiveComponent: React.SFC<EventsInLiveStateProps> = ({ eventsLive }) => {
  let history = useHistory();

  const defaultEventsInLiveToSync = new Array<EventDetail>();
  const [EventsInLiveToSync, setEventoToSync] = useState(
    defaultEventsInLiveToSync
  );

  useEffect(() => {
    getEventsLive().then(s => setEventoToSync(s));
  }, []);

  useEffect(() => {
    if (!eventsLive)
      history.push("/notfound");
  })
  const handleLiveEvent = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventDetail
  ) => {
    event.preventDefault();
    history.push(`/app/events/${eventToSync.id}/live/panel`);
  };
  const handleBroadcasting = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventDetail
  ) => {
    event.preventDefault();
    document.location.href = eventToSync.onlineLink;
  };
  const handleInfoEvent = (
    event: MouseEvent<HTMLButtonElement>,
    eventToSync: EventDetail
  ) => {
    event.preventDefault();
    history.push(`/app/events/${eventToSync.id}/attendance`);
  };
  return (
    <div className="pricing-section no-color text-center" id="pricing">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 ">
            <div className="pricing-intro">
              <h1 className="wow fadeInUp" data-wow-delay="0s">
                Eventos en vivo
              </h1>
              <p className="wow fadeInUp" data-wow-delay="0.2s">
                Eventos en proceso.
              </p>
            </div>
            <div className="row">
              {!isEmpty(EventsInLiveToSync) &&
                EventsInLiveToSync.map(event => (
                  <div key={event.id} className="col-sm-4">
                    <div
                      className="table-left wow fadeInUp"
                      data-wow-delay="0.4s"
                    >
                      <div className="icon icon-live-list-image-container">
                        <img
                          className="icon-live-list-image"
                          src={
                            event.imageUrl != null
                              ? event.imageUrl
                              : "/assets/images/imagenotfound.png"
                          }
                          alt="Icon"
                        />
                      </div>
                      <div className="event-live-actions-wrapper">
                        <h2 className="event-live-list-title">{event.title}</h2>
                        <div className="row">
                          <div className="col-sm-12">
                            <button
                              type="button"
                              onClick={e => handleInfoEvent(e, event)}
                              className="btn btn-success  btn-action btn-fill btn-event-live"
                            >
                              Anunciarme
                            </button>
                          </div>
                          <div className="col-sm-12">
                            <button
                              type="button"
                              onClick={e => handleLiveEvent(e, event)}
                              className="btn btn-primary btn-action btn-fill  btn-event-live"
                            >
                              Panel
                            </button>
                          </div>
                          {event.online &&
                            <div className="col-sm-12">
                              <button
                                type="button"
                                onClick={e => handleBroadcasting(e, event)}
                                className="btn btn-danger btn-danger btn-fill  btn-event-live"
                              >
                                Transmisión en vivo
                            </button>
                            </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  eventsLive: state.home.eventsLive
});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const EventsInLive = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsInLiveComponent);
