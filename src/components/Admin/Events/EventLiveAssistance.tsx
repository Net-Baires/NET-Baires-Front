import React, { useState, MouseEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import QrReader from "react-qr-scanner";
import { reportAssitance } from "../../../services/eventsServices";
import { PageCenterWrapper } from "../../Common/PageCenterWrapper";

type EventLiveAssistanceProps = {
  name: string;
};
type EventLiveAssistanceParams = {
  id: number;
};
type EventLiveAssistancePropsAndRouter = EventLiveAssistanceParams &
  EventLiveAssistanceProps;
export const EventLiveAssistance: React.SFC<
  RouteComponentProps<EventLiveAssistancePropsAndRouter>
> = () => {
  const [attended, setAttended] = useState(new Array<string>());
  const [showReader, setShowReader] = useState(true);
  const handleScan = (data: string) => {
    if (data) {
      setShowReader(false);
      reportAssitance(data).then(() => {
        setShowReader(true);
        const emailOfUser = data.split("|");
        var newArry = [...attended, emailOfUser[0]];
        setAttended(newArry);
        localStorage.setItem("attendedList", JSON.stringify(newArry));
      });
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };
  const previewStyle = {
    height: 400,
    width: 400
  };
  return (
    <PageCenterWrapper>
      <div className="card border-primary mb-3 qr-panel">
        <div className="card-header">Lector</div>
        <div className="card-body">
          {showReader && (
            <QrReader
              delay={100}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
            />
          )}
        </div>
      </div>
    </PageCenterWrapper>
  );
};
