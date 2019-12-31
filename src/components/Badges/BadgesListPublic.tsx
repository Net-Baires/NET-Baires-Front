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
    <main>
      <div className="lgx-page-wrapper">
        <section>
          <div className="container">
            <div className="row">
              {!isEmpty(badges) ? (
                badges.map(badge => (
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="lgx-single-news lgx-single-news-images">
                      <figure>
                        <a href={badge.badgeUrl} target="_blank">
                          <img src={badge.imageUrl} alt=""></img>
                        </a>
                      </figure>
                      <div className="single-news-info">
                        <div className="meta-wrapper">
                          <span>{formatStringDate(badge.created)}</span>
                          <span>
                            by{" "}
                            <a href="https://net-baires.com.ar" target="_blank">
                              NET-Baires
                            </a>
                          </span>
                        </div>
                        <h3 className="title">
                          <a href={badge.badgeUrl}>{badge.name}</a>
                        </h3>
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
        </section>
      </div>
    </main>
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
