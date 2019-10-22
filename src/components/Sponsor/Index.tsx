import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { getSponsor } from "../../services/sponsorsServices";

type SponsorProps = {
  name: string;
};
type SponsorParams = {
  id: number;
};

type SponsorPropsAndRouter = SponsorParams & SponsorProps;
const Sponsor: React.SFC<
  RouteComponentProps<SponsorPropsAndRouter>
> = props => {
  const defaultSponsor = {
    id: 0,
    title: "",
    description: "",
    picture: ""
  };
  const { id } = useParams();
  const [sponsor, setSponsor] = useState(defaultSponsor);
  useEffect(() => {
    getSponsor(Number(id)).then(s => setSponsor(s));
  }, []);
  return (
    <>
      <h1>Id - {sponsor.id}</h1>
      <h3>Nombre - {sponsor.title}</h3>
      <h3>Descripcion - {sponsor.description}</h3>
      <img src={sponsor.picture}></img>
    </>
  );
};
export default Sponsor;
