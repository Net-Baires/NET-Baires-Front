import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import QrReader from "react-qr-reader";
import { reportAttendance } from "../../../services/eventsServices";
import { useToasts } from "react-toast-notifications";
import { successToast } from '../../../services/toastServices';
import { sendMessage, UpdateEventLive, CommunicationMessageType, sendMessageGeneral, MemberDirectMessage } from '../../../services/communicationServices';
import { CardWrapper } from '../../Common/CardWrapper';

type EventLiveAttendancesProps = {
  name: string;
};
type EventLiveAttendancesParams = {
  id: number;
};
type EventLiveAttendancesPropsAndRouter = EventLiveAttendancesParams &
  EventLiveAttendancesProps;
export const EventLiveAttendances: React.SFC<
  RouteComponentProps<EventLiveAttendancesPropsAndRouter>
> = () => {
  const [attended, setAttended] = useState(new Array<string>());
  const [showReader, setShowReader] = useState(true);
  const { addToast, removeToast, toastStack } = useToasts();
  const handleScan = (data: string) => {
    if (data) {
      setShowReader(false);
      setTimeout(() => {
        setShowReader(true);
      }, 3000);
      reportAttendance(data)
        .then((e) => {
          const emailOfUser = data.split("|");
          var newArry = [...attended, emailOfUser[0]];
          setAttended(newArry);
          localStorage.setItem("attendedList", JSON.stringify(newArry));
          removeToast(toastStack);
          successToast("Asistencia Reportada");
          sendMessage<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, { eventId: e.eventId });
          sendMessageGeneral<MemberDirectMessage>(`${CommunicationMessageType.MemberDirectMessage}-${e.memberId}`, { notificationMessage: "Acaba de ser marcado como presente un evento" });
        })
        .catch(() =>
          addToast("Error al reportar el token", {
            appearance: "error",
            transitionState: 100
          })
        );
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };
  return (
    <>
      {showReader && (
        <CardWrapper cardTitle="Reportar Asistencia">
          <div className="qr-lector-container">
            <QrReader delay={2000} onError={handleError} onScan={handleScan} />
          </div>
        </CardWrapper>
      )}
    </>
  );
};
