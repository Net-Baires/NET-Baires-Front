import React, { SyntheticEvent, useState } from "react";
import { loading, ready } from "../../../../store/loading/actions";
import { connect } from "react-redux";
import { updateEvent } from "../../../../services/eventsServices";
import { CardWrapper } from "../../../Common/CardWrapper";
import { FormControlLabel, Switch } from "@material-ui/core";
type LiveEndEventOptionsProps = {
  eventId: number;
  closeEvent?: () => void;
  loading: () => void;
  ready: () => void;
};

const LiveEndEventOptionsComponent: React.SFC<LiveEndEventOptionsProps> = ({
  loading,
  ready,
  eventId,
  closeEvent,
}) => {
  const [options, setOptions] = useState({
    thanksSponsors: true,
    thanksSpeakers: true,
    thanksAttendees: true,
    sendMaterialToAttendees: true,
  });
  const handleGeneralAttended = (
    event: SyntheticEvent<HTMLButtonElement>,
    enable: boolean
  ) => {
    event.preventDefault();
    loading();
    updateEvent(eventId, { generalAttended: enable, live: true }).then(() => {
      ready();
      if (closeEvent != null) closeEvent();
    });
  };
  closeEvent;
  return (
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
            <label className="col-md-6 col-form-label">Entregar Material</label>
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
              onClick={(e) => handleGeneralAttended(e, false)}
              data-toggle="tooltip"
              data-original-title="btn btn-danger"
            >
              Terminar Evento
            </button>
          </div>
        </form>
      </div>
    </CardWrapper>
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
