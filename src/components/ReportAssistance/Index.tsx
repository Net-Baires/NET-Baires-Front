import React, { useEffect, useState } from "react";
import { useHistory, RouteComponentProps, Route } from "react-router";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";
import { getEventToReportAssitance } from "../../services/eventsServices";
import { getCurrentUser } from "../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { EventToReportAssistance } from "../../services/models/Events/EventDetailToSync";

type ReportAssistanceProps = {
  loading: () => void;
  ready: () => void;
};
type ReportAssistanceParams = {
  id: number;
};

type ReportAssistancePropsAndRouter = ReportAssistanceParams &
  ReportAssistanceProps;
export const ReportAssistanceComponent: React.SFC<
  RouteComponentProps<ReportAssistancePropsAndRouter> & ReportAssistanceProps
> = ({ match, ...props }) => {
  const history = useHistory();
  const [qr, setQr] = useState("a");
  const [event, setEvent] = useState({} as EventToReportAssistance);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    props.loading();
    getEventToReportAssitance(match.params.id).then(x => {
      setQr(x.token);
      setEvent(x);
      setLoaded(true);
      props.ready();
    });
  }, []);
  const user = getCurrentUser();
  return (
    <>
      <article>
        <header>
          <h1>Reportar Asistencia</h1>
          <h2> {event.title}</h2>
        </header>
        <header>
          <figure>
            <img
              className="img-report-assitance"
              src={event.imageUrl}
              alt="New"
            ></img>
          </figure>
          <div className="text-area">
            <div className="speaker-info">
              <h1 className="title">
                {user.firstName} {user.lastName}
              </h1>
              <h4 className="subtitle">{user.email}</h4>
            </div>
          </div>
        </header>
        <section>
          <div className="qr-container">
            <p>{loaded && <QRCode className="qrcore-wrapper" value={qr} />}</p>
            <footer>
              {/* Someone famous in <cite title="Source Title">Source Title</cite> */}
            </footer>
          </div>
        </section>
        {/* <section>
          <p> </p>
        </section> */}
      </article>
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

export const ReportAssistance = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportAssistanceComponent);
