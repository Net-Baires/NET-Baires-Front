import React, { useEffect, useState } from "react";
import { useHistory, RouteComponentProps, Route } from "react-router";
import QRCode from "qrcode.react";
import { getEventToReportAttendance } from "../../services/eventsServices";
import { getCurrentUser } from "../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { EventToReportAttendance } from "../../services/models/Events/EventToReportAttendance";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";

type ReportAttendanceProps = {
  loading: () => void;
  ready: () => void;
};
type ReportAttendanceParams = {
  id: number;
};

type ReportAttendancePropsAndRouter = ReportAttendanceParams &
  ReportAttendanceProps;
export const ReportAttendanceComponent: React.SFC<RouteComponentProps<
  ReportAttendancePropsAndRouter
> &
  ReportAttendanceProps> = ({ match, ...props }) => {
  const history = useHistory();
  const [qr, setQr] = useState("a");
  const [event, setEvent] = useState({} as EventToReportAttendance);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    props.loading();
    getEventToReportAttendance(match.params.id).then(x => {
      setQr(x.token);
      setEvent(x);
      setLoaded(true);
      props.ready();
    });
  }, []);
  const user = getCurrentUser();
  return (
    <PageFullWidthWrapper classWrapper="lgx-post-wrapper">
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
              <h4 className="subtitle">Bienvenido {user.email}</h4>
            </div>
          </div>
        </header>
        {/* <section>
          <p>{event.description}</p>
        </section> */}
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

export const ReportAttendance = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportAttendanceComponent);
