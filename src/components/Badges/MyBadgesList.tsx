import React, { useEffect, useState, useContext, SyntheticEvent } from "react";
import { isEmpty } from "../../services/objectsservices";
import { connect } from 'react-redux';
import { ready, loading } from '../../store/loading/actions';
import { getBadgesFromMeber } from '../../services/membersServices';
import { UserContext } from '../../contexts/UserContext';
import { AppState } from '../../store';
import { GetBadgeResponse, BadgeMemberViewModel } from '../../services/models/BadgeDetail';
import { useHistory } from 'react-router-dom';
import { formatStringDate } from '../../helpers/DateHelpers';

type MyBadgesListProps = {};
type MyBadgesListStateProps = {
  loading: () => void;
  ready: () => void;
}
const MyBadgesListComponent: React.SFC<MyBadgesListProps & MyBadgesListStateProps> = ({ loading, ready }) => {
  const [badges, setBadges] = useState(new Array<BadgeMemberViewModel>());
  const history = useHistory();
  const { user } = useContext(UserContext);
  useEffect(() => {
    loadBadges();
  }, []);
  const loadBadges = () => {
    loading();
    getBadgesFromMeber(user.userId).then(s => {
      setBadges(s);
      ready();
    });
  }
  const handleDetail = (event: SyntheticEvent<HTMLAnchorElement>,
    badge: GetBadgeResponse) => {
    event.preventDefault();
    history.push(`/app/earned/badges/${badge.id}/detail`);
  }
  return (
    <>
      {!isEmpty(badges) &&
        badges.map(badge => (
          <div className="col-md-3">
            <div className="card">
              <div className="card-header borderless">
                <h5 className="mb-2">{badge.badge.name}</h5>
                <span className="text-muted d-block">{formatStringDate(badge.assignmentDate)}</span>
              </div>
              <div className="card-block post-emoticon" style={{ textAlign: "center" }}>
                <img className="img-fluid" style={{ maxHeight: "200px" }} src={badge.badge.imageUrl} alt="dashboard-user"></img>
                <div className="designer m-t-30">
                  <a
                    onClick={e => handleDetail(e, badge.badge)}
                    className="btn btn-primary shadow-2 text-uppercase btn-block">Detalle</a>
                </div>
                {/* <ul>
                        <li className="m-r-25"><i className="far fa-smile f-26 text-c-green m-r-10"></i>235</li>
                        <li className="m-r-25"><i className="far fa-smile f-26 text-c-purple m-r-10"></i>95</li>
                        <li className="m-r-0"><i className="far fa-smile f-26 text-c-red m-r-10"></i>18</li>
                      </ul> */}
              </div>
            </div>
          </div>
        ))}
    </>)
};
const mapStateToProps = (state: AppState) => ({
  memberDetail: state.memberDetail.memberDetail
});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const MyBadgesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBadgesListComponent);

