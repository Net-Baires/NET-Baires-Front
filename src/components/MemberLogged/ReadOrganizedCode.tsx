import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import QrReader from "react-qr-scanner";
import { reportAttendanceGeneral } from "../../services/eventsServices";
import { PageCenterWrapper } from "../Common/PageCenterWrapper";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";

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
      reportAttendanceGeneral(data).then(() => {});
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
    <PageFullWidthWrapper>
      {showReader && (
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
      )}
      {!showReader && <h1>Gracias por venir!!</h1>}
    </PageFullWidthWrapper>
  );
};
