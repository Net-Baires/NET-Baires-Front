import React, { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { GetBadgeResponse, NewBadgeRequest } from "../../../services/models/BadgeDetail";
import { newBadge } from "../../../services/badgesServices";
import { CardWrapper } from "../../Common/CardWrapper";
import { EditBadgeComponentHook } from "./components/EditBadgeComponentHook";
import { FileToAdd } from "../../../services/requestServices";
type NewBadgeProps = {
  loading: () => void;
  ready: () => void;
};
const NewBadgeComponent: React.SFC<NewBadgeProps> = ({ loading, ready }) => {
  const [badgeToEdit] = useState({} as GetBadgeResponse);
  const history = useHistory();

  const saveBadge = (badge: NewBadgeRequest, images: Array<FileToAdd>) => {
    loading();
    newBadge(badge, images).then(() => {
      ready();
      history.push("/app/badges");
    });
  };

  return (
    <CardWrapper cardTitle="Nuevo Badge">
      <EditBadgeComponentHook
        saveBadge={saveBadge}
        badge={badgeToEdit}
      ></EditBadgeComponentHook>
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
  },
});

export const NewBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBadgeComponent);
