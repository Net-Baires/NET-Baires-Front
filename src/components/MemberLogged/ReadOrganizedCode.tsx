import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import QrReader from "react-qr-reader";
import { reportAttendanceGeneral } from '../../services/eventsServices';
import { CardWrapper } from '../Common/CardWrapper';
import { updateEventLive } from '../../services/syncCommunicationServices';
import { successToast } from '../../services/toastServices';

type ReadOrganizedCodeProps = {
  name: string;
};
type ReadOrganizedCodeParams = {
  id: number;
};
type ReadOrganizedCodePropsAndRouter = ReadOrganizedCodeParams &
  ReadOrganizedCodeProps;
export const ReadOrganizedCode: React.SFC<
  RouteComponentProps<ReadOrganizedCodePropsAndRouter>
> = () => {
  const [showReader, setShowReader] = useState(true);
  const handleScan = (data: string) => {
    if (data) {
      setShowReader(false);
      reportAttendanceGeneral(data).then((x) => {
        updateEventLive(x.eventId)
        successToast("Acaba de ser registrado al evento.")
      });
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };
  return (
    <CardWrapper cardTitle="Leer código de Organizador">
      {showReader && (
        <div className="qr-lector-container">
          <QrReader delay={1000} onError={handleError} onScan={handleScan} />
        </div>
      )}
      {!showReader && <h1>Gracias por venir!!</h1>}
    </CardWrapper>
  );
};
