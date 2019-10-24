import React, { MouseEvent, useState, useEffect, SyntheticEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { EditBadgeComponent } from "./components/EditBadgeComponent";
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
import { BadgesAssign } from "../../Badges/BadgesAssign";
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";
import { BadgeDetail } from "../../../services/models/BadgeDetail";
import {
  getBadgeToEdit,
  updateBadge,
  deleteBadge
} from "../../../services/badgesServices";
type EditBadgeParams = {
  id: string;
  loading: () => void;
  ready: () => void;
};

const EditBadgeInternalComponent: React.SFC<
  RouteComponentProps<EditBadgeParams> & EditBadgeParams
> = ({ loading, ready, ...props }) => {
  const [badgeToEdit, setBadgeToEdit] = useState({} as BadgeDetail);
  const [loaded, setLoaded] = useState(false);
  const [sureToDelete, setSureToDelete] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getBadgeToEdit(+props.match.params.id).then(u => {
      setBadgeToEdit(u);
      setLoaded(true);
    });
  }, []);
  const savebadge = (badge: BadgeDetail) => {
    loading();
    updateBadge(badge.id, badge).then(x => {
      ready();
      history.push("/admin/badges");
    });
  };
  const deletebadge = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSureToDelete(true);
  };
  const confirmDelete = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    deleteBadge(badgeToEdit.id).then(c => history.goBack());
  };
  const cancel = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSureToDelete(false);
  };

  return (
    <PageFullWidthWrapper classWrapper="lgx-page-wrapper">
      <MDBContainer className="pepepe">
        <MDBModal isOpen={sureToDelete}>
          <MDBModalHeader>Eliminar Usuario</MDBModalHeader>
          <MDBModalBody>
            ¿Esta seguro que quiere eliminar el badger <b>{badgeToEdit.name}</b>
            ?
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
      {!isEmpty(badgeToEdit) && (
        <EditBadgeComponent
          saveBadge={savebadge}
          badge={badgeToEdit}
        ></EditBadgeComponent>
      )}
      <div className="row">
        <button
          type="button"
          onClick={deletebadge}
          className="btn btn-danger btn-full-width"
        >
          Eliminar
        </button>
      </div>
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

export const EditBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBadgeInternalComponent);
