import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from "../../store/loading/actions";
import { isEmpty } from "../../services/objectsservices";
import { useParams } from "react-router-dom";
import {
  getGroupCodeDetail,
  assignBadgeToAttendancesInGroupCode,
  makeRaffle,
} from "../../services/groupCodesServices";
import { GroupCodeFullDetailResponse } from "../../services/models/GroupCodes/GroupCodeFullDetailResponse";
import { CardWrapper } from "../Common/CardWrapper";
import {
  subscribeUpdateGroupCode,
  memberNotification,
} from "../../services/syncCommunicationServices";
import { CardHeaderCollapsableWrapper } from "../Common/CardHeaderCollapsableWrapper";
import { FormControlLabel, Switch } from "@material-ui/core";
import { SelectOneBadge } from "../admin/Badges/SelectOneBadge";
import { Member } from "../../services/models/Member";
import { MembersInGroupCode } from "./MembersInGroupCode";
import { TitleHeader } from "../Common/TitleHeader";
import { GetBadgeResponse } from "../../services/models/BadgeDetail";
type AdminGroupCodesProps = {
  loading: () => void;
  ready: () => void;
};
const AdminGroupCodesComponent: React.SFC<AdminGroupCodesProps> = ({
  loading,
  ready,
}) => {
  const { idEvent, idGroupCode } = useParams();
  const [groupCode, setGroupCode] = useState({} as GroupCodeFullDetailResponse);
  const [repeatMember, setRepeatMember] = useState(false);
  const [count, setCount] = useState(0);
  const [readyToRaffle, setReadyToRaffle] = useState(true);
  useEffect(() => {
    getGroupCode();
    subscribeUpdateGroupCode(+idGroupCode!, () => getGroupCode());
  }, []);
  const getGroupCode = () => {
    loading();
    getGroupCodeDetail(+idGroupCode!).then((x) => {
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
      newValueCount <= groupCode.members.length
    ) {
      setCount(newValueCount);
      setReadyToRaffle(true);
    } else {
      setReadyToRaffle(false);
    }
  };

  const handleRaffle = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    makeRaffle(+idGroupCode!, count, repeatMember).then((s) => getGroupCode());
  };

  const handleRepeatMember = (
    event: ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => {
    event.preventDefault();
    setRepeatMember(isChecked);
  };
  const assignBadge = (badge: GetBadgeResponse) => {
    loading();
    assignBadgeToAttendancesInGroupCode(+idGroupCode!, badge.id)
      .then(() => {
        groupCode.members.forEach((member) =>
          memberNotification(
            member.id,
            `Acaba de recibir el badge ${badge.name}`,
            `/app/earned/badges/${badge.id}/detail`
          )
        );
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
                          onChange={(e) =>
                            handleChangeCount(e, +e.target.value)
                          }
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
                      onClick={(e) => handleRaffle(e)}
                      href="#!"
                      className="btn btn-primary shadow-2 text-uppercase btn-block"
                    >
                      Sortear
                    </a>
                  </div>
                </div>
              </div>
            </CardWrapper>
            {!isEmpty(groupCode) &&
              !isEmpty(groupCode.members) &&
              !isEmpty(groupCode.members.filter((x) => x.winner)) && (
                <CardWrapper
                  colSize={8}
                  cardTitle={`Ganadores del sorteo : ${
                    groupCode.members.filter((x) => x.winner).length
                  }`}
                >
                  <div className="table-responsive" style={{ height: "450px" }}>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th className="d-none d-sm-block">Id</th>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Posición</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupCode.members
                          .filter((x) => x.winner)
                          .sort((a, b) =>
                            a.winnerPosition > b.winnerPosition ? 1 : -1
                          )
                          .map((winner) => (
                            <tr key={winner.id} className="unread">
                              <td className="d-none d-sm-block">
                                <h6 className="mb-1">{winner.id}</h6>
                              </td>
                              <td>
                                <img
                                  className="rounded-circle"
                                  style={{ width: "40px", height: "40px" }}
                                  src={
                                    winner.picture != "" &&
                                    winner.picture != null
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
                                <p className="m-0">{winner.winnerPosition}</p>
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
            <CardWrapper
              cardBodyClassName="card-body-md"
              colSize={8}
              cardTitle="Badges ya entregados"
            >
              <div className="table-responsive" style={{ height: "400px" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="d-none d-sm-block">Id</th>
                      <th>Imagen</th>
                      <th className="d-none d-sm-block">Nombre</th>
                      <th>Entregado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupCode.badges.map((badge) => (
                      <tr key={badge.id} className="unread">
                        <td className="d-none d-sm-block">
                          <h6 className="mb-1">{badge.id}</h6>
                        </td>
                        <td>
                          <img
                            className="rounded-circle"
                            style={{ height: "50px" }}
                            src={
                              badge.imageUrl != "" && badge.imageUrl != null
                                ? badge.imageUrl
                                : "assets/images/no-image-profile.png"
                            }
                            alt="activity-user"
                          ></img>
                        </td>
                        <td className="d-none d-sm-block">
                          <h6 className="mb-1">{badge.name}</h6>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardWrapper>
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
  },
});

export const AdminGroupCodes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminGroupCodesComponent);
