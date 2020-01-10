import React, { useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router";
import { getCurrentUser } from "../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { getBadge } from "../../services/badgesServices";
import { Member } from "../../services/models/Member";
import { GetBadgeResponse } from "../../services/models/BadgeDetail";
import { PageCenterWrapper } from "../Common/PageCenterWrapper";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { formatStringDate } from "../../helpers/DateHelpers";
import { getMembersInBadge } from "../../services/membersServices";
import { UsersListToShow } from "../Users/UsersListToShow";
import { NotFound } from "../Common/NotFoun";
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

type BadgeDetailProps = {
  loading: () => void;
  ready: () => void;
};
type BadgeDetailParams = {
  id: string;
};

type BadgeDetailPropsAndRouter = BadgeDetailParams & BadgeDetailProps;
export const BadgeShowDetailComponent: React.SFC<
  RouteComponentProps<BadgeDetailPropsAndRouter> & BadgeDetailProps
> = ({ match, loading, ready }) => {
  const { id } = useParams();
  const history = useHistory();

  const [badge, setBadge] = useState({} as GetBadgeResponse);
  const [members, setMembers] = useState(new Array<Member>());
  const [found, setFound] = useState(false);
  useEffect(() => {
    loading();
    getBadge(+id)
      .then(x => {
        setBadge(x);
        setFound(true);
        ready();
      })
      .catch(e => {
        history.push("/notfound");
      });
  }, []);
  useEffect(() => {
    loading();
    getMembersInBadge(+id!).then(x => {
      setMembers(x);
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

export const BadgeShowDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgeShowDetailComponent);
