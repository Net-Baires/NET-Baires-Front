import React, { useEffect, useState } from "react";
import HomeSpeakers from "./HomeSpeakers";
import HomeOrganizers from "./HomeOrganizers/Index";
import HomeSponsors from "./HomeSponsors/Index";
import LastEvents from "./LastEvents/Index";
import { getCommunitySummary } from "../../services/communityServices";
import { Member } from "../../services/models/Member";

import { Sponsor } from "../../services/models/sponsor";
import { EventDetail } from "../../services/models/Events/Event";
import NumbersHomeSummary from "./NumbersHomeSummary";
import { connect } from 'react-redux';
import { loading, ready, setEventsLive } from '../../store/loading/actions';

type HomeProps = {
  loading: () => void;
  ready: () => void;
  setEventsLive: (eventsLive: boolean) => void;
};
const HomeComponent: React.SFC<HomeProps> = ({ loading, ready, setEventsLive }) => {
  const [loadReady, setLoadReady] = useState(false);
  const [sponsors, setSponsors] = useState(new Array<Sponsor>());
  const [speakers, setSpeakers] = useState(new Array<Member>());
  const [organizers, setOrganizers] = useState(new Array<Member>());
  const [lastEvents, setLastEvents] = useState(new Array<EventDetail>());
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalSpeakers, setTotalSpeakers] = useState(0);
  const [totalSlackMembers, setTotalSlackMembers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    loading();
    getCommunitySummary().then(x => {
      setSponsors(x.sponsors);
      setSpeakers(x.speakers);
      setOrganizers(x.organizers);
      setLastEvents(x.lastEvents);
      setTotalEvents(x.totalEvents);
      setTotalSlackMembers(x.totalUsersSlack);
      setTotalMembers(x.totalUsersMeetup);
      setTotalSpeakers(x.totalSpeakers);
      setEventsLive(x.eventsLive);
      setLoadReady(true);
      ready();
    });
  }, []);
  return (
    <>
      {/* <HomeHeaderBanner></HomeHeaderBanner> */}
      {/* <NextEvent></NextEvent> */}

      {/* <LastEvents events={lastEvents}></LastEvents> */}
      {/* <PhotosSummary></PhotosSummary> */}
      {/* <HomeOrganizers organizers={organizers}></HomeOrganizers> */}
      {/* <VideoPreview></VideoPreview> */}

      {loadReady && <>
        <HomeOrganizers organizers={organizers}></HomeOrganizers>
        {/* <PhotosSummary></PhotosSummary> */}
        <LastEvents events={lastEvents}></LastEvents>
        <HomeSpeakers speakers={speakers}></HomeSpeakers>

        <HomeSponsors sponsors={sponsors}></HomeSponsors>
        <NumbersHomeSummary
          totalEvents={totalEvents}
          totalMembers={totalMembers}
          totalSlackMembers={totalSlackMembers}
          totalSpeakers={totalSpeakers}
        ></NumbersHomeSummary>
      </>
      }


    </>
  );
};
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  },
  setEventsLive: (eventsLive: boolean) => {
    dispatch(setEventsLive(eventsLive));
  }
});

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

