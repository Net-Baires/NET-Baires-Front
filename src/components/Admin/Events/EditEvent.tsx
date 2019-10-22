import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getEvent, updateEvent } from "../../../services/eventsServices";
import Checkbox from "react-simple-checkbox";
import { getSponsors } from "../../../services/sponsorsServices";
import { Sponsor } from "services/models/sponsor";
import { User } from "../../../services/models/User";
import { EventDetail } from "../../../services/models/Events/Event";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
type EditEventProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type EditEventParams = {
  id: number;
};

type EditEventPropsAndRouter = EditEventParams & EditEventProps;
const EditEventComponent: React.SFC<
  RouteComponentProps<EditEventPropsAndRouter> & EditEventProps
> = ({ loading, ready, ...props }) => {
  const [event, setEvent] = useState({} as EventDetail);
  const [sponsors, setSponsors] = useState(new Array<SponsorToEvent>());
  const [users, setUsers] = useState(new Array<User>());
  const history = useHistory();
  useEffect(() => {
    loading();
    getEvent(props.match.params.id).then(event => {
      setEvent(event);
      // setUsers(event.attendees);
      ready();
    });
  }, []);
  useEffect(() => {
    getSponsors().then(sponsors => {
      let sponsorToColaborte: SponsorToEvent[] = sponsors.map(
        x => new SponsorToEvent(x)
      );

      setSponsors(sponsorToColaborte);
    });
  }, []);

  const handleOnChangeTitle = (eventInput: ChangeEvent<HTMLInputElement>) => {
    eventInput.preventDefault();
    setEvent({ ...event, title: eventInput.target.value });
  };
  const handleOnChangeImage = (eventInput: ChangeEvent<HTMLInputElement>) => {
    eventInput.preventDefault();
    setEvent({ ...event, imageUrl: eventInput.target.value });
  };
  const handleOnChangeDescription = (
    eventInput: ChangeEvent<HTMLTextAreaElement>
  ) => {
    eventInput.preventDefault();
    setEvent({ ...event, description: eventInput.target.value });
  };
  const handleUserAttended = (isChecked: boolean, user: User) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].attended = isChecked;
    setUsers(usersToUpdate);
  };
  const handleUserSpeaker = (isChecked: boolean, user: User) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].speaker = isChecked;
    setUsers(usersToUpdate);
  };
  const handleUserOrganizer = (isChecked: boolean, user: User) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].organizer = isChecked;
    setUsers(usersToUpdate);
  };
  const handleSave = (evt: MouseEvent<HTMLInputElement>) => {
    evt.preventDefault();
    updateEvent(event.id, event).then(x => {
      ready();
      history.push("/admin/events");
    });
  };
  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-md-offset-3">
          <form className="lgx-contactform">
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
              <label>Imagen</label>
              <input
                className="form-control"
                id="exampleFormControlInput1"
                value={event.imageUrl}
                onChange={handleOnChangeImage}
              ></input>
            </div>
            <div className="form-group">
              <label>Imagen</label>
              <img src={event.imageUrl}></img>
            </div>
            <div className="form-group">
              <label>Example textarea</label>
              <textarea
                onChange={handleOnChangeDescription}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                value={event.description}
              ></textarea>
            </div>
          </form>
        </div>
      </div>

      <>
        <h2>Asistentes</h2>
        {users && (
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Email</th>
                <th scope="col">Asistió</th>
                <th scope="col">Speaker</th>
                <th scope="col">Organizador</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Checkbox
                      checked={user.attended}
                      onChange={(i: boolean) => handleUserAttended(i, user)}
                    ></Checkbox>
                  </td>
                  <td>
                    <Checkbox
                      checked={user.speaker}
                      onChange={(i: boolean) => handleUserSpeaker(i, user)}
                    ></Checkbox>
                  </td>
                  <td>
                    <Checkbox
                      checked={user.organizer}
                      onChange={(i: boolean) => handleUserOrganizer(i, user)}
                    ></Checkbox>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h2>Sponsors</h2>
        {sponsors && (
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Titulo</th>
                <th scope="col">Logo</th>
                <th scope="col">Colaboró con</th>
                <th scope="col">Colaboró</th>
              </tr>
            </thead>
            <tbody>
              {sponsors.map(sponsor => (
                <tr key={sponsor.id}>
                  <th scope="row">{sponsor.id}</th>
                  <td>{sponsor.title}</td>
                  <td>
                    <img
                      className="sponsors-list-img"
                      src={sponsor.picture}
                    ></img>
                  </td>
                  <td>
                    <textarea
                      class="form-control"
                      value={sponsor.description}
                      rows={4}
                    ></textarea>
                  </td>

                  <td>
                    <Checkbox></Checkbox>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={handleSave} type="button" className="btn btn-success">
          Guardar
        </button>
      </>
    </>
  );
};

class SponsorToEvent {
  id: number = 0;
  title: string = "";
  picture: string = "";
  description: string = "";
  colaboratedWith: string = "";
  colaborated: boolean = false;
  constructor(sponsor: Sponsor) {}
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const EditEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEventComponent);
