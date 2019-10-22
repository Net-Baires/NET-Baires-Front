import React from "react";
import HomeSpeakers from "./HomeSpeakers";
import HomeOrganizers from "./HomeOrganizers/Index";
import NextEvent from "./NextEvent/Index";
import HomeSponsors from "./HomeSponsors/Index";
import LastEvents from "./LastEvents/Index";
import PhotosSummary from "./PhotosSummary/Index";
import VideoPreview from "./VideoPreview/Index";
import HomeHeaderBanner from "./HomeHeaderBanner/Index";

type LoginProps = {};
export const Home: React.SFC<LoginProps> = () => {
  return (
    <>
      <HomeHeaderBanner></HomeHeaderBanner>
      {/* <NextEvent></NextEvent> */}
      {/* <HomeSpeakers></HomeSpeakers> */}
      <HomeSponsors></HomeSponsors>
      {/* <LastEvents></LastEvents> */}
      {/* <PhotosSummary></PhotosSummary> */}
      {/* <HomeOrganizers></HomeOrganizers> */}
      {/* <VideoPreview></VideoPreview> */}
    </>
  );
};

export default Home;
