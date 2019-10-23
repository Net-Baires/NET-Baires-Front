import React, { useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router";
import { getCurrentUser } from "../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { getBadge } from "../../services/badgesServices";
import { BadgeDetail } from "../../services/models/User";
import { PageCenterWrapper } from "../Common/PageCenterWrapper";

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
  const [badge, setBadge] = useState({} as BadgeDetail);
  useEffect(() => {
    loading();
    getBadge(+match.params.id).then(x => {
      setBadge(x);
      ready();
    });
  }, []);
  const user = getCurrentUser();
  return (
    <PageCenterWrapper>
      <article>
        <header>
          <h1>Detalle Badge</h1>
          <h2> {badge.Name}</h2>
        </header>
        <header>
          <figure>
            <img
              className="img-report-assitance"
              src={badge.BadgeImageUrl}
              alt="New"
            ></img>
          </figure>
          <div className="text-area">
            <div className="speaker-info">
              <h1 className="title">
                {user.firstName} {user.lastName}
              </h1>
              <h4 className="subtitle">{user.email}</h4>
            </div>
          </div>
        </header>
      </article>
    </PageCenterWrapper>
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
