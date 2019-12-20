import React, { useState, MouseEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import QrReader from "react-qr-reader";
import { reportAttendance } from "../../../services/eventsServices";
import { PageCenterWrapper } from "../../Common/PageCenterWrapper";
import { useToasts } from "react-toast-notifications";
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";

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
        .then(() => {
          const emailOfUser = data.split("|");
          var newArry = [...attended, emailOfUser[0]];
          setAttended(newArry);
          localStorage.setItem("attendedList", JSON.stringify(newArry));
          removeToast(toastStack);
          addToast("Asistencia Reportada", {
            appearance: "success",
            placement: "bottom-right",
            autoDismissTimeout: 100
          });
        })
        .catch(x =>
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
        <div className="qr-lector-container">
          <QrReader delay={2000} onError={handleError} onScan={handleScan} />
        </div>
      )}
    </>
  );
};
