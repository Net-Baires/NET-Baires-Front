import React, { SyntheticEvent, useState } from "react";
import { loading, ready } from "../../../../store/loading/actions";
import { connect } from "react-redux";
import {
  updateEvent,
  completeEvent,
} from "../../../../services/eventsServices";
import { CardWrapper } from "../../../Common/CardWrapper";
import { FormControlLabel, Switch } from "@material-ui/core";
import { DialogQuestion } from "../../../Common/DialogQuestion";
import { CompleteEventRequest } from "../../../../services/models/Member";
type LiveEndEventOptionsProps = {
  eventId: number;
  completeEvent?: () => void;
  loading: () => void;
  ready: () => void;
};

const LiveEndEventOptionsComponent: React.SFC<LiveEndEventOptionsProps> = ({
  loading,
  ready,
  eventId,
  completeEvent: completeEventCallback,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [options, setOptions] = useState<CompleteEventRequest>({
    thanksSponsors: true,
    thanksSpeakers: true,
    thanksAttendees: true,
    sendMaterialToAttendees: true,
  } as CompleteEventRequest);
  const handleCloseEvent = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpenDialog(true);
  };
  const completeEventHandler = () => {
    loading();
    completeEvent(eventId, options).then(() => {
      ready();
      if (completeEventCallback != null) completeEventCallback();
    });
  };
  return (
    <>
      <DialogQuestion
        title="Esta por cerrar el concurso"
        description={`Una vez que finalice el concurso, se enviaran todas las notificaciones que estan marcada. ¿Desee continuar?`}
        openPopup={openDialog}
        callbackClose={() => setOpenDialog(false)}
        callbackAccept={completeEventHandler}
      ></DialogQuestion>
      <CardWrapper colSize={3} cardTitle="Terminar Evento">
        <div className="col-md-12">
          <form>
            <div className="form-group row">
              <label className="col-md-6 col-form-label">
                Agradecer Sponsors
              </label>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Switch
                      checked={options.thanksSponsors}
                      onChange={() =>
                        setOptions({
                          ...options,
                          thanksSponsors: !options.thanksSponsors,
                        })
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-6 col-form-label">
                Agradecer Speakers
              </label>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Switch
                      checked={options.thanksSpeakers}
                      onChange={() =>
                        setOptions({
                          ...options,
                          thanksSpeakers: !options.thanksSpeakers,
                        })
                      }
                    />
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-6 col-form-label">
                Agradecer participación
              </label>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Switch
                      checked={options.thanksAttendees}
                      onChange={() =>
                        setOptions({
                          ...options,
                          thanksAttendees: !options.thanksAttendees,
                        })
                      }
                    />
                  }
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-6 col-form-label">
                Entregar Material
              </label>
              <div className="col-md-6">
                <FormControlLabel
                  control={
                    <Switch
                      checked={options.sendMaterialToAttendees}
                      onChange={() =>
                        setOptions({
                          ...options,
                          sendMaterialToAttendees: !options.sendMaterialToAttendees,
                        })
                      }
                    />
                  }
                />
              </div>
            </div>
            <br></br>
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-danger form-control"
                onClick={(e) => handleCloseEvent(e, false)}
                data-toggle="tooltip"
                data-original-title="btn btn-danger"
              >
                Terminar Evento
              </button>
            </div>
          </form>
        </div>
      </CardWrapper>
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
  },
});

export const LiveEndEventOptions = connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveEndEventOptionsComponent);
