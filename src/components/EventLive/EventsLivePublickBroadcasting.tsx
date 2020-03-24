import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from 'react-router-dom';
import { getEventLive, getLiveEventDetail, getEventsLive } from "../../services/eventsServices";
type EventsLivePublickBroadcasting = {
  name: string;
};
type EventsLivePublickBroadcastingParams = {
  id: number;
};

type EventsLivePublickBroadcastingAndRouter = EventsLivePublickBroadcastingParams &
  EventsLivePublickBroadcasting;
export const EventsLivePublickBroadcasting: React.SFC<RouteComponentProps<
  EventsLivePublickBroadcastingAndRouter
>> = () => {
  const [liveEvent, setLiveEvent] = useState(true);
  useEffect(() => {
    getEventsLive().then(eventsLive => {
      if (eventsLive == null || eventsLive.length == 0) {
        setLiveEvent(false);
      }
      else {
        getLiveEventDetail(+eventsLive[0].id!).then(s => {
          if (s.online)
            setTimeout(() => {
              document.location.href = s.onlineLink;
            }, 2000);
          else {
            setLiveEvent(false);
          }
        });
      }
    });
  }, []);

  return <div className="row broadcasting-live">
    <div className="col-1">
    </div>
    <div className="col-10">
      <img className="img-broadcasting" src="/assets/images/live-now.png"></img>
    </div>
    <div className="col-1">
    </div>
    <div className="col-1">
    </div>
    <div className="col-10 broadcasting-message">
      {liveEvent ?
        <p>Aguarde mientras es redirigido a la transmisión en vivo</p>
        : <p>No hay transmisiones en vivo en este momento.</p>}
    </div>
    <div className="col-1">
    </div>
  </div>;
};
