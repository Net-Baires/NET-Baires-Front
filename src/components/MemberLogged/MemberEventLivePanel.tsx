import React, { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import {
  GetAdminLiveEventDetail
} from "../../services/eventsServices";
import { EventLiveDetail } from "../../services/models/Events/EventLiveDetail";
import { isEmpty } from "../../services/objectsservices";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { EventLiveTime } from '../EventLive/EventLiveTme';
import { AddCodeToLiveEvent } from './AddCodeToLiveEvent';
type MemberEventLivePanelProps = {
  name: string;
  loading: () => void;
  ready: () => void;
};
type MemberEventLivePanelParams = {
  id: string;
};

type MemberEventLivePanelPropsAndRouter = MemberEventLivePanelParams &
  MemberEventLivePanelProps;
const MemberEventLivePanelComponent: React.SFC<RouteComponentProps<
  MemberEventLivePanelPropsAndRouter
> &
  MemberEventLivePanelProps> = ({ loading, ready, ...props }) => {
    const [eventDetail, setEventDetail] = useState<EventLiveDetail>(
      {} as EventLiveDetail);

    const history = useHistory();
    const loadEventDetail = () => {
      GetAdminLiveEventDetail(+props.match.params.id).then(s => {
        if (s == null) history.push("/admin/panel");
        setEventDetail(s);
        ready();
      });
    };
    useEffect(() => {
      loading();
      loadEventDetail();
    }, []);


    return (
      <>
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>{eventDetail.title}</h5>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="row">
            {!isEmpty(eventDetail) && (<>
              <EventLiveTime eventDetail={eventDetail}></EventLiveTime>
              <AddCodeToLiveEvent eventLive={eventDetail}></AddCodeToLiveEvent>
            </>
            )}
          </div>
        </div>
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

export const MemberEventLivePanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberEventLivePanelComponent);
