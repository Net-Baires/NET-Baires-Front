import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { getBadge } from "../../services/badgesServices";
import { GetBadgeResponse } from "../../services/models/BadgeDetail";
import ReactHtmlParser from 'react-html-parser';
import MetaTags from 'react-meta-tags';
import { isEmpty } from '../../services/objectsservices';

type BadgeDetailProps = {
  loading: () => void;
  ready: () => void;
  idBadge: number;
};

export const BadgeShowDetailContainerComponent: React.SFC<BadgeDetailProps> = ({ idBadge, loading, ready }) => {
  const history = useHistory();

  const [badge, setBadge] = useState({} as GetBadgeResponse);
  useEffect(() => {
    loading();
    getBadge(idBadge)
      .then(x => {
        setBadge(x);
        ready();
      })
      .catch(() => {
        history.push("/notfound");
      });
  }, []);

  return (<>
    {!isEmpty(badge) && <>
      <MetaTags>
        <title>{`NET-Baires - Badge : ${badge.name}`}</title>
        <meta name="description" content={badge.description} />
        <meta property="og:title" content={`NET-Baires - Badge :${badge.name}`} />
        <meta property="og:image" content={badge.imageUrl} />
        <meta property="image" content={badge.imageUrl} />
      </MetaTags>
      <div className="services-section text-center" >
        <div className="container">
          <div className="row  justify-content-md-center">
            <div className="col-md-8">
              <div className="services-content">
                <h1 className="wow fadeInUp" data-wow-delay="0s">
                  {badge.name}
                </h1>
              </div>
            </div>
            <div className="col-md-12 text-center">
              <div className="services">
                <div className="row">
                  <div className="col-md-12 badge-detail-img">
                    <img src={badge.imageUrl} alt="New" />
                  </div>
                  <div className="col-md-12">
                    <p>{ReactHtmlParser(badge.description)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    }
  </>
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

export const BadgeShowDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgeShowDetailContainerComponent);
