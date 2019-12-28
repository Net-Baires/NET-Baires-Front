import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { EventToSync } from "../../services/models/Events/EventToSync";
import { getEventsLive, getEventLive } from "../../services/eventsServices";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { NotFound } from "../Common/NotFoun";
import { isEmpty } from "../../services/objectsservices";
import { formatStringDate } from "../../helpers/DateHelpers";
import { match } from "react-router";
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
  let history = useHistory();

  const [EventsLivePublicDetail, setEventoToSync] = useState({} as EventDetail);
  useEffect(() => {
    getEventLive(+props.match.id).then(s => setEventoToSync(s));
  }, []);

  return <>{+props.match.id}</>;
};
