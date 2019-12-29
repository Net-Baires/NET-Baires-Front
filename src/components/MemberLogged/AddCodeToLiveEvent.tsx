import React, { useState, MouseEvent } from "react";
import { CardWrapper } from '../Common/CardWrapper';
import { EventLiveDetail } from '../../services/models/Events/EventLiveDetail';
import { reportAttendanceGeneralByCode } from '../../services/eventsServices';
import CircularProgress from '@material-ui/core/CircularProgress';


type AddCodeToLiveEventProps = {
  eventLive: EventLiveDetail;
};
export const AddCodeToLiveEvent: React.SFC<AddCodeToLiveEventProps> = ({ eventLive }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleReportCode = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    reportAttendanceGeneralByCode(eventLive.id, code)
      .then(() => {
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);

      })
  };
  return (
    <>
      {eventLive.generalAttended &&
        <div className="col-xl-4 col-md-6">
          <CardWrapper cardTitle="Reportar Asistencia">
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
        </div>
      }
    </>
  );
};
