import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import {
  getEventLive,
  getLiveEventDetail
} from "../../services/eventsServices";
import { EventDetail } from "../../services/models/Events/Event";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { isEmpty } from "../../services/objectsservices";
import { EventLiveDetail } from "../../services/models/Events/EventLiveDetail";
import { CardWrapper } from "../Common/CardWrapper";

type EventLiveDashBoardProps = {
  loading: () => void;
  ready: () => void;
};
type EventLiveDashBoardParams = {
  id: string;
};

type EventLiveDashBoardPropsAndRouter = EventLiveDashBoardParams &
  EventLiveDashBoardProps;

const EventLiveDashBoardComponent: React.SFC<RouteComponentProps<
  EventLiveDashBoardPropsAndRouter
>> = ({ loading, ready, ...props }) => {
  const history = useHistory();
  const [event, setEvent] = useState({} as EventLiveDetail);
  const [error, setError] = useState(false);
  useEffect(() => {
    loading();
    getLiveEventDetail(+props.match.params.id)
      .then(x => {
        setEvent(x);
        ready();
      })
      .catch(x => {
        history.push("/notfound");
      });
  }, []);

  return (
    <>
      {!error ? (
        <CardWrapper titl></CardWrapper>
      ) : (
          <NotFound
            title="No hay eventos en LIVE"
            message="En este momento no estamos realizando ningún evento. Te invitamos a visitar nuestro sitio de meetup."
          ></NotFound>
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

export const EventLiveDashBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventLiveDashBoardComponent);
