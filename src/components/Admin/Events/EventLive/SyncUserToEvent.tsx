import React, { useState, SyntheticEvent } from "react";
import { Member } from "../../../../services/models/Member";
import Autosuggest from "react-autosuggest";
import { getMemberByQuery } from "../../../../services/membersServices";
import {
  updateAttende,
  getAttendeeDetail
} from "../../../../services/attendeesServices";
import { isEmpty } from "../../../../services/objectsservices";
import { EventsAttendees } from "../../../../services/models/EventsAttendees";
import { updateEventLive, memberNotification } from '../../../../services/syncCommunicationServices';

type NewUserProps = {
  idEvent: number;
  callbackAction?: () => void;
};
export const SyncUserToEvent: React.SFC<NewUserProps> = ({ idEvent, callbackAction }) => {
  const [readySearch, setReadySearch] = useState(false);
  const [memberToSearch, setMemberToSearch] = useState({} as Member);
  const [attendeeDetail, setAttendeeDetail] = useState({} as EventsAttendees);
  const [suggestions, setSuggestions] = useState({});
  const [value, setValue] = useState("");
  const handleSearch = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (!isEmpty(memberToSearch)) {
      getAttendeeDetail(idEvent, memberToSearch.id).then(detail => {
        if (detail == null)
          setAttendeeDetail(detail);
        else setAttendeeDetail(detail);
        setReadySearch(true);
      });
    }
  };

  const handleClickOnAttendedButton = (
    event: SyntheticEvent<HTMLAnchorElement>,
    eventAttendee: EventsAttendees
  ) => {
    event.preventDefault();
    updateAttende(idEvent, memberToSearch.id, eventAttendee).then(() => {
      setReadySearch(false);
      setValue("");
      updateEventLive(idEvent);
      if (eventAttendee.attended)
        memberNotification(memberToSearch.id, "Acaba de ser marcado como presente en un evento");
      if (callbackAction != null)
        callbackAction();
    });
  };
  const handleClose = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    searchScreen();
  };
  const searchScreen = () => {
    setReadySearch(false);
    setValue("");
  };
  const getSuggestionValue = (suggestion: Member) => suggestion.firstName;
  const renderSuggestion = (suggestion: Member) => {
    return <div className="row">
      <div className="col-md-3">
        <img className="img-suggestion-member" src={suggestion.picture}></img>
      </div>
      <div className="col-md-9">
        {suggestion.firstName} {suggestion.lastName}
      </div>
    </div>;
  };
  const onChange = (event: any, { newValue }: any) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    if (value != null && value.length > 3)
      getMemberByQuery(value).then(v => {
        setSuggestions(v);
      });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const renderInputComponent = (inputProps: any) => (
    <div>
      <input className="form-control" {...inputProps} />
    </div>
  );
  const onSuggestionSelected = (event: any, { suggestion }: any) => {
    setMemberToSearch(suggestion);
  };
  const inputProps = {
    placeholder: "Type a programming language",
    value,
    onChange: onChange
  };
  return (
    <>
      <div className="col-xl-3 col-md-3">
        <div className="card user-designer card-container">
          {readySearch ? (
            <div className="card-block text-center">
              <h5>{attendeeDetail.memberDetail.firstName}</h5>
              {/* <span className="d-block mb-4">{attendeeDetail.memberDetail.}</span> */}
              <img
                className="img-fluid rounded-circle rounded-circle-sync-user-to-event"
                style={{ width: "150px", height: "150px" }}
                src={
                  attendeeDetail.memberDetail.picture != "" && attendeeDetail.memberDetail.picture != null
                    ? attendeeDetail.memberDetail.picture
                    : "assets/images/no-image-profile.png"
                }
                alt="dashboard-user"
              ></img>
              <hr></hr>
              <h6 className=" m-b-0">{`${attendeeDetail.averageAttendance}%`}</h6>
              <div className="progress m-t-10" style={{ height: "7px;" }}>
                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: `${attendeeDetail.averageAttendance}%` }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div className="row m-t-30">
                <div className="col-md-6 p-r-0">
                  {attendeeDetail.attended == null ? (
                    <a
                      onClick={e =>
                        handleClickOnAttendedButton(e, { attended: true })
                      }
                      data-tip="Asistio"
                      href="#!"
                      className="btn btn-success shadow-2 text-uppercase btn-block"
                    >
                      {/* <i className="feather icon-check-square"></i> */}
                      Participar
                    </a>
                  ) : !attendeeDetail.attended ? (
                    <a
                      onClick={e =>
                        handleClickOnAttendedButton(e, { attended: true })
                      }
                      data-tip="Asistio"
                      href="#!"
                      className="btn btn-success shadow-2 text-uppercase btn-block"
                    >
                      {/* <i className="feather icon-check-square"></i> */}
                      Presente
                    </a>
                  ) : (
                        <a
                          onClick={e =>
                            handleClickOnAttendedButton(e, { attended: false })
                          }
                          data-tip="Asistio"
                          href="#!"
                          className="btn btn-danger shadow-2 text-uppercase btn-block"
                        >
                          {/* <i className="feather icon-check-square"></i> */}
                          Ausente
                    </a>
                      )}
                </div>

                <div className="col-md-6 p-r">
                  <a
                    onClick={handleClose}
                    href="#!"
                    className="btn btn-info shadow-2 text-uppercase btn-block"
                  >
                    {/* <i className="feather icon-x-circle"></i> */}
                    Buscar
                  </a>
                </div>
              </div>
            </div>
          ) : (
              <>
                <div className="card-block text-center">
                  <h5>Buscar Miembro</h5>
                  <Autosuggest
                    onSuggestionSelected={onSuggestionSelected}
                    renderInputComponent={renderInputComponent}
                    suggestions={suggestions}
                    className="aaa"
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                  />
                  <div className="designer m-t-30">
                    <a
                      onClick={handleSearch}
                      href="#!"
                      className="btn btn-primary shadow-2 text-uppercase btn-block"
                    >
                      Buscar
                  </a>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
};
