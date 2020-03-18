import React, { useEffect } from "react";
import { RouteComponentProps, useParams } from 'react-router-dom';
import { getEventLive, getLiveEventDetail } from "../../services/eventsServices";
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
  const { id } = useParams();
  useEffect(() => {
    getLiveEventDetail(+id!).then(s => {
      if (s.online)
        setTimeout(() => {
          document.location.href = s.onlineLink;
        }, 2000);
      else
        alert("Este no es un evento online")
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
    <div className="col-10">
      <p>Aguarde mientras es redirigido a la transmisión en vivo</p>
    </div>
    <div className="col-1">
    </div>
  </div>;
};
