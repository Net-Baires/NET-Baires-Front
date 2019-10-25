import React, { useState } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { PageCenterWrapper } from "../../Common/PageCenterWrapper";
import { BadgeDetail } from "../../../services/models/BadgeDetail";
import { EditBadgeComponent } from "./components/EditBadgeComponent";
import { newBadge } from "../../../services/badgesServices";
type NewBadgeProps = {
  loading: () => void;
  ready: () => void;
};
const NewBadgeComponent: React.SFC<NewBadgeProps> = ({ loading, ready }) => {
  const [badgeToEdit] = useState({} as BadgeDetail);
  const history = useHistory();

  const saveBadge = (
    badge: BadgeDetail & { imageData?: FormData },
    image: FormData
  ) => {
    loading();
    newBadge(badge, image).then(x => {
      ready();
      history.push("/admin/badges");
    });
  };

  return (
    <PageCenterWrapper classWrapper="lgx-page-wrapper">
      <EditBadgeComponent
        saveBadge={saveBadge}
        badge={badgeToEdit}
      ></EditBadgeComponent>
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

export const NewBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBadgeComponent);
