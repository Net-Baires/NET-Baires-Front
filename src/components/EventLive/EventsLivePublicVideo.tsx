import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getEventLiveOnlineLink } from "../../services/eventsServices";
type EventsLivePublicVideo = {
  name: string;
};
type EventsLivePublicVideoParams = {
  id: number;
};

type EventsLivePublicVideoAndRouter = EventsLivePublicVideoParams &
  EventsLivePublicVideo;
export const EventsLivePublicVideo: React.SFC<RouteComponentProps<
  EventsLivePublicVideoAndRouter
>> = () => {
  const [youtubeId, setYoutubeId] = useState("");
  useEffect(() => {
    getEventLiveOnlineLink()
      .then((link) => {
        setYoutubeId(link.onlineLink.substring(32, link.onlineLink.length));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="row broadcasting-live">
      <div className="col-1"></div>
      <div className="col-10"></div>
      <div className="col-1"></div>
      <div className="col-1"></div>
      <div className="col-10 broadcasting-message">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeId}?&autoplay=`}
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div className="col-1"></div>
    </div>
  );
};
