import React, { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getEventLive } from "../../services/eventsServices";
import { EventDetail } from "../../services/models/Events/Event";
type EventsLivePublicDetailProps = {
  name: string;
};
type EventsLivePublicDetailParams = {
  id: number;
};

type EventsLivePublicDetailPropsAndRouter = EventsLivePublicDetailParams &
  EventsLivePublicDetailProps;
export const EventsLivePublicDetail: React.SFC<RouteComponentProps<
  EventsLivePublicDetailPropsAndRouter
>> = ({ ...props }) => {

  const [, setEventoToSync] = useState({} as EventDetail);
  useEffect(() => {
    getEventLive(+props.match.id).then(s => setEventoToSync(s));
  }, []);

  return <>{+props.match.id}</>;
};
