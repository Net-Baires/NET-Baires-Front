import React, { } from "react";
import { RouteComponentProps, useHistory, match, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from '../../store/loading/actions';
import { SecureElement } from '../Auth/SecureElement';
import { MemberEventLivePanel } from '../MemberLogged/MemberEventLivePanel';
import { AdminEventLivePanel } from '../admin/Events/EventLive/AdminEventLivePanel';
type EventLivePanelProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type EventLivePanelParams = {
  id: string;
};

type EventLivePanelPropsAndRouter = EventLivePanelParams &
  EventLivePanelProps;
const EventLivePanelComponent: React.SFC<RouteComponentProps<
  EventLivePanelPropsAndRouter
> &
  EventLivePanelProps> = () => {
    let { id } = useParams();
    return (
      <>
        <SecureElement roles={["Admin", "Organizer"]}>
          <AdminEventLivePanel eventId={+id!}></AdminEventLivePanel>
        </SecureElement>
        <SecureElement roles={["Member"]}>
          <MemberEventLivePanel eventId={+id!} ></MemberEventLivePanel>>
        </SecureElement>
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

export const EventLivePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventLivePanelComponent);
