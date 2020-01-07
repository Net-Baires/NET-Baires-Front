import React, { useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router";
import { getCurrentUser } from "../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { getBadges } from "../../services/badgesServices";
import { PageCenterWrapper } from "../Common/PageCenterWrapper";
import { GetBadgeResponse } from "../../services/models/BadgeDetail";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { formatStringDate } from "../../helpers/DateHelpers";
import { NavLink } from "react-router-dom";
import { NotFound } from "../Common/NotFoun";
import { isEmpty } from "../../services/objectsservices";

type BadgesListPublicProps = {
  loading: () => void;
  ready: () => void;
};

export const BadgesListPublicComponent: React.SFC<BadgesListPublicProps> = ({
  loading,
  ready
}) => {
  const [badges, setBadges] = useState(new Array<GetBadgeResponse>());
  const [error, setError] = useState(false);
  useEffect(() => {
    loading();
    getBadges()
      .then(x => {
        setBadges(x);
        ready();
      })
      .catch(e => {
        ready();
        setError(true);
      });
  }, []);
  const user = getCurrentUser();
  return (
    <div className="services-section text-center" id="nuestrosOrganizadores">
      <div className="container">
        <div className="row  justify-content-md-center">
          <div className="col-md-8">
            <div className="services-content">
              <h1 className="wow fadeInUp" data-wow-delay="0s">
                Nuestros Badges
           </h1>
              <p className="wow fadeInUp" data-wow-delay="0.2s">
                Estos son los badges que hemos entregado como reconocimiento a nuestros miemebros, por las diferentes actividades que llevamos adelante.
           </p>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <div className="services">
              <div className="row">
                {!isEmpty(badges) ? (
                  badges.map(badge => (
                    <div className="card  card-badge-container  col-sm-3" style={{ width: "18rem;" }}>
                      <div className="card-badge-img">
                        <img src={badge.imageUrl} className="card-img-top" alt="..."></img>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{badge.name}</h5>
                        {/* <p className="card-text">{badge.description}</p> */}
                        <div className="card-badge-link-container">
                          <NavLink
                            className="lgx-btn lgx-btn-white lgx-btn-sm"
                            to={`badges/${badge.id}`}
                          >
                            Detalle
                        </NavLink>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                    <NotFound title="No hay Badges disponibles actualmente"></NotFound>
                  )}
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

export const BadgesListPublic = connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgesListPublicComponent);
