import React, { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import {
  GetAdminLiveEventDetail
} from "../../services/eventsServices";
import { EventLiveDetail } from "../../services/models/Events/EventLiveDetail";
import { isEmpty } from "../../services/objectsservices";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { EventLiveTime } from '../EventLive/EventLiveTme';
import { AddCodeToLiveEvent } from './AddCodeToLiveEvent';
import { CardWrapper } from '../Common/CardWrapper';
import { QRCode } from 'react-qr-svg';
import { subscribe, CommunicationMessageType, UpdateEventLive } from '../../services/communicationServices';
type MemberEventLivePanelProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type MemberEventLivePanelParams = {
  id: string;
};

type MemberEventLivePanelPropsAndRouter = MemberEventLivePanelParams &
  MemberEventLivePanelProps;
const MemberEventLivePanelComponent: React.SFC<RouteComponentProps<
  MemberEventLivePanelPropsAndRouter
> &
  MemberEventLivePanelProps> = ({ loading, ready, ...props }) => {
    const [eventDetail, setEventDetail] = useState<EventLiveDetail>(
      {} as EventLiveDetail);

    const history = useHistory();
    const loadEventDetail = () => {
      GetAdminLiveEventDetail(+props.match.params.id).then(s => {
        if (s == null) history.push("/admin/panel");
        setEventDetail(s);
        ready();
      });
    };
    useEffect(() => {
      loading();
      subscribe<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, (data) => {
        if (+data.eventId === +props.match.params.id)
          loadEventDetail();
      });
      loadEventDetail();
    }, []);


    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>{eventDetail.title}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card theme-bg2">
            <div className="card-block customer-visitor">
              <h2 className="text-white text-right mt-2 f-w-300">19:23</h2>
              <span className="text-white text-right d-block">
                {eventDetail.attended ? "Presente" : "Ausente"}
              </span>
              <i className="fas fa-globe text-white"></i>
            </div>
          </div>
        </div>
        {!isEmpty(eventDetail) && (<>
          <EventLiveTime eventDetail={eventDetail}></EventLiveTime>
          <AddCodeToLiveEvent eventLive={eventDetail}></AddCodeToLiveEvent>
          {!eventDetail.attended &&
            <CardWrapper colSize={4} cardTitle="Reportar mi asistencia">
              <div style={{ textAlign: "center" }}>
                <QRCode
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="Q"
                  style={{ width: 256 }}
                  value={eventDetail.tokenToReportMyAttendance}
                />
              </div>
            </CardWrapper>}
        </>
        )}
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

export const MemberEventLivePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberEventLivePanelComponent);
