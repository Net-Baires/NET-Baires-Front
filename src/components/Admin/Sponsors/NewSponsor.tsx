import React, { useState, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Sponsor } from "../../../services/models/sponsor";
import { newSponsor } from "../../../services/sponsorsServices";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { PageCenterWrapper } from "../../../components/Common/PageCenterWrapper";
import { EditSponsorComponent } from "./components/EditSponsorComponent";
type NewSponsorProps = {
  loading: () => void;
  ready: () => void;
};
export const NewSponsorComponent: React.SFC<NewSponsorProps> = ({
  loading,
  ready
}) => {
  const history = useHistory();

  const handleSaveSponsor = (sponsor: Sponsor, logo: File) => {
    loading();
    newSponsor(sponsor, logo)
      .then(() => {
        ready();
        history.push("/admin/sponsors");
      })
      .catch(() => {
        //mostrar error
      });
  };
  return (
    <PageCenterWrapper>
      <EditSponsorComponent
        saveSponsor={handleSaveSponsor}
      ></EditSponsorComponent>
    </PageCenterWrapper>
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

export const NewSponsor = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSponsorComponent);
