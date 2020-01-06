import React, { SyntheticEvent } from "react";
import { loading, ready } from "../../../../store/loading/actions";
import { connect } from "react-redux";
import { updateEvent } from '../../../../services/eventsServices';
import { EventLiveDetail } from '../../../../services/models/Events/EventLiveDetail';
import { CardWrapper } from '../../../Common/CardWrapper';
type LiveConfigucationsProps = {
  eventLive: EventLiveDetail;
  updatedEvent: () => void;
  loading: () => void;
  ready: () => void;
};

const LiveConfigucationsComponent: React.SFC<LiveConfigucationsProps> = ({ loading, ready, eventLive, updatedEvent }) => {
  const handleGeneralAttended = (
    event: SyntheticEvent<HTMLButtonElement>,
    enable: boolean
  ) => {
    event.preventDefault();
    loading();
    updateEvent(eventLive.id, { generalAttended: enable, live: true }).then(
      () => {
        ready();
        updatedEvent();
      }
    );
  };
  return (

    <CardWrapper colSize={3} cardTitle="Configuraciones evento en Vivo">

      <div className="col-md-12">
        <form>
          <div className="form-group row">
            <div className="col-md-12">
              {eventLive.generalAttended ? (
                <button
                  type="button"
                  className="btn btn-danger form-control"
                  onClick={e => handleGeneralAttended(e, false)}
                  data-toggle="tooltip"
                  data-original-title="btn btn-danger"
                >
                  Asistencia General
                </button>
              ) : (
                  <button
                    type="button"
                    className="btn btn-success form-control"
                    onClick={e => handleGeneralAttended(e, true)}
                    data-toggle="tooltip"
                    data-original-title="btn btn-danger"
                  >
                    Asistencia General
                </button>
                )}
            </div>
          </div>
          {eventLive.generalAttended &&
            <div className="form-group row">
              <div className="col-md-12">
                <button
                  type="button"
                  className="btn btn-success form-control"
                  onClick={e => window.open(`/admin/events/${eventLive.id}/attendances/general`, '_blank')}
                  data-toggle="tooltip"
                  data-original-title="btn btn-danger"
                >
                  Abrir Codigo QR
                </button>
              </div>
            </div>
          }
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
  }
});

export const LiveConfigucations = connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveConfigucationsComponent);
