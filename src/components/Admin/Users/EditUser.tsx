import React, { MouseEvent, useState, useEffect, SyntheticEvent } from "react";
import {
  getUsersToEdit,
  deleteEditUser,
  updateUser
} from "../../../services/userServices";
import { RouteComponentProps, useHistory } from "react-router";
import { EditUserComponent } from "./components/EditUserComponent";
import { isEmpty } from "../../../services/objectsservices";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { User } from "../../../services/models/User";
type EditUserParams = {
  id: string;
  loading: () => void;
  ready: () => void;
};

const EditUserInternalComponent: React.SFC<
  RouteComponentProps<EditUserParams> & EditUserParams
> = ({ loading, ready, ...props }) => {
  const [userToEdit, setUserToEdit] = useState({} as User);
  const [sureToDelete, setSureToDelete] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getUsersToEdit(+props.match.params.id).then(u => {
      setUserToEdit(u);
    });
  }, []);
  const saveUser = (user: User) => {
    loading();
    updateUser(user.id, user).then(x => {
      ready();
      history.push("/admin/users");
    });
  };
  const deleteUser = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSureToDelete(true);
  };
  const confirmDelete = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    deleteEditUser(userToEdit.id).then(c => history.goBack());
  };
  const cancel = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSureToDelete(false);
  };
  return (
    <>
      <MDBContainer>
        <MDBModal isOpen={sureToDelete}>
          <MDBModalHeader>Eliminar Usuario</MDBModalHeader>
          <MDBModalBody>
            ¿Esta seguro que quiere eliminar al usuario{" "}
            <b>{userToEdit.email}</b>?
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={cancel} color="secondary">
              Cancelar
            </MDBBtn>
            <MDBBtn onClick={confirmDelete} color="danger">
              Eliminar
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      {!isEmpty(userToEdit) && (
        <EditUserComponent
          saveUser={saveUser}
          user={userToEdit}
        ></EditUserComponent>
      )}
      <button type="button" onClick={deleteUser} className="btn btn-danger">
        Eliminar
      </button>
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

export const EditUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserInternalComponent);
