import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSponsor } from "../../services/sponsorsServices";
import { Sponsor } from "../../services/models/sponsor";
import { connect } from 'react-redux';
import { loading, ready } from '../../store/loading/actions';
type SponsorProps = {
  name: string;
  ready: () => void;
  loading: () => void;
};
type SponsorParams = {
  id: number;
};

type SponsorPropsAndRouter = SponsorParams & SponsorProps;
const SponsorDetailPublicPageComponent: React.SFC<SponsorPropsAndRouter> = ({ ready, loading }) => {
  const { id } = useParams();
  const [sponsorToCheck, setSponsorToCheck] = useState({} as Sponsor);
  useEffect(() => {
    loading();
    getSponsor(Number(id)).then(s => {
      setSponsorToCheck(s);
      ready();
    });
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
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const SponsorDetailPublicPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorDetailPublicPageComponent);
