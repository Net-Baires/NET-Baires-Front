import React from "react";
import { Sponsor } from "../../../services/models/sponsor";
import { isEmpty } from "../../../services/objectsservices";
import { NavLink } from 'react-router-dom';
type HomeSponsorsProps = {
  sponsors: Sponsor[];
};
const HomeSponsors: React.SFC<HomeSponsorsProps> = ({ sponsors }) => {
  return (
    <>
      {!isEmpty(sponsors) && (
        <div className="feature_huge text-center" id="sponsors">
          <div className="container">
            <div className="row">
              <div className="col-md-12 feature_list">
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="home-section-title">
                      Las empresas que nos apoyan
                    </h1>
                  </div>
                  {sponsors.map(sponsor => (
                    <div
                      key={sponsor.id}
                      className="col-md-3 wow fadeInUp sponsor-home"
                      data-wow-delay="0.2s"
                    >
                      <NavLink
                        exact
                        data-tip={sponsor.name}
                        activeClassName="active"
                        to={`/sponsors/${sponsor.id}`}
                      >
                        <img src={sponsor.logoUrl} alt={sponsor.name} />
                        <h1>{sponsor.name}</h1>
                      </NavLink>

                      {/* <p>{sponsor.description}</p> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeSponsors;
