import React from "react";
import { NavLink } from "react-router-dom";

type HomeHeaderBannerProps = {};
const HomeHeaderBanner: React.SFC<HomeHeaderBannerProps> = () => {
  return (
    <div className="hero-section app-hero">
      <div className="container">
        <div className="hero-content app-hero-content text-center">
          <div className="row justify-content-md-center">
            <div className="col-md-10">
              <h1 className="wow fadeInUp main-title" data-wow-delay="0s">
                NET-Baires
              </h1>
              <p className="wow fadeInUp main-subttitle" data-wow-delay="0.2s">
                Somos la comunidad de .NET mas grande de la Argentina.
              </p>
              <NavLink
                className="btn btn-primary btn-action"
                data-wow-delay="0.2s"
                href="#!"
                to="/JoinSlack"
              >
                Unirme a Slack
              </NavLink>
              {/* <a className="btn btn-primary btn-action" data-wow-delay="0.2s" href="#!">Buy Now</a> */}
            </div>
            {/* <div className="col-md-12">
                            <div className="hero-image">
                                <img className="img-fluid" src="assets/images/app_hero_1.png" alt="" />
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeaderBanner;
