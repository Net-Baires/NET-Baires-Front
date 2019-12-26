import React, { useState, SyntheticEvent } from "react";
import { Member } from "../../../services/models/Member";
import Autosuggest from "react-autosuggest";
import { getMemberByQuery } from "../../../services/membersServices";
import { updateAttende } from "../../../services/attendeesServices";
import { EventsAttendees } from "../../../services/models/EventsAttendees";
type NewUserProps = {
  idEvent: number;
};
export const AddUserToEvent: React.SFC<NewUserProps> = ({ idEvent }) => {
  const [readySearch, setReadySearch] = useState(false);
  const [memberToSearch, setMemberToSearch] = useState({} as Member);
  const [suggestions, setSuggestions] = useState({});
  const [value, setValue] = useState("");
  const handleSearch = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setReadySearch(true);
  };
  const handleAddToEvent = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    updateAttende(idEvent, memberToSearch.id, { attended: true }).then(s => {
      setReadySearch(false);
      setValue("");
    });
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion: Member) => suggestion.firstName;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion: Member) => {
    return <div>{suggestion.firstName}</div>;
  };
  const onChange = (event: any, { newValue }: any) => {
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: any) => {
    getMemberByQuery(value).then(v => {
      setSuggestions(v);
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
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
      <div className="col-xl-4 col-md-6">
        <div className="card user-designer card-container">
          {readySearch ? (
            <div className="card-block text-center">
              <h5>{memberToSearch.firstName}</h5>
              <span className="d-block mb-4">UX Designer</span>
              <img
                className="img-fluid rounded-circle"
                style={{ width: "70px;" }}
                src="assets/images/user/avatar-2.jpg"
                alt="dashboard-user"
              ></img>
              <div className="row m-t-30">
                <div className="col-4 p-r-0">
                  <a
                    onClick={handleAddToEvent}
                    href="#!"
                    className="btn btn-primary shadow-2 text-uppercase btn-block"
                  >
                    Asistio
                  </a>
                </div>
                <div className="col-4 p-r-0">
                  <a
                    onClick={handleAddToEvent}
                    href="#!"
                    className="btn btn-primary shadow-2 text-uppercase btn-block"
                  >
                    Falto
                  </a>
                </div>
                <div className="col-4 p-r-0">
                  <a
                    onClick={handleAddToEvent}
                    href="#!"
                    className="btn btn-primary shadow-2 text-uppercase btn-block"
                  >
                    Cerrar
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
