import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { getOrganizer } from "../../services/organizersServices";
import { Speaker } from "../../services/models/speaker";

type OrganizerProps = {
  name: string;
};
type OrganizerParams = {
  id: number;
};

type OrganizerPropsAndRouter = OrganizerParams & OrganizerProps;
const OrganizerDetail: React.SFC<
  RouteComponentProps<OrganizerPropsAndRouter>
> = props => {
  const defaultOrganizer = {
    id: 0,
    name: "",
    lastName: "",
    picture: ""
  };
  const { id } = useParams();
  const [Organizer, setOrganizer] = useState<Speaker>(defaultOrganizer);
  useEffect(() => {
    getOrganizer(Number(id)).then(s => setOrganizer(s));
  }, []);
  return (
    <>
      <h1>Id - {Organizer.id}</h1>
      <h3>Nombre - {Organizer.name}</h3>
      <h3>LastName - {Organizer.lastName}</h3>
      <img src={Organizer.picture}></img>
    </>
  );
};
export default OrganizerDetail;
