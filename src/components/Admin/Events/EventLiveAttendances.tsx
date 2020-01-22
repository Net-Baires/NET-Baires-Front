import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import QrReader from "react-qr-reader";
import { reportAttendance } from "../../../services/eventsServices";
import { successToast, errorToast } from '../../../services/toastServices';
import { CardWrapper } from '../../Common/CardWrapper';
import { updateEventLive, memberNotification } from '../../../services/syncCommunicationServices';

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

          successToast("Asistencia Reportada");

          updateEventLive(e.eventId);
          memberNotification(e.memberId, "Acaba de ser marcado como presente en un evento");
        })
        .catch(() =>
          errorToast("Error al reportar el token")
        );
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };
  return (
    <>
      {showReader && (
        <QrReader delay={2000} onError={handleError} onScan={handleScan} />
      )}
    </>
  );
};
