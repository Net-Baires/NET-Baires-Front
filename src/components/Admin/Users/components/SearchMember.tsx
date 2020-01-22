import React, { useState, SyntheticEvent } from "react";
import { Member } from "../../../../services/models/Member";
import Autosuggest from "react-autosuggest";
import { getMemberDetail } from "../../../../services/membersServices";
import { isEmpty } from "../../../../services/objectsservices";
import { CardWrapper } from "../../../Common/CardWrapper";
import { EventsAttendees } from '../../../../services/models/EventsAttendees';

type NewUserProps = {
  selectectMember: (member: Member) => void;
  searchMembers: (query: string) => Promise<EventsAttendees[]>;
};
export const SearchMember: React.SFC<NewUserProps> = ({
  selectectMember,
  searchMembers,
  children
}) => {
  const [readySearch, setReadySearch] = useState(false);
  const [memberToSearch, setMemberToSearch] = useState({} as EventsAttendees);
  const [attendeeDetail, setAttendeeDetail] = useState({} as Member);
  const [suggestions, setSuggestions] = useState(new Array<EventsAttendees>());
  const [value, setValue] = useState("");

  const loadDetail = () => {
    if (!isEmpty(memberToSearch)) {
      getMemberDetail(+memberToSearch.memberDetail!.id!).then(detail => {
        setAttendeeDetail(detail);
        selectectMember(detail);
        setReadySearch(true);
      });
    }
  };
  const handleSearch = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    loadDetail();
  };
  const handleClose = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    searchScreen();
  };
  const searchScreen = () => {
    setReadySearch(false);
    setValue("");
    setAttendeeDetail({} as Member);
  };
  const getSuggestionValue = (suggestion: EventsAttendees) => suggestion.memberDetail!.firstName;
  const renderSuggestion = (suggestion: EventsAttendees) => {
    return (
      <div className="row">
        <div className="col-md-3">
          <img className="img-suggestion-member" src={suggestion.memberDetail!.picture}></img>
        </div>
        <div className="col-md-9">
          {suggestion.memberDetail!.firstName} {suggestion.memberDetail!.lastName}
        </div>
      </div>
    );
  };
  const onChange = (event: any, { newValue }: any) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    if (value != null && value.length > 3)
      // getMemberByQuery(value).then(v => {
      searchMembers(value).then(v => {
        if (v == null)
          setSuggestions(new Array<EventsAttendees>());
        else
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
      <CardWrapper colSize={4} cardTitle="Seleccionar Miembro">
        {readySearch ? (
          <div className="card-block text-center">
            <h5>{memberToSearch.memberDetail!.firstName}</h5>
            {/* <span className="d-block mb-4">{memberToSearch.memberDetail!.}</span> */}
            <img
              className="img-fluid rounded-circle rounded-circle-sync-user-to-event"
              style={{ width: "150px", height: "150px" }}
              src={
                memberToSearch.memberDetail!.picture != "" && memberToSearch.memberDetail!.picture != null
                  ? memberToSearch.memberDetail!.picture
                  : "assets/images/no-image-profile.png"
              }
              alt="dashboard-user"
            ></img>
            <div className="row m-t-30">
              <hr></hr>
              <form className="col">
                <div className="form-group row">
                  <div className="col-md-12">
                    <h6 className=" m-b-0">{`${attendeeDetail.averageAttendance}%`}</h6>
                    <div className="progress m-t-10" style={{ height: "7px" }}>
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{
                          width: `${attendeeDetail.averageAttendance}%`
                        }}
                        aria-valuenow="70"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <hr></hr>
                </div>
                {children}
                <div className="form-group row">
                  <div className="col-md-12">
                    <a
                      onClick={handleClose}
                      href="#!"
                      className="btn btn-primary shadow-2 text-uppercase btn-block"
                    >
                      Buscar
                    </a>
                  </div>
                </div>
              </form>
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
                  className="members-search-input"
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
      </CardWrapper>
    </>
  );
};
