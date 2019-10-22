import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { getSponsor } from "../../services/sponsorsServices";
import { Sponsor } from "../../services/models/sponsor";
type SponsorProps = {
  name: string;
};
type SponsorParams = {
  id: number;
};

type SponsorPropsAndRouter = SponsorParams & SponsorProps;
const SponsorDetail: React.SFC<
  RouteComponentProps<SponsorPropsAndRouter>
> = props => {
  const { id } = useParams();
  const [sponsorToCheck, setSponsorToCheck] = useState({} as Sponsor);
  useEffect(() => {
    getSponsor(Number(id)).then(s => setSponsorToCheck(s));
  }, []);

  return (
    <>
      <h1>Id - {sponsorToCheck.id}</h1>
      <h3>Nombre - {sponsorToCheck.name}</h3>
      <h3>Descripcion - {sponsorToCheck.description}</h3>
      <img src={sponsorToCheck.logoUrl}></img>
    </>
  );
};
export default SponsorDetail;
