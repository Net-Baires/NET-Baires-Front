import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Sponsor } from "../../../services/models/sponsor";
import EditAllSponsor from "./EditAllSponsor";
import { saveSponsor, getSponsor } from "../../../services/sponsorsServices";
import { isEmpty } from "../../../services/objectsservices";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";

type EditSponsorProps = {
  name: string;
};
type EditSponsorParams = {
  loading: () => void;
  ready: () => void;
  id: number;
};

type EditSponsorPropsAndRouter = EditSponsorParams & EditSponsorProps;
export const EditSponsorComponent: React.SFC<
  RouteComponentProps<EditSponsorPropsAndRouter> & EditSponsorParams
> = ({ loading, ready, ...props }) => {
  const history = useHistory();
  const [sponsor, setSponsor] = useState({} as Sponsor);
  useEffect(() => {
    loading();
    getSponsor(props.match.params.id).then(s => {
      setSponsor(s);
      ready();
    });
  }, []);
  const handleSaveSponsor = (sponsor: Sponsor) => {
    loading();
    saveSponsor(props.match.params.id, sponsor)
      .then(() => {
        ready();
        history.push("/admin/sponsors");
      })
      .catch(() => {
        //mostrar error
      });
  };
  return (
    <>
      {!isEmpty(sponsor) && (
        <EditAllSponsor
          {...sponsor}
          saveSponsor={handleSaveSponsor}
        ></EditAllSponsor>
      )}
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

export const EditSponsor = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSponsorComponent);
