import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loading, ready } from '../../../../store/loading/actions';
import {
  GetAdminLiveEventDetail
} from "../../../../services/eventsServices";
import { EventLiveDetail } from "../../../../services/models/Events/EventLiveDetail";
import { LastUsersAttended } from "../../../EventLive/LastUsersAttended";
import { isEmpty } from "../../../../services/objectsservices";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { EventLiveTime } from '../../../EventLive/EventLiveTme';
import { CardWrapper } from '../../../Common/CardWrapper';
import { CommunicationMessageType, subscribe, UpdateEventLive } from '../../../../services/communicationServices';
import { updateEventLive } from '../../../../services/syncCommunicationServices';
import { TitleHeader } from '../../../Common/TitleHeader';
import { LiveConfigucations } from '../Components/LiveConfigucations';
import { AttendantCount } from '../Components/AttendantCount';
import { GroupCode } from '../Components/GroupCode';
import { SyncUserToEvent } from './SyncUserToEvent';
type AdminEventLivePanelProps = {
  loading: () => void;
  ready: () => void;
  eventId: number;
};

const AdminEventLivePanelComponent: React.SFC<AdminEventLivePanelProps>
  = ({ loading, ready, eventId }) => {
    const [eventDetail, setEventDetail] = useState<EventLiveDetail>(
      {} as EventLiveDetail);


    const history = useHistory();
    const loadEventDetail = () => {
      GetAdminLiveEventDetail(eventId).then(s => {
        if (s == null) history.push("/app/panel");
        setEventDetail(s);
        ready();
      });
    };
    useEffect(() => {
      loading();
      subscribe<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, (data) => {
        if (+data.eventId === eventId)
          loadEventDetail();
      });
      loadEventDetail();
    }, []);

    const updateEvent = () => {
      loadEventDetail();
      updateEventLive(eventDetail.id);
    }

    return (
      <>
        <TitleHeader title={eventDetail.title}></TitleHeader>
        <div className="col-sm-12">
          <div className="row">
            {!isEmpty(eventDetail) && (
              <>
                <GroupCode updatedEvent={updateEvent} eventLive={eventDetail}></GroupCode>
                <EventLiveTime eventDetail={eventDetail}></EventLiveTime>
                <AttendantCount eventLive={eventDetail}></AttendantCount>
              </>)}

            {!isEmpty(eventDetail) && (
              <>
                <SyncUserToEvent idEvent={eventDetail.id}></SyncUserToEvent>
                <LiveConfigucations updatedEvent={updateEvent} eventLive={eventDetail}></LiveConfigucations>

                <LastUsersAttended
                  members={eventDetail.membersDetails.membersAttended}
                ></LastUsersAttended>
                {eventDetail.generalAttended &&
                  <CardWrapper colSize={4} cardTitle="Datos">
                    <div className="row">
                      <div className="col-sm-12">
                        <h4>Código Asistencia Genenral</h4>
                        <h5>{eventDetail.generalAttendance.generalAttendedCode}</h5>
                      </div>
                    </div>
                  </CardWrapper>
                }
                <div className="col-md-2">
                  <div className="card theme-bg visitor">
                    <div className="card-block text-center">
                      <h5 className="text-white m-0">Asistencia Estimada</h5>
                      <h3 className="text-white m-t-20 f-w-300">{eventDetail.membersDetails.estimatedAttendancePercentage}%</h3>
                      {/* <span className="text-white">20% More than last Month</span> */}
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
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

export const AdminEventLivePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEventLivePanelComponent);
