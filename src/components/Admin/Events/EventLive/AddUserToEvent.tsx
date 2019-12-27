import React, { useState, SyntheticEvent } from "react";
import { Member } from "../../../../services/models/Member";
import Autosuggest from "react-autosuggest";
import { getMemberByQuery } from "../../../../services/membersServices";
import { updateAttende } from "../../../../services/attendeesServices";
import ReactTooltip from "react-tooltip";
import { isEmpty } from "../../../../services/objectsservices";

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
    if (!isEmpty(memberToSearch)) setReadySearch(true);
  };
  const handleAttended = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    updateAttende(idEvent, memberToSearch.id, { attended: true }).then(() => {
      setReadySearch(false);
      setValue("");
    });
  };
  const handleDidNotAttended = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    updateAttende(idEvent, memberToSearch.id, { attended: false }).then(() => {
      searchScreen();
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
    return <div>{suggestion.firstName}</div>;
  };
  const onChange = (event: any, { newValue }: any) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
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
                    onClick={handleAttended}
                    data-tip="Asistio"
                    href="#!"
                    className="btn btn-primary shadow-2 text-uppercase btn-block"
                  >
                    <i className="feather icon-check-square"></i>
                  </a>
                </div>
                <div className="col-4 p-r">
                  <a
                    data-tip="No asistio"
                    onClick={handleDidNotAttended}
                    href="#!"
                    className="btn btn-warning shadow-2 text-uppercase btn-block"
                  >
                    <i className="feather icon-x-circle"></i>
                    <ReactTooltip />
                  </a>
                </div>
                <div className="col-4 p-r">
                  <a
                    onClick={handleClose}
                    href="#!"
                    className="btn btn-primary shadow-2 text-uppercase btn-block"
                  >
                    C
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
