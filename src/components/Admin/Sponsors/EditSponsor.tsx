import React, { useEffect, useState, MouseEvent, SyntheticEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Sponsor } from "../../../services/models/sponsor";
import {
  updateSponsor,
  getSponsor,
  deleteSponsor
} from "../../../services/sponsorsServices";
import { isEmpty } from "../../../services/objectsservices";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { PageCenterWrapper } from "../../Common/PageCenterWrapper";
import {
  MDBContainer,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn
} from "mdbreact";

type EditSponsorProps = {
  name: string;
};
type EditSponsorParams = {
  loading: () => void;
  ready: () => void;
  id: number;
};
import { EditSponsorComponent } from "./components/EditSponsorComponent";
import { CardWrapper } from '../../Common/CardWrapper';

type EditSponsorPropsAndRouter = EditSponsorParams & EditSponsorProps;
export const EditSponsorToExport: React.SFC<
  RouteComponentProps<EditSponsorPropsAndRouter> & EditSponsorParams
> = ({ loading, ready, ...props }) => {
  const history = useHistory();
  const [sponsor, setSponsor] = useState({} as Sponsor);
  const [sureToDelete, setSureToDelete] = useState(false);
  useEffect(() => {
    loading();
    getSponsor(props.match.params.id).then(s => {
      setSponsor(s);
      ready();
    });
  }, []);
  const handleSaveSponsor = (sponsor: Sponsor, logo: File) => {
    loading();
    updateSponsor(props.match.params.id, sponsor, logo)
      .then(() => {
        ready();
        history.push("/app/sponsors");
      })
      .catch(() => {
        //mostrar error
      });
  };
  const handleDeleteSponsor = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSureToDelete(true);
  };
  const handleConfirmDelete = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    deleteSponsor(sponsor.id).then(c => history.goBack());
  };
  const handleCancel = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSureToDelete(false);
  };
  return (
    <CardWrapper cardTitle="Editar Sponsor">

      {!isEmpty(sponsor) && (
        <EditSponsorComponent
          {...sponsor}
          saveSponsor={handleSaveSponsor}
        ></EditSponsorComponent>
      )}
      <div className="row">
        <button
          type="button"
          onClick={handleDeleteSponsor}
          className="btn btn-danger btn-full-width"
        >
          Eliminar
        </button>
      </div>
    </CardWrapper>
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

export const EditSponsor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSponsorToExport);
