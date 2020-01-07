import React, { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { GetBadgeResponse } from "../../../services/models/BadgeDetail";
import { EditBadgeComponent } from "./components/EditBadgeComponent";
import { newBadge } from "../../../services/badgesServices";
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";
import { CardWrapper } from '../../Common/CardWrapper';
type NewBadgeProps = {
  loading: () => void;
  ready: () => void;
};
const NewBadgeComponent: React.SFC<NewBadgeProps> = ({ loading, ready }) => {
  const [badgeToEdit] = useState({} as GetBadgeResponse);
  const history = useHistory();

  const saveBadge = (badge: GetBadgeResponse, image: File) => {
    loading();
    newBadge(badge, image).then(x => {
      ready();
      history.push("/app/badges");
    });
  };

  return (
    <CardWrapper cardTitle="Nuevo Badge">
      <EditBadgeComponent
        saveBadge={saveBadge}
        badge={badgeToEdit}
      ></EditBadgeComponent>
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

export const NewBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBadgeComponent);
