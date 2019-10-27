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
import { Accordion, Card, Button } from "react-bootstrap";
type EditEventPageProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type EditEventPageParams = {
  id: number;
};

type EditEventPagePropsAndRouter = EditEventPageParams & EditEventPageProps;
const EditEventPageComponent: React.SFC<
  RouteComponentProps<EditEventPagePropsAndRouter> & EditEventPageProps
> = ({ loading, ready, ...props }) => {
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
    console.log(event);
  };
  return (
    <PageFullWidthWrapper>
      {!isEmpty(event) && (
        <>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Editar Evento
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <EditEventComponent
                    saveEvent={handleSave}
                    event={event}
                  ></EditEventComponent>
                  {event.sponsors.map(x => {
                    <label>{x.detail}</label>;
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Editar asistentes al evento
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {!isEmpty(event) && (
                    <AttendeesListToEdit
                      eventInEdition={event}
                    ></AttendeesListToEdit>
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Evitar Sponsors
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <SponsorsListToEdit
                    updateSponsors={updateSponsors}
                    eventInEdition={event}
                  ></SponsorsListToEdit>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </>
      )}
    </PageFullWidthWrapper>
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
