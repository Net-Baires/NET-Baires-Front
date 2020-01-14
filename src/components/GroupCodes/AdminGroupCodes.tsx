import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from "../../store/loading/actions";
import { isEmpty } from "../../services/objectsservices";
import { useParams } from "react-router-dom";
import {
  getGroupCodeDetail,
  assignBadgeToAttendancesInGroupCode,
  makeRaffle
} from "../../services/groupCodesServices";
import { GroupCodeFullDetailResponse } from "../../services/models/GroupCodes/GroupCodeFullDetailResponse";
import { CardWrapper } from "../Common/CardWrapper";
import { subscribeUpdateGroupCode } from "../../services/syncCommunicationServices";
import { CardHeaderCollapsableWrapper } from "../Common/CardHeaderCollapsableWrapper";
import { FormControlLabel, Switch } from "@material-ui/core";
import { SelectOneBadge } from "../admin/Badges/SelectOneBadge";
import { BadgeAssignedList } from "../Badges/BadgeAssignedList";
import { Member } from "../../services/models/Member";
import { MembersInGroupCode } from "./MembersInGroupCode";
import { TitleHeader } from "../Common/TitleHeader";
type AdminGroupCodesProps = {
  loading: () => void;
  ready: () => void;
};
const AdminGroupCodesComponent: React.SFC<AdminGroupCodesProps> = () => {
  const { idEvent, idGroupCode } = useParams();
  const [groupCode, setGroupCode] = useState({} as GroupCodeFullDetailResponse);
  const [repeatMember, setRepeatMember] = useState(false);
  const [count, setCount] = useState(0);
  const [winners, setWinners] = useState<Member[]>({} as Member[]);
  const [readyToRaffle, setReadyToRaffle] = useState(true);
  useEffect(() => {
    getGroupCode();
    subscribeUpdateGroupCode(+idGroupCode!, () => getGroupCode());
  }, []);
  const getGroupCode = () => {
    loading();
    getGroupCodeDetail(+idGroupCode!).then(x => {
      setGroupCode(x);
      ready();
    });
  };
  const handleChangeCount = (
    event: ChangeEvent<HTMLInputElement>,
    newValueCount: number
  ) => {
    event.preventDefault();
    if (
      groupCode.members.length != null &&
      newValueCount > groupCode.members.length
    ) {
      setCount(newValueCount);
      setReadyToRaffle(true);
    } else {
      setReadyToRaffle(false);
    }
  };

  const handleRaffle = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    makeRaffle(groupCode.id, count, repeatMember).then(s =>
      setWinners(winners.concat(s))
    );
  };

  const handleRepeatMember = (
    event: ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => {
    event.preventDefault();
    setRepeatMember(isChecked);
  };
  const assignBadge = (badgeId: number) => {
    loading();
    assignBadgeToAttendancesInGroupCode(+idGroupCode!, badgeId)
      .then(() => {
        ready();
      })
      .finally(() => {
        ready();
        getGroupCode;
      });
  };

  return (
    <>
      {!isEmpty(groupCode) && (
        <>
          <div className="row">
            <TitleHeader
              title={`Panel de ácciones sobre el código : ${groupCode.code}`}
            ></TitleHeader>
          </div>
          <MembersInGroupCode
            callbackLoadDetail={getGroupCode}
            groupCodeId={+idGroupCode!}
            eventLiveId={+idEvent!}
            groupCodeMembers={groupCode.members}
          ></MembersInGroupCode>
          <CardHeaderCollapsableWrapper collapsed={true} cardTitle="Sorteos">
            <CardWrapper colSize={4} cardTitle="Configuración">
              <div className="card-block text-center">
                <div className="row m-t-30">
                  <form className="col">
                    <div className="form-group row">
                      <label className="col-md-6 col-form-label">
                        Cantidad de Ganadores
                      </label>
                      <div className="col-md-6">
                        <input
                          onChange={e => handleChangeCount(e, +e.target.value)}
                          type="number"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-6 col-form-label">
                        Repetir Ganadores
                      </label>
                      <div className="col-md-6">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={repeatMember}
                              onChange={(e: any) =>
                                handleRepeatMember(e, !repeatMember)
                              }
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
            {!isEmpty(winners) && (
              <CardWrapper colSize={8} cardTitle="Ganadores del sorteo">
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
                      {winners.map(winner => (
                        <tr key={winner.id} className="unread">
                          <td>
                            <h6 className="mb-1">{winner.id}</h6>
                          </td>
                          <td>
                            <img
                              className="rounded-circle"
                              style={{ width: "40px", height: "40px" }}
                              src={
                                winner.picture != "" && winner.picture != null
                                  ? winner.picture
                                  : "assets/images/no-image-profile.png"
                              }
                              alt="activity-user"
                            ></img>
                          </td>
                          <td>
                            <h6 className="mb-1">{winner.firstName}</h6>
                            <p className="m-0">{winner.lastName}</p>
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
            )}
          </CardHeaderCollapsableWrapper>
          <CardHeaderCollapsableWrapper
            collapsed={false}
            cardTitle="Entregar Badge"
          >
            <SelectOneBadge assignBadge={assignBadge}></SelectOneBadge>
            <BadgeAssignedList badges={groupCode.badges}></BadgeAssignedList>
          </CardHeaderCollapsableWrapper>
        </>
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

export const AdminGroupCodes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminGroupCodesComponent);
