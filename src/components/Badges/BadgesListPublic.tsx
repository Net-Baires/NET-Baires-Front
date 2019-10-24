import React, { useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router";
import { getCurrentUser } from "../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { getBadges } from "../../services/badgesServices";
import { PageCenterWrapper } from "../Common/PageCenterWrapper";
import { BadgeDetail } from "../../services/models/BadgeDetail";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { formatStringDate } from "../../helpers/DateHelpers";
import { NavLink } from "react-router-dom";

type BadgesListPublicProps = {
  loading: () => void;
  ready: () => void;
};

export const BadgesListPublicComponent: React.SFC<BadgesListPublicProps> = ({
  loading,
  ready
}) => {
  const [badges, setBadges] = useState(new Array<BadgeDetail>());
  useEffect(() => {
    loading();
    getBadges().then(x => {
      setBadges(x);
      ready();
    });
  }, []);
  const user = getCurrentUser();
  return (
    <main>
      <div className="lgx-page-wrapper">
        <section>
          <div className="container">
            <div className="row">
              {badges &&
                badges.map(badge => (
                  <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className="lgx-single-news lgx-single-news-images">
                      <figure>
                        <a href={badge.badgeUrl} target="_blank">
                          <img src={badge.badgeImageUrl} alt=""></img>
                        </a>
                      </figure>
                      <div className="single-news-info">
                        <div className="meta-wrapper">
                          <span>{formatStringDate(badge.created)}</span>
                          <span>
                            by{" "}
                            <a href={badge.issuerUrl} target="_blank">
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
                ))}
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
