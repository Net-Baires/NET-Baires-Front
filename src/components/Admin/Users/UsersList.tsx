import React, { useState, useEffect, MouseEvent } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { UserToEdit } from "../../../services/models/UserToEdit";
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
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";
import { SearchWrapper } from "../../Common/SearchWrapper";

type UsersListProps = {
  loading: () => void;
  ready: () => void;
};
const UsersListComponent: React.SFC<UsersListProps> = ({ loading, ready }) => {
  const [users, setUsers] = useState(new Array<UserToEdit>());
  const history = useHistory();
  useEffect(() => {
    loading();
    getAllUsersToEdit().then(users => {
      setUsers(users);
      ready();
    });
  }, []);
  const { SearchBar } = Search;
  const handleUserEnable = (isChecked: boolean, user: UserToEdit) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].blocked = isChecked;
    updateMember(usersToUpdate[updateIndex], users);
  };
  const handleUserOrganized = (isChecked: boolean, user: UserToEdit) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].organized = isChecked;
    updateMember(usersToUpdate[updateIndex], users);
  };
  const handleUserColaborator = (isChecked: boolean, user: UserToEdit) => {
    const updateIndex = users.indexOf(user);
    const usersToUpdate = users.slice();
    usersToUpdate[updateIndex].colaborator = isChecked;
    updateMember(usersToUpdate[updateIndex], users);
  };
  const updateMember = (user: UserToEdit, users: Array<UserToEdit>) => {
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
      text: "Email"
    },
    {
      dataField: "blocked",
      text: "Bloqueado",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, user: UserToEdit) => (
        <Checkbox
          checked={user.blocked}
          onChange={(i: boolean) => handleUserEnable(i, user)}
        ></Checkbox>
      )
    },
    {
      dataField: "organized",
      text: "Organizador",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, user: UserToEdit) => (
        <Checkbox
          checked={user.organized}
          onChange={(i: boolean) => handleUserOrganized(i, user)}
        ></Checkbox>
      )
    },
    {
      dataField: "colaborator",
      text: "Colaborador",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, user: UserToEdit) => (
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
      formatter: (_cellContent: any, user: UserToEdit) => (
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
      formatter: (_cellContent: any, user: UserToEdit) => (
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
  const handleDelete = (
    event: MouseEvent<HTMLButtonElement>,
    user: UserToEdit
  ) => {
    event.preventDefault();
  };
  const handleEdit = (
    event: MouseEvent<HTMLButtonElement>,
    user: UserToEdit
  ) => {
    event.preventDefault();
    history.push(`/admin/users/${user.id}/Edit`);
  };

  return (
    <PageFullWidthWrapper classWrapper="lgx-page-wrapper">
      {users && (
        <SearchWrapper title="Usuarios">
          <ToolkitProvider keyField="id" data={users} columns={columns} search>
            {(props: any) => (
              <div>
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable
                  keyField="id"
                  {...props.baseProps}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </SearchWrapper>
      )}
      <NavLink
        className="btn btn-success"
        activeClassName="active"
        to="/admin/users/new"
      >
        Nuevo Usuario
      </NavLink>
    </PageFullWidthWrapper>
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
