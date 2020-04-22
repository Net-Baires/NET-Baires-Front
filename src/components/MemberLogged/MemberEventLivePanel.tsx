import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { getLiveEventDetail } from "../../services/eventsServices";
import { EventLiveDetail } from "../../services/models/Events/EventLiveDetail";
import { isEmpty } from "../../services/objectsservices";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { EventLiveTime } from "../EventLive/EventLiveTme";
import { AddAttendanceCodeToLiveEvent } from "./AddAttendanceCodeToLiveEvent";
import { CardWrapper } from "../Common/CardWrapper";
import { QRCode } from "react-qr-svg";
import { TitleHeader } from "../Common/TitleHeader";
import {
  subscribeUpdateEventLive,
  subscribeUpdateEventInformationSync,
} from "../../services/syncCommunicationServices";
import { AddGroupCodeToLiveEvent } from "./AddGroupCodeToLiveEvent";
import { EventInformationListMember } from "./EventInformationListMember";
type MemberEventLivePanelProps = {
  eventId: number;
  loading: () => void;
  ready: () => void;
};

const MemberEventLivePanelComponent: React.SFC<MemberEventLivePanelProps> = ({
  loading,
  ready,
  eventId,
}) => {
  const [eventLive, setEventLive] = useState<EventLiveDetail>(
    {} as EventLiveDetail
  );

  const history = useHistory();
  const loadEventDetail = () => {
    loading();
    getLiveEventDetail(eventId).then((s) => {
      if (s == null) history.push("/app/panel");
      setEventLive(s);
      ready();
    });
  };
  const loadEventInformation = () => {};
  useEffect(() => {
    subscribeUpdateEventLive((data) => {
      if (+data.eventId === eventId) {
        loadEventDetail();
      }
    });

    loadEventDetail();
  }, []);
  const handleReadCode = () => {
    history.push("/app/organizedcode/read");
  };

  return (
    <div className="row">
      <TitleHeader title={eventLive.title}></TitleHeader>
      <div className="col-md-2 col-xl-2">
        <div className="card theme-bg2">
          <div className="card-block customer-visitor">
            <h2 className="text-white text-right mt-2 f-w-300">Estado</h2>
            <span className="text-white text-right d-block">
              {eventLive.attended ? "Presente" : "Ausente"}
            </span>
            <i className="fas fa-globe text-white"></i>
          </div>
        </div>
      </div>
      {!isEmpty(eventLive) && (
        <>
          <EventLiveTime eventDetail={eventLive}></EventLiveTime>
          {!eventLive.attended && (
            <CardWrapper colSize={4} cardTitle="Reportar mi asistencia">
              <div style={{ textAlign: "center" }}>
                <QRCode
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="Q"
                  style={{ width: 256 }}
                  value={eventLive.tokenToReportMyAttendance}
                />
              </div>
            </CardWrapper>
          )}
          <EventInformationListMember
            eventId={eventLive.id}
          ></EventInformationListMember>
          {eventLive.hasGroupCodeOpen && (
            <AddGroupCodeToLiveEvent
              eventLive={eventLive}
            ></AddGroupCodeToLiveEvent>
          )}
          {eventLive.generalAttended && !eventLive.attended && (
            <>
              <TitleHeader title="Reportar asistencia general"></TitleHeader>
              <AddAttendanceCodeToLiveEvent
                eventLive={eventLive}
              ></AddAttendanceCodeToLiveEvent>
              <CardWrapper colSize={3} cardTitle="Acciones Generales">
                <button
                  onClick={handleReadCode}
                  className="btn btn-warning shadow-2 text-uppercase btn-block"
                >
                  Leer Código de Organizador
                </button>
              </CardWrapper>
            </>
          )}
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
  },
});

export const MemberEventLivePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberEventLivePanelComponent);
