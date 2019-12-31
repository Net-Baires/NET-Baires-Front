import React, { useState, SyntheticEvent, MouseEvent, ChangeEvent } from "react";
import { Member } from "../../../../services/models/Member";
import Autosuggest from "react-autosuggest";
import { getMemberByQuery, getMemberDetail } from "../../../../services/membersServices";
import {
  updateAttende,
  getAttendeeDetail
} from "../../../../services/attendeesServices";
import { isEmpty } from "../../../../services/objectsservices";
import { EventsAttendees } from "../../../../services/models/EventsAttendees";
import { updateEventLive, memberNotification } from '../../../../services/syncCommunicationServices';
import { useHistory } from 'react-router';
import { updateUser } from '../../../../services/userServices';
import { FormControlLabel, Switch } from '@material-ui/core';
import { CardWrapper } from '../../../Common/CardWrapper';

type NewUserProps = {
  callbackAction?: () => void;
};
export const EditOneUserEvent: React.SFC<NewUserProps> = ({ callbackAction }) => {
  const [users, setUsers] = useState(new Array<Member>());
  const [readySearch, setReadySearch] = useState(false);
  const [memberToSearch, setMemberToSearch] = useState({} as Member);
  const [attendeeDetail, setAttendeeDetail] = useState({} as Member);
  const [suggestions, setSuggestions] = useState({});
  const [value, setValue] = useState("");
  const history = useHistory();
  const handleSearch = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    loadDetail();
  };

  const loadDetail = () => {
    if (!isEmpty(memberToSearch)) {
      getMemberDetail(memberToSearch.id).then(detail => {
        if (detail == null)
          setAttendeeDetail(detail);
        else setAttendeeDetail(detail);
        setReadySearch(true);
      });
    }
  }
  const handleUserEnable = (eventInput: ChangeEvent<HTMLInputElement>, isChecked: boolean, user: Member) => {
    eventInput.preventDefault();
    attendeeDetail.blocked = isChecked;
    updateMember(attendeeDetail, users);
  };
  const handleUserOrganized = (eventInput: ChangeEvent<HTMLInputElement>, isChecked: boolean, user: Member) => {
    eventInput.preventDefault();

    attendeeDetail.organized = isChecked;
    updateMember(attendeeDetail, users);
  };
  const handleUserColaborator = (eventInput: ChangeEvent<HTMLInputElement>, isChecked: boolean, user: Member) => {
    eventInput.preventDefault();
    attendeeDetail.colaborator = isChecked;
    updateMember(attendeeDetail, users);
  };
  const updateMember = (user: Member, users: Array<Member>) => {
    updateUser(user.id, user).then(() => {
      loadDetail();
    });
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

  const handleEdit = (event: MouseEvent<HTMLAnchorElement>, user: Member) => {
    event.preventDefault();
    history.push(`/admin/users/${user.id}/Edit`);
  };
  return (
    <>
      <CardWrapper colSize={4} cardTitle="Editar Miembro">
        {readySearch ? (
          <div className="card-block text-center">
            <h5>{memberToSearch.firstName}</h5>
            {/* <span className="d-block mb-4">{memberToSearch.}</span> */}
            <img
              className="img-fluid rounded-circle rounded-circle-sync-user-to-event"
              style={{ width: "70px" }}
              src={
                memberToSearch.picture != "" && memberToSearch.picture != null
                  ? memberToSearch.picture
                  : "assets/images/no-image-profile.png"
              }
              alt="dashboard-user"
            ></img>
            <div className="row m-t-30">
              {/* <div className="col-6 p-r-0">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={attendeeDetail.organized}
                        onChange={(e) => handleUserOrganized(e, !attendeeDetail.organized, attendeeDetail)}
                      />
                    }
                    label="Organizador"
                  />
                </div>
                <div className="col-6 p-r-0">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={attendeeDetail.colaborator}
                        onChange={(e) => handleUserColaborator(e, !attendeeDetail.colaborator, attendeeDetail)}
                      />
                    }
                    label="Colaborador"

                  />
                </div>
                <div className="col-6 p-r-0">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={attendeeDetail.blocked}
                        onChange={(e) => handleUserEnable(e, !attendeeDetail.blocked, attendeeDetail)}
                      />
                    }
                    label="Bloqueado"
                  />
                </div>
                <div className="col-6 p-r">
                  <a
                    onClick={e => handleEdit(e, attendeeDetail)}
                    href="#!"
                    className="btn btn-info shadow-2 text-uppercase btn-block"
                  >
                    Editar
                  </a>
                </div> */}
              <form className="col">
                <div className="form-group row">
                  <label className="col-md-6 col-form-label">Organizador</label>
                  <div className="col-md-6">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={attendeeDetail.organized}
                          onChange={(e) => handleUserOrganized(e, !attendeeDetail.organized, attendeeDetail)}
                        />
                      }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-6 col-form-label">Colaborador</label>
                  <div className="col-md-6">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={attendeeDetail.colaborator}
                          onChange={(e) => handleUserColaborator(e, !attendeeDetail.colaborator, attendeeDetail)}
                        />
                      }

                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-6 col-form-label">Bloqueado</label>
                  <div className="col-md-6">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={attendeeDetail.blocked}
                          onChange={(e) => handleUserEnable(e, !attendeeDetail.blocked, attendeeDetail)}
                        />
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6">
                    <a
                      onClick={e => handleEdit(e, attendeeDetail)}
                      href="#!"
                      className="btn btn-info shadow-2 text-uppercase btn-block"
                    >
                      Editar
                  </a>
                  </div>
                  <div className="col-sm-6">
                    <a
                      onClick={e => handleClose(e)}
                      href="#!"
                      className="btn btn-warning shadow-2 text-uppercase btn-block"
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
      </CardWrapper>
    </>
  );
};
