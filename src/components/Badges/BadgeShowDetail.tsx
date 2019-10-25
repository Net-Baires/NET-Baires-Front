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
  const history = useHistory();

  const [badge, setBadge] = useState({} as GetBadgeResponse);
  const [members, setMembers] = useState(new Array<Member>());
  const [found, setFound] = useState(false);
  useEffect(() => {
    loading();
    getBadge(+match.params.id)
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
    getMembersInBadge(+match.params.id).then(x => {
      setMembers(x);
      ready();
    });
  }, []);

  const user = getCurrentUser();
  return (
    <PageFullWidthWrapper classWrapper="lgx-post-wrapper">
      <article>
        <header>
          <figure>
            <a href={badge.badgeUrl}>
              <img src={badge.badgeImageUrl} alt="New" />
            </a>
          </figure>
          <div className="text-area">
            <div className="hits-area">
              <div className="date">
                <a href="https://net-baires.com.ar" target="blank">
                  <i className="fa fa-user"></i> NET-Baires
                </a>
                <a href="#">
                  <i className="fa fa-calendar"></i>{" "}
                  {formatStringDate(badge.created)}
                </a>
                <a href="#">
                  <i className="fa fa-folder"></i> News
                </a>
                <a href="#">
                  <i className="fa fa-comment"></i> 0 Comments
                </a>
                <a href="#">
                  <i className="fa fa-heart"></i> Hits: 353
                </a>
              </div>
            </div>
            <h1 className="title">{badge.name}</h1>
          </div>
        </header>
        <section>
          <p>{badge.description}</p>
        </section>
        <footer>
          <div className="row">
            <div className="col-xs-12">
              <h4 className="title">Miembros</h4>
              <div className="lgx-share">
                <UsersListToShow members={members}></UsersListToShow>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </PageFullWidthWrapper>
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
