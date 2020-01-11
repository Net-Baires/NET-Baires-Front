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
    <div className="services-section text-center" >
      <div className="container">
        <div className="row  justify-content-md-center">
          <div className="col-md-8">
            <div className="services-content">
              <h1 className="wow fadeInUp" data-wow-delay="0s">
                {sponsorToCheck.name}
              </h1>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <div className="services">
              <div className="row">
                <div className="col-md-12 badge-detail-img">
                  <img src={sponsorToCheck.logoUrl} alt="New" />
                </div>
                <div className="col-md-12">
                  <p>{sponsorToCheck.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SponsorDetail;
