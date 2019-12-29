import React, { useState, useEffect, SyntheticEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loading, ready } from "../../../../store/loading/actions";
import {
  GetAdminLiveEventDetail,
  updateEvent
} from "../../../../services/eventsServices";
import { EventLiveDetail } from "../../../../services/models/Events/EventLiveDetail";
import { LastUsersAttended } from "../../../EventLive/LastUsersAttended";
import { isEmpty } from "../../../../services/objectsservices";
import { SyncUserToEvent } from "./SyncUserToEvent";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { EventLiveTime } from '../../../EventLive/EventLiveTme';
import { CardWrapper } from '../../../Common/CardWrapper';
import { sendMessage, CommunicationMessageType, subscribe, UpdateEventLive } from '../../../../services/communicationServices';
type AdminEventLivePanelProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type AdminEventLivePanelParams = {
  id: string;
};

type AdminEventLivePanelPropsAndRouter = AdminEventLivePanelParams &
  AdminEventLivePanelProps;
const AdminEventLivePanelComponent: React.SFC<RouteComponentProps<
  AdminEventLivePanelPropsAndRouter
> &
  AdminEventLivePanelProps> = ({ loading, ready, ...props }) => {
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
    const handleGeneralAttended = (
      event: SyntheticEvent<HTMLButtonElement>,
      enable: boolean
    ) => {
      event.preventDefault();
      loading();
      updateEvent(eventDetail.id, { generalAttended: enable, live: true }).then(
        x => {
          loadEventDetail();
          sendMessage<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, { eventId: eventDetail.id });
        }
      );
    };


    return (
      <>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>{eventDetail.title}</h5>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="row">
            {!isEmpty(eventDetail) && (
              <EventLiveTime eventDetail={eventDetail}></EventLiveTime>
            )}
            <div className="col-md-6 col-xl-4">
              <div className="card Active-visitor">
                <div className="card-block text-center">
                  <h5 className="mb-4">Asistentes</h5>
                  <i className="fas fa-user-friends f-30 text-c-green"></i>
                  <h2 className="f-w-300 mt-3">
                    {!isEmpty(eventDetail) &&
                      eventDetail.membersDetails.totalMembersRegistered}
                  </h2>
                  <span className="text-muted">Total Usuario Registrados</span>
                  <div className="progress mt-4 m-b-40">
                    {!isEmpty(eventDetail) && (
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{
                          width: `${(eventDetail.membersDetails
                            .totalMembersAttended *
                            100) /
                            eventDetail.membersDetails.totalMembersRegistered}%`,
                          height: "7px;"
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="row card-active">
                    <div className="col-md-6 col-6">
                      <h4>
                        {!isEmpty(eventDetail) &&
                          eventDetail.membersDetails.totalMembersAttended}
                      </h4>
                      <span className="text-muted">Presentes</span>
                    </div>
                    <div className="col-md-6 col-6">
                      <h4>
                        {!isEmpty(eventDetail) &&
                          eventDetail.membersDetails.totalMembersRegistered -
                          eventDetail.membersDetails.totalMembersAttended}
                      </h4>
                      <span className="text-muted">Ausentes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!isEmpty(eventDetail) && (
              <>
                <SyncUserToEvent idEvent={eventDetail.id}></SyncUserToEvent>
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
              </>
            )}
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Configuraciones evento en Vivo</h5>
                </div>
                <div className="card-body">
                  {/* <h5>Form controls</h5> */}
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="form-group row">
                          <label
                            className="col-sm-3 col-form-label"
                          >
                            Asistencia General
                        </label>
                          <div className="col-sm-2">
                            {eventDetail.generalAttended ? (
                              <button
                                type="button"
                                className="btn btn-danger form-control"
                                onClick={e => handleGeneralAttended(e, false)}
                                data-toggle="tooltip"
                                data-original-title="btn btn-danger"
                              >
                                Desactivar
                            </button>
                            ) : (
                                <button
                                  type="button"
                                  className="btn btn-success form-control"
                                  onClick={e => handleGeneralAttended(e, true)}
                                  data-toggle="tooltip"
                                  data-original-title="btn btn-danger"
                                >
                                  Activar
                            </button>
                              )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
