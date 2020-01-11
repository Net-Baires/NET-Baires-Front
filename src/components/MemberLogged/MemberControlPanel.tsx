import React, { useEffect, useState, useContext } from "react";
import { getEventsLive } from "../../services/eventsServices";
import { isEmpty } from "../../services/objectsservices";
import { EventDetail } from "../../services/models/Events/Event";
import ControlPanelEventsLive from '../EventLive/ControlPanelEventsLive';
import { subscribe, UpdateEventLive, CommunicationMessageType } from '../../services/communicationServices';
import { connect } from 'react-redux';
import { ready, loading, setMemberDetail } from '../../store/loading/actions';
import { getMemberDetail, getBdgesFromMeber } from '../../services/membersServices';
import { UserContext } from '../../contexts/UserContext';
import { AppState } from '../../store';
import { Member } from '../../services/models/Member';
import { getMe } from '../../services/profileServices';
import { CardHeaderCollapsableWrapper } from '../Common/CardHeaderCollapsableWrapper';
import { BadgesListGridPublic } from '../Badges/BadgesListGridPublic';
import { GetBadgeResponse } from '../../services/models/BadgeDetail';
import { useHistory } from 'react-router-dom';
import { formatStringDate } from '../../helpers/DateHelpers';

type MemberControlPanelProps = {};
type MemberControlPanelStateProps = {
  loading: () => void;
  ready: () => void;
  memberDetail: Member;
  setMemberDetail: (member: Member) => void;
}
const MemberControlPanelComponent: React.SFC<MemberControlPanelProps & MemberControlPanelStateProps> = ({ loading, ready, memberDetail, setMemberDetail }) => {
  const [eventsLive, setEventsLive] = useState(new Array<EventDetail>());
  const [badges, setBadges] = useState(new Array<GetBadgeResponse>());
  const history = useHistory();
  const { user } = useContext(UserContext);
  useEffect(() => {
    loadEvents();
    loadBadges();
    subscribe<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, () => {
      loadEvents();
      getMe().then(e => setMemberDetail(e));
    });
    return () => { unmounted: true };
  }, []);
  const loadEvents = () => {
    loading();
    getEventsLive().then(e => {
      setEventsLive(e);
      ready();
    });

  }
  const loadBadges = () => {
    getBdgesFromMeber(user.userId).then(s => setBadges(s));
  }
  return (
    <>
      {!isEmpty(eventsLive) && (
        <>
          <div className="row aaa">
            <div className="col-sm-12">
              <div className="alert alert-primary" role="alert">
                <p>
                  Estos son los eventos que se encuentran ocurriendo en este
                  momento.
              </p>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Eventos en Vivo</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <ControlPanelEventsLive eventsDetail={eventsLive}></ControlPanelEventsLive>
          </div>
          <div className="row">

            <div className="col-lg-4">
              <div className="card card-social">
                <div className="card-block border-bottom">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-auto">
                      <i className="fas fa-calendar-alt text-c-blue f-36"></i>
                    </div>
                    <div className="col text-right">
                      <h3>{memberDetail.eventsRegistered}</h3>
                      <h5 className="text-c-purple mb-0">{memberDetail.averageAttendance}% <span className="text-muted">Eventos Registrados</span></h5>
                    </div>
                  </div>
                </div>
                <div className="card-block">
                  <div className="row align-items-center justify-content-center card-active">
                    <div className="col-6">
                      <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Presente : </span>{memberDetail.eventsAttended}</h6>
                      <div className="progress">
                        <div className="progress-bar progress-c-green" role="progressbar" style={{ width: `${memberDetail.eventsAttended * 100 / memberDetail.eventsRegistered}%`, height: "6px" }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Ausente :</span>{memberDetail.eventsNoAttended}</h6>
                      <div className="progress">
                        <div className="progress-bar progress-c-blue" role="progressbar" style={{ width: `${memberDetail.eventsNoAttended * 100 / memberDetail.eventsRegistered}%`, height: "6px" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isEmpty(badges) &&
            <CardHeaderCollapsableWrapper cardTitle="Mis Badges">
              {badges.map(badge => (
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-header borderless">
                      <h5 className="mb-2">{badge.name}</h5>
                      <span className="text-muted d-block">{formatStringDate(badge.created)}</span>
                    </div>
                    <div className="card-block post-emoticon" style={{ textAlign: "center" }}>
                      <img className="img-fluid" style={{ maxHeight: "200px" }} src={badge.imageUrl} alt="dashboard-user"></img>
                      <ul>
                        <li className="m-r-25"><i className="far fa-smile f-26 text-c-green m-r-10"></i>235</li>
                        <li className="m-r-25"><i className="far fa-smile f-26 text-c-purple m-r-10"></i>95</li>
                        <li className="m-r-0"><i className="far fa-smile f-26 text-c-red m-r-10"></i>18</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </CardHeaderCollapsableWrapper>}
        </>
      )
      }
    </>
  );
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
  },
  setMemberDetail: (member: Member) => {
    dispatch(setMemberDetail(member));
  }
});

export const MemberControlPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberControlPanelComponent);
