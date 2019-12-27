import React, { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getEvent, updateEvent } from "../../../services/eventsServices";
import {
  EventDetail,
  SponsorEvent
} from "../../../services/models/Events/Event";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { EventToSyncActions } from "./EventToSyncActions";
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";
import { isEmpty } from "../../../services/objectsservices";
import { EditEventComponent } from "./Components/EditEventComponent";
import { AttendeesListToEdit } from "./Components/AttendeesListToEdit";
import { SponsorsListToEdit } from "./Components/SponsorsListToEdit";
type EditEventPageProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type EditEventPageParams = {
  id: number;
};

type EditEventPagePropsAndRouter = EditEventPageParams & EditEventPageProps;
const EditEventPageComponent: React.SFC<RouteComponentProps<
  EditEventPagePropsAndRouter
> &
  EditEventPageProps> = ({ loading, ready, ...props }) => {
  const [event, setEvent] = useState({} as EventDetail);

  const history = useHistory();
  const loadEvent = () => {
    loading();
    getEvent(props.match.params.id).then(event => {
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
  const handlerReadyAction = () => loadEvent();
  const updateSponsors = (sponsors: SponsorEvent[]) => {
    event.sponsors = sponsors;
    setEvent(event);
    handleSave(event);
  };
  return (
    <>
      {!isEmpty(event) && (
        <>
          <div className="col-sm-12">
            <h5 className="mt-4">Editar Evento</h5>
            <hr></hr>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link"
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
                  className="nav-link show"
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
                  className="nav-link active show"
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
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade"
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
                className="tab-pane fade active show"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <SponsorsListToEdit
                  updateSponsors={updateSponsors}
                  eventInEdition={event}
                ></SponsorsListToEdit>
              </div>
            </div>
          </div>
          {/* <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Editar Evento
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body> */}

          {/* {event.sponsors.map(x => {
            <label>{x.detail}</label>;
          })} */}
          {/* </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Editar asistentes al evento
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body> */}

          {/* </Card.Body>
              </Accordion.Collapse>
            </Card> */}
          {/* <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Evitar Sponsors
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body> */}

          {/* </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion> */}
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
  }
});

export const EditEventPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventPageComponent);
