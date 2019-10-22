import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getEventToSync } from "../../../services/eventsServices";
import { UserDetailToSync } from "../../../services/models/UserDetailToSync";
import { connect } from "react-redux";
import { ready, loading } from "../../../store/loading/actions";
import { getSponsors } from "../../../services/sponsorsServices";
import { Sponsor } from "../../../services/models/sponsor";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { SelectSponsor } from "../components/SelectSponsor";
import { hasAny } from "../../../services/objectsservices";
import { SelectUsersAttended } from "../components/SelectUser";
type SyncEventProps = {
  loading: () => void;
  ready: () => void;
};
type SyncEventParams = {
  id: string;
  platform: string;
};

type SyncEventPropsAndRouter = SyncEventParams & SyncEventProps;
const SyncEventComponent: React.SFC<
  RouteComponentProps<SyncEventPropsAndRouter> & SyncEventProps
> = props => {
  const [event, setEvent] = useState({
    title: "",
    platform: "",
    description: ""
  });
  const [users, setUsers] = useState(new Array<UserDetailToSync>());
  const [sponsors, setSponsors] = useState(new Array<Sponsor>());
  useEffect(() => {
    props.loading();
    getEventToSync(props.match.params.id, props.match.params.platform).then(
      event => {
        setEvent(event);
        setUsers(event.attendees);
        props.ready();
      }
    );
  }, []);
  useEffect(() => {
    getSponsors().then(sponsors => {
      setSponsors(sponsors);
    });
  }, []);
  const handleOnChangeTitle = (eventInput: ChangeEvent<HTMLInputElement>) => {
    eventInput.preventDefault();
    setEvent({ ...event, title: eventInput.target.value });
  };
  const handleOnChangeDescription = (
    eventInput: ChangeEvent<HTMLTextAreaElement>
  ) => {
    eventInput.preventDefault();
    setEvent({ ...event, description: eventInput.target.value });
  };
  const selectSponsor = (ids: number[]) => {
    console.log(ids);
  };
  const selectAttended = (ids: number[]) => {
    console.log(ids);
  };
  return (
    <>
      <form>
        <div className="form-group">
          <label>Titutlo De Evento</label>
          <input
            onChange={handleOnChangeTitle}
            className="form-control"
            id="exampleFormControlInput1"
            value={event.title}
          ></input>
        </div>
        <div className="form-group">
          <label>Plataforma</label>
          <input
            disabled
            className="form-control"
            id="exampleFormControlInput1"
            value={event.platform}
          ></input>
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            onChange={handleOnChangeDescription}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            value={event.description}
          ></textarea>
        </div>
      </form>
      <>
        {hasAny(users) && (
          <SelectUsersAttended
            users={users}
            selectAttended={selectAttended}
          ></SelectUsersAttended>
        )}

        {hasAny(sponsors) && (
          <SelectSponsor
            selectSponsor={selectSponsor}
            sponsors={sponsors}
          ></SelectSponsor>
        )}
        <button type="button" className="btn btn-success">
          Sincronizar
        </button>
      </>
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

export const SyncEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SyncEventComponent);
