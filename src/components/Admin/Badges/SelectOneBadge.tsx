import { useHistory, Switch } from 'react-router-dom';
import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { Member } from '../../../services/models/Member';
import { getMemberDetail, getMemberByQuery } from '../../../services/membersServices';
import { isEmpty } from '../../../services/objectsservices';
import { updateUser } from '../../../services/userServices';
import React from 'react';
import { CardWrapper } from '../../Common/CardWrapper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autosuggest from 'react-autosuggest';
import 'isomorphic-fetch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getBadgeByName } from '../../../services/badgesServices';
import { GetBadgeResponse } from '../../../services/models/BadgeDetail';


function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
type SelectOneBadgeProps = {
  callbackAction?: () => void;
};
export const SelectOneBadge: React.SFC<SelectOneBadgeProps> = ({ callbackAction }) => {
  const [users, setUsers] = useState(new Array<Member>());
  const [readySearch, setReadySearch] = useState(false);
  const [memberToSearch, setMemberToSearch] = useState({} as Member);
  const [attendeeDetail, setAttendeeDetail] = useState({} as Member);
  const [suggestions, setSuggestions] = useState({});
  const [value, setValue] = useState("");
  const history = useHistory();








  //aaaaaaaaaaaaaaaa

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<GetBadgeResponse[]>([]);
  const [selectedBadge, setSelectedBadge] = React.useState<GetBadgeResponse>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    getBadgeByName("").then(x => {
      setOptions(x);
    });


    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);


  //aaaaaaaaaaaaa
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
    history.push(`/app/users/${user.id}/Edit`);
  };
  return (
    <>
      <CardWrapper colSize={4} cardTitle="Seleccionar Badge">
        {readySearch ? (
          <div className="card-block text-center">
            <h5>{memberToSearch.firstName}</h5>
            {/* <span className="d-block mb-4">{memberToSearch.}</span> */}
            <img
              className="img-fluid rounded-circle rounded-circle-sync-user-to-event"
              style={{ width: "150px", height: "150px" }}
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
                <form>
                  <div className="form-group">
                    <img
                      style={{ maxHeight: "150px", maxWidth: "100%" }}
                      src={
                        selectedBadge.imageUrl != "" && selectedBadge.imageUrl != null
                          ? selectedBadge.imageUrl
                          : "assets/images/NotFound.png"
                      }
                      alt="dashboard-user"
                    ></img>
                  </div>
                  <div className="form-group">
                    <label>Buscar Badge</label>

                    <Autocomplete
                      id="asynchronous-demo"
                      open={open}
                      onChange={(event, value) => setSelectedBadge(value)}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={() => {
                        setOpen(false);
                      }}
                      getOptionSelected={(option, value) => option.name === value.name}
                      getOptionLabel={option => option.name}
                      options={options}
                      loading={loading}
                      renderInput={params => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                </form>

                <div className="designer m-t-30">
                  <a
                    onClick={handleSearch}
                    href="#!"
                    className="btn btn-primary shadow-2 text-uppercase btn-block"
                  >
                    Seleccionar
                  </a>
                </div>
              </div>
            </>
          )}
      </CardWrapper>
    </>
  );
};
