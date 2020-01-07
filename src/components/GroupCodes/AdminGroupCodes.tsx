import React, { useState, useEffect, ChangeEvent } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from '../../store/loading/actions';
import { CardHeaderWrapper } from '../Common/CardHeaderWrapper';
import { isEmpty } from '../../services/objectsservices';
import { useParams } from 'react-router-dom';
import { getGroupCodeDetail } from '../../services/groupCodesServices';
import { GroupCodeFullDetailResponse } from '../../services/models/GroupCodes/GroupCodeFullDetailResponse';
import { CardWrapper } from '../Common/CardWrapper';
import { formatStringDate } from '../../helpers/DateHelpers';
import { subscribeUpdateGroupCode } from '../../services/syncCommunicationServices';
import { CardHeaderCollapsableWrapper } from '../Common/CardHeaderCollapsableWrapper';
import { FormControlLabel, Switch, TextField } from '@material-ui/core';
type AdminGroupCodesProps = {
  loading: () => void;
  ready: () => void;
};

const AdminGroupCodesComponent: React.SFC<AdminGroupCodesProps>
  = () => {
    const { id } = useParams();
    const [groupCode, setGroupCode] = useState({} as GroupCodeFullDetailResponse);
    const [repeatMember, setRepeatMember] = useState(false);
    const [count, setCount] = useState();
    const [readyToRaffle, setReadyToRaffle] = useState(true);
    useEffect(() => {
      getGroupCode();
      subscribeUpdateGroupCode(+id!, () => getGroupCode());
    }, [])
    const getGroupCode = () => {
      loading();
      getGroupCodeDetail(+id!).then(x => {
        setGroupCode(x);
        ready();
      });
    }
    const handleChangeCount = (event: ChangeEvent<HTMLInputElement>, newValueCount: number) => {
      event.preventDefault();
      if (groupCode.members.length != null && newValueCount > groupCode.members.length) {
        setCount(newValueCount);
        setReadyToRaffle(true);
      } else {
        setReadyToRaffle(false);
      }
    }

    const handleRaffle = (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
    }

    const handleRepeatMember = (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
      event.preventDefault();
      setRepeatMember(isChecked);
    };
    return (
      <>
        {!isEmpty(groupCode) &&
          <>
            <CardHeaderCollapsableWrapper collapsed={true} cardTitle={`Panel de ácciones sobre el código : ${groupCode.code}`} >
              <CardWrapper cardTitle="Miembros Registrados para este código">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupCode.members.map(member => (
                        <tr key={member.id} className="unread">
                          <td>
                            <h6 className="mb-1">{member.id}</h6>

                          </td>
                          <td>
                            <img
                              className="rounded-circle"
                              style={{ width: "40px", height: "40px" }}
                              src={
                                member.picture != "" && member.picture != null
                                  ? member.picture
                                  : "assets/images/no-image-profile.png"
                              }
                              alt="activity-user"
                            ></img>
                          </td>
                          <td>
                            <h6 className="mb-1">{member.firstName}</h6>
                            <p className="m-0">{member.lastName}</p>
                          </td>
                          <td>
                            <h6 className="text-muted">
                              <i className="fas fa-circle text-c-green f-10 m-r-15"></i>

                            </h6>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardWrapper>
            </CardHeaderCollapsableWrapper>

            <CardHeaderCollapsableWrapper collapsed={true} cardTitle="Sorteos">
              <CardWrapper colSize={4} cardTitle="Configuración">
                <div className="card-block text-center">
                  <div className="row m-t-30">
                    <form className="col">
                      <div className="form-group row">
                        <label className="col-md-6 col-form-label">Cantidad de Ganadores</label>
                        <div className="col-md-6">
                          <input onChange={e => handleChangeCount(e, +e.target.value)} type="number" className="form-control"></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-6 col-form-label">Repetir Ganadores</label>
                        <div className="col-md-6">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={repeatMember}
                                onChange={(e: any) => handleRepeatMember(e, !repeatMember)}
                              />
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <a
                        onClick={e => handleRaffle(e)}
                        href="#!"
                        className="btn btn-primary shadow-2 text-uppercase btn-block"
                      >
                        Sortear
                  </a>
                    </div>
                  </div>
                </div>

              </CardWrapper>
            </CardHeaderCollapsableWrapper>
            <CardHeaderCollapsableWrapper collapsed={true} cardTitle="Entregar Badge"></CardHeaderCollapsableWrapper>
          </>
        }
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

export const AdminGroupCodes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminGroupCodesComponent);
