import React, { useState, useEffect } from "react";
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const [, setEventoToSync] = useState({} as EventDetail);
  useEffect(() => {
    getEventLive(+id!).then(s => setEventoToSync(s));
  }, []);

  return <>{id}</>;
};
