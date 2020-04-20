import React, { useEffect, useState } from "react";
import { getEventsLive } from "../../services/eventsServices";
import { isEmpty } from "../../services/objectsservices";
import { EventDetail } from "../../services/models/Events/Event";
import ControlPanelEventsLive from "../EventLive/ControlPanelEventsLive";
import {
  subscribe,
  UpdateEventLive,
  CommunicationMessageType,
} from "../../services/communicationServices";
import { connect } from "react-redux";
import { ready, loading, setMemberDetail } from "../../store/loading/actions";
import { AppState } from "../../store";
import { Member } from "../../services/models/Member";
import { getMe } from "../../services/profileServices";
import { CardHeaderCollapsableWrapper } from "../Common/CardHeaderCollapsableWrapper";
import { useHistory } from "react-router-dom";
import { MyBadgesList } from "../Badges/MyBadgesList";
import { ShareProfile } from "../Profile/ShareProfile";

type MemberControlPanelProps = {};
type MemberControlPanelStateProps = {
  loading: () => void;
  ready: () => void;
  memberDetail: Member;
  setMemberDetail: (member: Member) => void;
};
const MemberControlPanelComponent: React.SFC<
  MemberControlPanelProps & MemberControlPanelStateProps
> = ({ loading, ready, memberDetail, setMemberDetail }) => {
  const [eventsLive, setEventsLive] = useState(new Array<EventDetail>());
  useEffect(() => {
    loadEvents();
    subscribe<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, () => {
      loadEvents();
      getMe().then((e) => setMemberDetail(e));
    });
    return () => {
      unmounted: true;
    };
  }, []);
  const loadEvents = () => {
    loading();
    getEventsLive().then((e) => {
      setEventsLive(e);
      ready();
    });
  };
  return (
    <>
      {!isEmpty(eventsLive) && (
        <>
          <div className="row aaa">
            <div className="col-sm-12">
              <div className="alert alert-primary" role="alert">
                <p>Eventos en proceso.</p>
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
            <ControlPanelEventsLive
              eventsDetail={eventsLive}
            ></ControlPanelEventsLive>
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
                      <h5 className="text-c-purple mb-0">
                        {memberDetail.averageAttendance}%{" "}
                        <span className="text-muted">Eventos Registrados</span>
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="card-block">
                  <div className="row align-items-center justify-content-center card-active">
                    <div className="col-6">
                      <h6 className="text-center m-b-10">
                        <span className="text-muted m-r-5">Presente : </span>
                        {memberDetail.eventsAttended}
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar progress-c-green"
                          role="progressbar"
                          style={{
                            width: `${
                              (memberDetail.eventsAttended * 100) /
                              memberDetail.eventsRegistered
                            }%`,
                            height: "6px",
                          }}
                          aria-valuenow="40"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 className="text-center  m-b-10">
                        <span className="text-muted m-r-5">Ausente :</span>
                        {memberDetail.eventsNoAttended}
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar progress-c-blue"
                          role="progressbar"
                          style={{
                            width: `${
                              (memberDetail.eventsNoAttended * 100) /
                              memberDetail.eventsRegistered
                            }%`,
                            height: "6px",
                          }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CardHeaderCollapsableWrapper
            collapsed={false}
            cardTitle="Mis Badges"
          >
            <MyBadgesList></MyBadgesList>
          </CardHeaderCollapsableWrapper>
        </>
      )}
    </>
  );
};
const mapStateToProps = (state: AppState) => ({
  memberDetail: state.memberDetail.memberDetail,
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
  },
});

export const MemberControlPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberControlPanelComponent);
