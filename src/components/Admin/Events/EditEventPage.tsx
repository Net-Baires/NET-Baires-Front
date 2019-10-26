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
    updateEvent(event.id, evt).then(() => {
      ready();
      history.push("/admin/events");
    });
  };
  const handlerReadyAction = () => loadEvent();
  const updateSponsors = (sponsors: SponsorEvent[]) => {
    event.sponsors = sponsors;
    console.log(event);
  };
  return (
    <PageFullWidthWrapper>
      {!isEmpty(event) && (
        <>
          <EditEventComponent
            saveEvent={handleSave}
            event={event}
          ></EditEventComponent>
          {event.sponsors.map(x => {
            <label>{x.detail}</label>;
          })}
          <AttendeesListToEdit eventInEdition={event}></AttendeesListToEdit>
          <SponsorsListToEdit
            updateSponsors={updateSponsors}
            eventInEdition={event}
          ></SponsorsListToEdit>
        </>
      )}

      <EventToSyncActions
        eventAction={event}
        loading={loading}
        ready={handlerReadyAction}
      ></EventToSyncActions>
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
