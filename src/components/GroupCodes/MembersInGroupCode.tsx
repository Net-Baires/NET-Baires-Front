import React, { useState, MouseEvent } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from "../../store/loading/actions";
import {
  MemberSmallDetail
} from "../../services/models/GroupCodes/GroupCodeFullDetailResponse";
import { CardWrapper } from "../Common/CardWrapper";
import { CardHeaderCollapsableWrapper } from "../Common/CardHeaderCollapsableWrapper";
import { Member } from "../../services/models/Member";
import { SearchMember } from "../Admin/Users/components/SearchMember";
import {
  addMemberToGroupCode, deleteMemberFromGroupCode
} from "../../services/eventsServices";
import { getAttendeesByQuery } from '../../services/attendeesServices';
import { successToast, errorToast, warningToast } from '../../services/toastServices';
import { DialogQuestion } from '../Common/DialogQuestion';
type MembersInGroupCodeProps = {
  loading: () => void;
  eventLiveId: number;
  groupCodeId: number;
  ready: () => void;
  groupCodeMembers: MemberSmallDetail[];
  callbackLoadDetail: () => void;
};

const MembersInGroupCodeComponent: React.SFC<MembersInGroupCodeProps> = ({
  groupCodeMembers,
  eventLiveId,
  groupCodeId,
  callbackLoadDetail,
  loading,
  ready
}) => {
  const [selectedMember, setSelectedMember] = useState<Member>({} as Member);
  const [memberExistInGroupCode, setMemberExistInGroupCode] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const selectMember = (member: Member) => {
    if (groupCodeMembers && groupCodeMembers.some(x => x.id == member.id)) {
      setMemberExistInGroupCode(true);
    } else {
      setMemberExistInGroupCode(false);
    }
    setSelectedMember(member);
  };
  const handleAddMember = (eventInput: MouseEvent<HTMLAnchorElement>) => {
    eventInput.preventDefault();
    setOpenPopup(true);
  };
  const handleUDeleteMemberFromGroupCode = (
    eventInput: MouseEvent<HTMLAnchorElement>
  ) => {
    eventInput.preventDefault();
    loading();
    deleteMemberFromGroupCode(groupCodeId, eventLiveId, selectedMember.id)
      .then(() => {
        setMemberExistInGroupCode(false);
        ready();
        callbackLoadDetail();
        warningToast(`El miembro : ${selectedMember.firstName} fue eliminado al código.`)
      })
      .catch(() => {
        ready();
        errorToast("Error al agregar al miembro al código.");
      });
  };
  const handleAccept = () => {
    loading();
    addMemberToGroupCode(groupCodeId, eventLiveId, selectedMember.id)
      .then(() => {
        setMemberExistInGroupCode(true);
        ready();
        callbackLoadDetail();
        successToast(`El miembro : ${selectedMember.firstName} fue agregado al código.`)
      })
      .catch(() => {
        ready();
        errorToast("Error al agregar al miembro al código.");
      });
  }
  const handleCancel = () => {
    setOpenPopup(false);
  }
  return (
    <>
      <DialogQuestion
        title="Agregar miembro al Grupo de Código"
        description={`Esta intentando agregar un miemebro al Grupo de Código, si continua, no solo agrega al miembro si no que lo marcara como que asistio al evento. Esta seguro que este miembro se encuentra en el evento?`}
        openPopup={openPopup} callbackAccept={handleAccept} callbackCancel={handleCancel}></DialogQuestion>
      <CardHeaderCollapsableWrapper
        collapsed={true}
        cardTitle={`Usuarios registrados (${groupCodeMembers.length}) `}
      >
        <CardWrapper
          colSize={8}
          cardTitle={`Miembros Registrados para este código`}
        >
          <div className="table-responsive" style={{ height: "450px" }}>
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
          searchMembers={getAttendeesByQuery(eventLiveId)}
          selectectMember={selectMember}
        >
          {!memberExistInGroupCode && (
            <div className="form-group row">
              <div className="col-md-12">
                <a
                  onClick={handleAddMember}
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
