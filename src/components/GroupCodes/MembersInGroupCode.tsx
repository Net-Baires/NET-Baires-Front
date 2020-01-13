import React, { useState, MouseEvent, useContext } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from "../../store/loading/actions";
import {
  GroupCodeFullDetailResponse,
  MemberSmallDetail
} from "../../services/models/GroupCodes/GroupCodeFullDetailResponse";
import { CardWrapper } from "../Common/CardWrapper";
import { CardHeaderCollapsableWrapper } from "../Common/CardHeaderCollapsableWrapper";
import { Member } from "../../services/models/Member";
import { SearchMember } from "../Admin/Users/components/SearchMember";
import {
  addCodeToGroupCode,
  addMemberToGroupCode
} from "../../services/eventsServices";
import { UserContext } from "../../contexts/UserContext";
import { getMemberIngroupCodeByQuery } from "../../services/groupCodesServices";
type MembersInGroupCodeProps = {
  loading: () => void;
  eventLiveId: number;
  groupCodeId: number;
  ready: () => void;
  groupCodeMembers: MemberSmallDetail[];
};

const MembersInGroupCodeComponent: React.SFC<MembersInGroupCodeProps> = ({
  groupCodeMembers,
  eventLiveId,
  groupCodeId
}) => {
  const user = useContext(UserContext);
  const [groupCode] = useState({} as GroupCodeFullDetailResponse);
  const [selectedMember, setSelectedMember] = useState<Member>({} as Member);
  const [memberExistInGroupCode, setMemberExistInGroupCode] = useState(false);
  const selectMember = (member: Member) => {
    if (groupCode.members && groupCode.members.some(x => x.id == member.id)) {
      setMemberExistInGroupCode(true);
    } else {
      setMemberExistInGroupCode(false);
    }
    setSelectedMember(member);
  };
  const handleUSelectMember = (eventInput: MouseEvent<HTMLAnchorElement>) => {
    eventInput.preventDefault();
    addMemberToGroupCode(eventLiveId, user.user.userId)
      .then(x => {
        setMemberExistInGroupCode(true);
        // setLoading(false);
        // successToast(`Código Reportado a : ${x.detail}`);
        // updateEventLive(eventLive.id);
        // updateGroupCode(x.id);
        // setCode("");
      })
      .catch(e => {
        // setLoading(false);
        // errorToast(
        //   "Error al reportar el código, verifique el código ingresado"
        // );
        // setCode("");
      });
  };
  const handleUDeleteMemberFromGroupCode = (
    eventInput: MouseEvent<HTMLAnchorElement>
  ) => {
    eventInput.preventDefault();
    setMemberExistInGroupCode(false);
  };
  return (
    <>
      <CardHeaderCollapsableWrapper
        collapsed={true}
        cardTitle={`Usuarios registrados `}
      >
        <CardWrapper
          colSize={8}
          cardTitle="Miembros Registrados para este código"
        >
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {groupCodeMembers.map(member => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardWrapper>
        <SearchMember
          searchMembers={getMemberIngroupCodeByQuery(groupCodeId)}
          selectectMember={selectMember}
        >
          {!memberExistInGroupCode && (
            <div className="form-group row">
              <div className="col-md-12">
                <a
                  onClick={handleUSelectMember}
                  href="#!"
                  className="btn btn-primary shadow-2 text-uppercase btn-block"
                >
                  Agregar
                </a>
              </div>
            </div>
          )}
          {memberExistInGroupCode && (
            <div className="form-group row">
              <div className="col-md-12">
                <a
                  onClick={handleUDeleteMemberFromGroupCode}
                  href="#!"
                  className="btn btn-danger shadow-2 text-uppercase btn-block"
                >
                  Eliminar
                </a>
              </div>
            </div>
          )}
        </SearchMember>
      </CardHeaderCollapsableWrapper>
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

export const MembersInGroupCode = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersInGroupCodeComponent);
