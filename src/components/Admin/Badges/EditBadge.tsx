import React, { MouseEvent, useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { EditBadgeComponent } from "./components/EditBadgeComponent";
import { isEmpty } from "../../../services/objectsservices";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { GetBadgeResponse } from "../../../services/models/BadgeDetail";
import { CardWrapper } from '../../Common/CardWrapper';
import {
  getBadgeToEdit,
  updateBadge,
  deleteBadge
} from "../../../services/badgesServices";
import { DialogQuestion } from '../../Common/DialogQuestion';
type EditBadgeParams = {
  id: string;
  loading: () => void;
  ready: () => void;
};
const EditBadgeInternalComponent: React.SFC<
  RouteComponentProps<EditBadgeParams> & EditBadgeParams
> = ({ loading, ready, ...props }) => {
  const [badgeToEdit, setBadgeToEdit] = useState({} as GetBadgeResponse);
  const [, setLoaded] = useState(false);
  const [openPopup] = useState(false);
  const [sureToDelete, setSureToDelete] = useState(false);
  const history = useHistory();
  useEffect(() => {
    loading();
    getBadgeToEdit(+props.match.params.id).then(u => {
      setBadgeToEdit(u);
      setLoaded(true);
      ready();
    });
  }, []);
  const savebadge = (badge: GetBadgeResponse, file: File) => {
    loading();
    updateBadge(badge.id, badge, file).then(() => {
      ready();
      history.push("/app/badges");
    });
  };
  const handleDeleteBadge = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSureToDelete(true);
  };
  const handleAccept = () => {
    deleteBadge(badgeToEdit.id).then(() => history.goBack());
  }
  const handleCancel = () => {
    setSureToDelete(false);
  }
  return (<>
    <CardWrapper cardTitle="Editar Badge">
      {!isEmpty(badgeToEdit) && (
        <EditBadgeComponent
          saveBadge={savebadge}
          badge={badgeToEdit}
        ></EditBadgeComponent>
      )}
      <button
        type="button"
        onClick={handleDeleteBadge}
        className="btn btn-danger btn-full-width"
      >
        Eliminar
      </button>
    </CardWrapper>
    <DialogQuestion
      title="Eliminar Código de Grupo"
      description={`El código que intenga eliminar tiene miembros registrados. Esta seguro que desea eliminarlo de todas formas?`}
      openPopup={sureToDelete} callbackAccept={handleAccept} callbackCancel={handleCancel}></DialogQuestion>
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

export const EditBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBadgeInternalComponent);
