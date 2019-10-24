import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { formatStringDate } from "../../helpers/DateHelpers";
import { getMembersInBadge } from "../../services/membersServices";
import { getEventLive } from "../../services/eventsServices";
import { EventDetail } from "../../services/models/Events/Event";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";

type EventLiveDashBoardProps = {
  loading: () => void;
  ready: () => void;
};
type EventLiveDashBoardParams = {
  id: string;
};

type EventLiveDashBoardPropsAndRouter = EventLiveDashBoardParams &
  EventLiveDashBoardProps;
export const EventLiveDashBoardComponent: React.SFC<
  RouteComponentProps<EventLiveDashBoardPropsAndRouter> &
    EventLiveDashBoardProps
> = ({ match, loading, ready }) => {
  const [event, setEvent] = useState({} as EventDetail);
  useEffect(() => {
    loading();
    getEventLive(+match.params.id).then(x => {
      setEvent(x);
      ready();
    });
  }, []);

  return (
    <PageFullWidthWrapper classWrapper="lgx-post-wrapper">
      <article>
        <header>
          <figure>
            <img src={event.imageUrl} alt="New" />
          </figure>
          <div className="text-area">
            <div className="hits-area">
              <div className="date">
                <a href="#" target="blank">
                  <i className="fa fa-user"></i> NET-Baires
                </a>
                <a href="#">
                  <i className="fa fa-calendar"></i>{" "}
                  {/* {formatStringDate(event.created)} */}
                </a>
                <a href="#">
                  <i className="fa fa-folder"></i> News
                </a>
                <a href="#">
                  <i className="fa fa-comment"></i> 0 Comments
                </a>
                <a href="#">
                  <i className="fa fa-heart"></i> Hits: 353
                </a>
              </div>
            </div>
            <h1 className="title">{event.title}</h1>
          </div>
        </header>
        <section>
          <p>{event.description}</p>
        </section>
        <footer>
          <div className="row">
            <div className="col-xs-12">
              <h4 className="title">Miembros</h4>
              <div className="lgx-share"></div>
            </div>
          </div>
        </footer>
      </article>
    </PageFullWidthWrapper>
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
