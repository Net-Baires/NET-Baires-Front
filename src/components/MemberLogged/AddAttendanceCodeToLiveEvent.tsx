import React, { useState, MouseEvent } from "react";
import { CardWrapper } from '../Common/CardWrapper';
import { EventLiveDetail } from '../../services/models/Events/EventLiveDetail';
import { reportAttendanceGeneralByCode } from '../../services/eventsServices';
import CircularProgress from '@material-ui/core/CircularProgress';
import { successToast, errorToast } from '../../services/toastServices';
import { updateEventLive } from '../../services/syncCommunicationServices';


type AddCodeToLiveEventProps = {
  eventLive: EventLiveDetail;
};
export const AddAttendanceCodeToLiveEvent: React.SFC<AddCodeToLiveEventProps> = ({ eventLive }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleReportCode = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    if (code == "")
      return;
    setLoading(true);
    reportAttendanceGeneralByCode(eventLive.id, code)
      .then(() => {
        setLoading(false);
        successToast("Asistencia Reportada.");
        updateEventLive(eventLive.id);
      })
      .catch(e => {
        setLoading(false);
        errorToast("Error al reportar asistencia, verifique los datos.");
      })
  };
  return (
    <>
      {eventLive.generalAttended && !eventLive.attended &&
        <CardWrapper colSize={4} cardTitle="Reportar Asistencia">
          <div className="card-block text-center">
            {!loading ? <>
              <h5>Código de Asistencia</h5>
              <input onChange={e => setCode(e.target.value)} type="text" value={code} className="form-control"></input>
              <div className="designer m-t-30">
                <a
                  onClick={handleReportCode}
                  href="#!"
                  className="btn btn-primary shadow-2 text-uppercase btn-block"
                >
                  Reportar
                  </a>
              </div>
            </> :
              <CircularProgress disableShrink />}
          </div>
        </CardWrapper>
      }
    </>
  );
};
