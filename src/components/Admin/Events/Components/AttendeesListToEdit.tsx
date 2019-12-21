import React, { useState, useEffect, MouseEvent } from "react";
import { EventsAttendees } from "../../../../services/models/EventsAttendees";
import { EventDetail } from "../../../../services/models/Events/Event";
import {
  getAttendees,
  updateAttende
} from "../../../../services/attendeesServices";
import { loading, ready } from "../../../../store/loading/actions";
import { connect } from "react-redux";
import { SearchWrapper } from "../../../Common/SearchWrapper";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
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
  const { SearchBar } = Search;
  const columns = [
    {
      dataField: "id",
      text: "Id"
    },
    {
      dataField: "firstName",
      text: "Nombre"
    },
    {
      dataField: "lastName",
      text: "Apellido"
    },
    {
      dataField: "email",
      text: "Email"
    },
    {
      dataField: "attended",
      text: "Asistió",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, attende: EventsAttendees) => (
        <div className="button-action">
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
        </div>
      )
    },
    {
      dataField: "speaker",
      text: "Speaker",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, attende: EventsAttendees) => (
        <div className="button-action">
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
        </div>
      )
    },
    {
      dataField: "organizer",
      text: "Organizador",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, attende: EventsAttendees) => (
        <div className="button-action">
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
        </div>
      )
    },
    {
      text: "Imagen",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, attende: EventsAttendees) => (
        <img className="img-preview-member" src={attende.picture}></img>
      )
    }
  ];

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
        <SearchWrapper title="Usuarios">
          <ToolkitProvider
            keyField="id"
            data={eventsAttendees}
            columns={columns}
            search
          >
            {(props: any) => (
              <div>
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable
                  keyField="id"
                  {...props.baseProps}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </SearchWrapper>
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
