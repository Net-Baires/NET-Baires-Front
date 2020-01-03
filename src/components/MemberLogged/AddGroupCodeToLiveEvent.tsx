import React, { useState, MouseEvent } from "react";
import { CardWrapper } from '../Common/CardWrapper';
import { EventLiveDetail } from '../../services/models/Events/EventLiveDetail';
import { addCodeToGroupCode } from '../../services/eventsServices';
import CircularProgress from '@material-ui/core/CircularProgress';
import { successToast, errorToast } from '../../services/toastServices';
import { updateEventLive } from '../../services/syncCommunicationServices';


type AddGroupCodeToLiveEventProps = {
  eventLive: EventLiveDetail;
};
export const AddGroupCodeToLiveEvent: React.SFC<AddGroupCodeToLiveEventProps> = ({ eventLive }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleReportCode = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    if (code == "")
      return;
    setLoading(true);
    addCodeToGroupCode(eventLive.id, code)
      .then(x => {
        setLoading(false);
        successToast(`Código Reportado a : ${x.detail}`);
        updateEventLive(eventLive.id);
        setCode("");
      })
      .catch(e => {
        setLoading(false);
        errorToast("Error al reportar el código, verifique el código ingresado");
        setCode("");
      })
  };
  return (
    <>
      <CardWrapper colSize={3} cardTitle="Reportar Código de Grupo">
        <div className="card-block text-center">
          {!loading ? <>
            <h5>Cargar Código</h5>
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
    </>
  );
};
