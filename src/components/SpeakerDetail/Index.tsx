import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { getSpeaker } from "../../services/speakersServices";
import { Speaker } from "../../services/models/speaker";

type SpeakerProps = {
  name: string;
};
type SpeakerParams = {
  id: number;
};

type SpeakerPropsAndRouter = SpeakerParams & SpeakerProps;
const SpeakerDetail: React.SFC<
  RouteComponentProps<SpeakerPropsAndRouter>
> = () => {
  const { id } = useParams();
  const [speakerDetail, setSpeaker] = useState<Speaker>({} as Speaker);
  useEffect(() => {
    getSpeaker(Number(id)).then(s => setSpeaker(s));
  }, []);
  return (
    <>
      <h1>Id - {speakerDetail.id}</h1>
      <h3>Nombre - {speakerDetail.name}</h3>
      <h3>LastName - {speakerDetail.lastName}</h3>
      <img src={speakerDetail.picture}></img>
    </>
  );
};
export default SpeakerDetail;
