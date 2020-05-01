import React, { useState, useEffect } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { getAllUsersToEdit, updateUser } from "../../../services/userServices";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { Member } from "../../../services/models/Member";
import { CardWrapper } from "../../Common/CardWrapper";
import { EditOneUserEvent } from "./components/EditOneUser";
import { SelectOneBadge } from "../Badges/SelectOneBadge";
import { assignBadgeToMember } from "../../../services/badgesServices";
import { errorToast } from "../../../services/toastServices";
import { CardHeaderCollapsableWrapper } from "../../Common/CardHeaderCollapsableWrapper";
import { getBadgesFromMeber } from "../../../services/membersServices";
import {
  GetBadgeResponse,
  BadgeMemberViewModel,
} from "../../../services/models/BadgeDetail";
import { BadgeAssignedList } from "../../Badges/BadgeAssignedList";
import { memberNotification } from "../../../services/syncCommunicationServices";

type UsersListProps = {
  loading: () => void;
  ready: () => void;
};
const UsersListComponent: React.SFC<UsersListProps> = ({ loading, ready }) => {
  const [users, setUsers] = useState(new Array<Member>());
  const [badges, setBadges] = useState<BadgeMemberViewModel[]>(
    new Array<BadgeMemberViewModel>()
  );
  const history = useHistory();
  const [selectedMember, setSelectedMember] = useState<Member>();
  useEffect(() => {
    loading();
    getAllUsersToEdit().then((users) => {
      setUsers(users);
      ready();
    });
  }, []);

  const selectectMember = (member: Member) => {
    setSelectedMember(member);
    getBadgesFromMeber(member.id).then((s) => setBadges(s));
  };
  const assignBadge = (badge: GetBadgeResponse) => {
    if (selectedMember != null) {
      loading();
      assignBadgeToMember(badge.id, selectedMember.id)
        .then(() => {
          memberNotification(
            selectedMember.id,
            `Acaba de recibir el badge ${badge.name}`,
            `/app/earned/badges/${badge.id}/detail`
          );
          getBadgesFromMeber(selectedMember.id).then((s) => setBadges(s));
          ready();
        })
        .finally(() => {
          ready();
        });
    } else {
      errorToast("Debe seleccionar un miembro para asignar el Badge");
    }
  };
  const cleanBadges = () => {
    setBadges(new Array<BadgeMemberViewModel>());
  };
  return (
    <>
      <div className="row">
        {users && (
          <EditOneUserEvent
            clickSearch={cleanBadges}
            selectectMember={selectectMember}
          ></EditOneUserEvent>
        )}
        <CardWrapper colSize={4} cardTitle="Acciones Usuarios">
          <NavLink
            className="btn btn-primary"
            activeClassName="active"
            to="/app/users/new"
          >
            Nuevo Usuario
          </NavLink>
        </CardWrapper>
      </div>
      <CardHeaderCollapsableWrapper collapsed={false} cardTitle="Badges">
        <SelectOneBadge
          readyToAssign={selectedMember != null}
          assignBadge={assignBadge}
        ></SelectOneBadge>
        <BadgeAssignedList badges={badges}></BadgeAssignedList>
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
  },
});

export const UsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListComponent);
