import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { getEventLive } from "../../services/eventsServices";
import { EventDetail } from "../../services/models/Events/Event";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { isEmpty } from "../../services/objectsservices";
import { NotFound } from "../Common/NotFoun";

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
  const history = useHistory();
  const [event, setEvent] = useState({} as EventDetail);
  const [error, setError] = useState(false);
  useEffect(() => {
    loading();
    getEventLive(+match.params.id)
      .then(x => {
        setEvent(x);
        ready();
      })
      .catch(x => {
        history.push("/notfound");
      });
  }, []);

  return (
    <PageFullWidthWrapper classWrapper="lgx-post-wrapper">
      {!error ? (
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
      ) : (
        <NotFound
          title="No hay eventos en LIVE"
          message="En este momento no estamos realizando ningún evento. Te invitamos a visitar nuestro sitio de meetup."
        ></NotFound>
      )}
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
