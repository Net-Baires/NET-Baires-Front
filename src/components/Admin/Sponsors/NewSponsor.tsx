import React, { useState, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Sponsor } from "../../../services/models/sponsor";
import { newSponsor } from "../../../services/sponsorsServices";
import EditAllSponsor from "./EditAllSponsor";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { PageCenterWrapper } from "../../../components/Common/PageCenterWrapper";
type NewSponsorProps = {
  loading: () => void;
  ready: () => void;
};
export const NewSponsorComponent: React.SFC<NewSponsorProps> = ({
  loading,
  ready
}) => {
  const history = useHistory();

  const handleSaveSponsor = (sponsor: Sponsor) => {
    loading();
    newSponsor(sponsor)
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
      <EditAllSponsor saveSponsor={handleSaveSponsor}></EditAllSponsor>
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
