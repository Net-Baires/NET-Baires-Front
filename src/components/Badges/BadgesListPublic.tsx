import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getCurrentUser } from "../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { getBadges } from "../../services/badgesServices";
import { GetBadgeResponse } from "../../services/models/BadgeDetail";
import { isEmpty } from "../../services/objectsservices";
import { BadgesListGridPublic } from './BadgesListGridPublic';

type BadgesListPublicProps = {
  loading: () => void;
  ready: () => void;
};

export const BadgesListPublicComponent: React.SFC<BadgesListPublicProps> = ({
  loading,
  ready
}) => {
  const history = useHistory();
  const [badges, setBadges] = useState(new Array<GetBadgeResponse>());
  const [, setError] = useState(false);
  useEffect(() => {
    loading();
    getBadges()
      .then(x => {
        setBadges(x);
        ready();
      })
      .catch(() => {
        ready();
        setError(true);
      });
  }, []);
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
                {!isEmpty(badges) && (
                  <BadgesListGridPublic callbackClick={b => history.push(`badges/${b.id}`)} badges={badges}></BadgesListGridPublic>
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
