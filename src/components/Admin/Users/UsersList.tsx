import React, { useState, useEffect, MouseEvent } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import {
  getAllUsersToEdit,
  enableUser,
  updateUser
} from "../../../services/userServices";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Checkbox from "react-simple-checkbox";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { SearchWrapper } from "../../Common/SearchWrapper";
import { Member } from "../../../services/models/Member";
import { CardWrapper } from '../../Common/CardWrapper';
import { EditOneUserEvent } from './components/EditOneUser';
import { SelectOneBadge } from '../Badges/SelectOneBadge';
import { assignBadgeToMember } from '../../../services/badgesServices';
import { errorToast } from '../../../services/toastServices';
import { CardHeaderCollapsableWrapper } from '../../Common/CardHeaderCollapsableWrapper';
import { getBdgesFromMeber } from '../../../services/membersServices';
import { GetBadgeResponse } from '../../../services/models/BadgeDetail';
import { BadgeAssignedList } from '../../Badges/BadgeAssignedList';

type UsersListProps = {
  loading: () => void;
  ready: () => void;
};
const UsersListComponent: React.SFC<UsersListProps> = ({ loading, ready }) => {
  const [users, setUsers] = useState(new Array<Member>());
  const [badges, setBadges] = useState<GetBadgeResponse[]>(new Array<GetBadgeResponse>());
  const [selectedMember, setSelectedMember] = useState<Member>();
  const history = useHistory();
  useEffect(() => {
    loading();
    getAllUsersToEdit().then(users => {
      setUsers(users);
      ready();
    });
  }, []);
  const { SearchBar } = Search;
  const handleUserEnable = (isChecked: boolean, user: Member) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].blocked = isChecked;
    updateMember(usersToUpdate[updateIndex], users);
  };
  const handleUserOrganized = (isChecked: boolean, user: Member) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].organized = isChecked;
    updateMember(usersToUpdate[updateIndex], users);
  };
  const handleUserColaborator = (isChecked: boolean, user: Member) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].colaborator = isChecked;
    updateMember(usersToUpdate[updateIndex], users);
  };
  const updateMember = (user: Member, users: Array<Member>) => {
    loading();
    updateUser(user.id, user).then(() => {
      setUsers(users);
      ready();
    });
  };

  const columns = [
    {
      dataField: "id",
      text: "Id"
    },
    {
      dataField: "firstName",
      text: "Nombre"
    },
    {
      dataField: "lastName",
      text: "Apellido"
    },
    {
      dataField: "email",
      sort: true,
      text: "Email"
    },
    {
      dataField: "blocked",
      text: "Bloqueado",
      sort: true,
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, user: Member) => (
        <Checkbox
          checked={user.blocked}
          onChange={(i: boolean) => handleUserEnable(i, user)}
        ></Checkbox>
      )
    },
    {
      dataField: "organized",
      text: "Organizador",
      sort: true,

      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, user: Member) => (
        <Checkbox
          checked={user.organized}
          onChange={(i: boolean) => handleUserOrganized(i, user)}
        ></Checkbox>
      )
    },
    {
      dataField: "colaborator",
      sort: true,

      text: "Colaborador",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, user: Member) => (

        <Checkbox
          checked={user.colaborator}
          onChange={(i: boolean) => handleUserColaborator(i, user)}
        ></Checkbox>
      )
    },
    {
      text: "Eliminar",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, user: Member) => (
        <button
          key={user.id}
          onClick={e => handleDelete(e, user)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      )
    },
    {
      text: "Editar",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, user: Member) => (
        <button
          key={user.id}
          onClick={e => handleEdit(e, user)}
          type="button"
          className="btn btn-primary"
        >
          Editar
        </button>
      )
    }
  ];
  const handleDelete = (event: MouseEvent<HTMLButtonElement>, user: Member) => {
    event.preventDefault();
  };
  const handleEdit = (event: MouseEvent<HTMLButtonElement>, user: Member) => {
    event.preventDefault();
    history.push(`/app/users/${user.id}/Edit`);
  };
  const selectectMember = (member: Member) => {
    setSelectedMember(member);
    getBdgesFromMeber(member.id).then(s => setBadges(s));
  }
  const assignBadge = (badgeId: number) => {
    if (selectedMember != null) {
      loading();
      assignBadgeToMember(badgeId, selectedMember.id).then(() => {
        getBdgesFromMeber(selectedMember.id).then(s => setBadges(s));
        ready();
      }).finally(() => {
        ready();
      });
    } else {
      errorToast("Debe seleccionar un miembro para asignar el Badge");
    }
  }
  return (<>
    <div className="row">
      {users && (
        <EditOneUserEvent selectectMember={selectectMember}></EditOneUserEvent>

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
      <SelectOneBadge assignBadge={assignBadge} ></SelectOneBadge>
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
  }
});

export const UsersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListComponent);
