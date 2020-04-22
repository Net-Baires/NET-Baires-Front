import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../../../services/eventsServices";
import {
  EventDetail,
  SponsorEvent,
} from "../../../services/models/Events/Event";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { isEmpty } from "../../../services/objectsservices";
import { EditEventComponent } from "./Components/EditEventComponent";
import { AttendeesListToEdit } from "./Components/AttendeesListToEdit";
import { SponsorsListToEdit } from "./Components/SponsorsListToEdit";
import { EventToSyncActions } from "./EventToSyncActions";
import { InformationHeader } from "../../Common/InformationHeader";
import { LiveEndEventOptions } from "./Components/LiveEndEventOptions";
import { AdminMaterials } from "../components/adminMaterials";
type EditEventPageProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type EditEventPageParams = {
  id: number;
};

type EditEventPagePropsAndRouter = EditEventPageParams & EditEventPageProps;
const EditEventPageComponent: React.SFC<EditEventPagePropsAndRouter> = ({
  loading,
  ready,
}) => {
  const { id } = useParams();
  const handlerReadyAction = () => {
    ready();
  };

  const [event, setEvent] = useState({} as EventDetail);
  const loadEvent = () => {
    loading();
    getEvent(+id!).then((event) => {
      setEvent(event);
      ready();
    });
  };
  useEffect(() => loadEvent(), []);

  const handleSave = (evt: EventDetail) => {
    loading();
    evt.sponsors = event.sponsors;
    updateEvent(event.id, evt).then(() => {
      ready();
    });
  };
  const updateSponsors = (sponsors: SponsorEvent[]) => {
    event.sponsors = sponsors;
    setEvent(event);
    handleSave(event);
  };
  return (
    <>
      {!isEmpty(event) && (
        <>
          <InformationHeader text="Editar Evento"></InformationHeader>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>{event.title}</h5>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="false"
                >
                  Detalle
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link "
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Asistentes
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="true"
                >
                  Sponsors
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-material-tab"
                  data-toggle="pill"
                  href="#pills-material"
                  role="tab"
                  aria-controls="pills-material"
                  aria-selected="true"
                >
                  Material
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="pills-actions-tab"
                  data-toggle="pill"
                  href="#pills-actions"
                  role="tab"
                  aria-controls="pills-actions"
                  aria-selected="true"
                >
                  Acciones
                </a>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade  active show"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <EditEventComponent
                  saveEvent={handleSave}
                  event={event}
                ></EditEventComponent>
              </div>
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                {!isEmpty(event) && (
                  <AttendeesListToEdit
                    eventInEdition={event}
                  ></AttendeesListToEdit>
                )}
              </div>
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <SponsorsListToEdit
                  updateSponsors={updateSponsors}
                  eventInEdition={event}
                ></SponsorsListToEdit>
              </div>
              <div
                className="tab-pane fade"
                id="pills-material"
                role="tabpanel"
                aria-labelledby="pills-material-tab"
              >
                {!isEmpty(event) && (
                  <AdminMaterials eventId={event.id}></AdminMaterials>
                )}
              </div>
              <div
                className="tab-pane fade"
                id="pills-actions"
                role="tabpanel"
                aria-labelledby="pills-actions-tab"
              >
                <EventToSyncActions
                  eventAction={event}
                  loading={loading}
                  ready={handlerReadyAction}
                ></EventToSyncActions>
              </div>
            </div>
          </div>
        </>
      )}
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

export const EditEventPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventPageComponent);
