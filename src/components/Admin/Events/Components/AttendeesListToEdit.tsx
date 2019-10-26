import React, { useState, useEffect, MouseEvent } from "react";
import { EventsAttendees } from "../../../../services/models/sponsor";
import { EventDetail } from "../../../../services/models/Events/Event";
import {
  getAttendees,
  updateAttende
} from "../../../../services/attendeesServices";
import { loading, ready } from "../../../../store/loading/actions";
import { connect } from "react-redux";

type AttendeesListToEditProps = {
  eventInEdition: EventDetail;
  loading: () => void;
  ready: () => void;
};

const AttendeesListToEditComponent: React.SFC<AttendeesListToEditProps> = ({
  loading,
  ready,
  eventInEdition
}) => {
  const [eventsAttendees, setEventsAttendees] = useState(
    new Array<EventsAttendees>()
  );

  useEffect(() => {
    loading();
    getAttendees(eventInEdition.id).then(eventsAttendees => {
      setEventsAttendees(eventsAttendees);
    });
    ready();
  }, []);

  const handleUserAttended = (
    eventInput: MouseEvent<HTMLButtonElement>,
    isChecked: boolean,
    member: EventsAttendees
  ) => {
    eventInput.preventDefault();
    const updateIndex = eventsAttendees.indexOf(member);
    const usersToUpdate = eventsAttendees.slice();

    if (isChecked) {
      usersToUpdate[updateIndex].didNotAttend = false;
      usersToUpdate[updateIndex].attended = true;
    } else {
      usersToUpdate[updateIndex].didNotAttend = true;
      usersToUpdate[updateIndex].attended = false;
    }
    updateAttendeLocal(member.id, usersToUpdate[updateIndex], usersToUpdate);
  };
  const handleUserSpeaker = (
    eventInput: MouseEvent<HTMLButtonElement>,
    isChecked: boolean,
    member: EventsAttendees
  ) => {
    eventInput.preventDefault();
    const updateIndex = eventsAttendees.indexOf(member);
    const usersToUpdate = eventsAttendees.slice();
    usersToUpdate[updateIndex].speaker = isChecked;
    updateAttendeLocal(member.id, usersToUpdate[updateIndex], usersToUpdate);
  };
  const handleUserOrganizer = (
    eventInput: MouseEvent<HTMLButtonElement>,
    isChecked: boolean,
    member: EventsAttendees
  ) => {
    eventInput.preventDefault();
    const updateIndex = eventsAttendees.indexOf(member);
    const usersToUpdate = eventsAttendees.slice();
    usersToUpdate[updateIndex].organizer = isChecked;
    updateAttendeLocal(member.id, usersToUpdate[updateIndex], usersToUpdate);
  };

  const updateAttendeLocal = (
    memberId: number,
    attende: EventsAttendees,
    listOfAttendeesToUpdate: EventsAttendees[]
  ) => {
    loading();
    updateAttende(eventInEdition.id, memberId, attende).then(() => {
      ready();
      setEventsAttendees(listOfAttendeesToUpdate);
    });
  };

  return (
    <>
      <h2>Asistentes</h2>
      {eventsAttendees && (
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
              <th scope="col">Imagen</th>
            </tr>
          </thead>
          <tbody>
            {eventsAttendees.map(attende => (
              <tr key={attende.id}>
                <th scope="row">{attende.id}</th>
                <td>{attende.firstName}</td>
                <td>{attende.lastName}</td>
                <td>{attende.email}</td>
                <td className="button-action">
                  {attende.attended ? (
                    <button
                      onClick={e => handleUserAttended(e, false, attende)}
                      type="button"
                      className="btn btn-success"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  ) : (
                    <button
                      onClick={e => handleUserAttended(e, true, attende)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </td>
                <td className="button-action">
                  {attende.speaker ? (
                    <button
                      onClick={e => handleUserSpeaker(e, false, attende)}
                      type="button"
                      className="btn btn-success"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  ) : (
                    <button
                      onClick={e => handleUserSpeaker(e, true, attende)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </td>
                <td className="button-action">
                  {attende.organizer ? (
                    <button
                      onClick={e => handleUserOrganizer(e, false, attende)}
                      type="button"
                      className="btn btn-success"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  ) : (
                    <button
                      onClick={e => handleUserOrganizer(e, true, attende)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </td>

                <td>
                  <img
                    className="img-preview-member"
                    src={attende.picture}
                  ></img>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export const AttendeesListToEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesListToEditComponent);
