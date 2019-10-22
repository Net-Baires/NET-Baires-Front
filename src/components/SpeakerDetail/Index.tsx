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
  const defaultSpeaker = {
    id: 0,
    name: "",
    lastName: "",
    picture: ""
  };
  const { id } = useParams();
  const [Speaker, setSpeaker] = useState<Speaker>(defaultSpeaker);
  useEffect(() => {
    getSpeaker(Number(id)).then(s => setSpeaker(s));
  }, []);
  return (
    <>
      <h1>Id - {Speaker.id}</h1>
      <h3>Nombre - {Speaker.name}</h3>
      <h3>LastName - {Speaker.lastName}</h3>
      <img src={Speaker.picture}></img>
    </>
  );
};
export default SpeakerDetail;
