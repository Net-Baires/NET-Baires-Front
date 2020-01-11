import React, { useEffect, useState, useContext } from "react";
import { useHistory, RouteComponentProps, Route } from "react-router";
import { getEventToReportAttendance } from "../../services/eventsServices";
import { getCurrentUser } from "../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { EventToReportAttendance } from "../../services/models/Events/EventToReportAttendance";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { CardWrapper } from "../Common/CardWrapper";
import { QRCode } from "react-qr-svg";
import { isEmpty } from "../../services/objectsservices";
import { UserContext } from '../../contexts/UserContext';
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
    const { memberDetail } = useContext(UserContext);
    return (
      <CardWrapper cardTitle="Reportar mi Asistencia">
        {!isEmpty(event) && (
          <div className="center-content">
            <img
              className="img-report-assitance"
              src={
                event.eventDetail.imageUrl != null
                  ? event.eventDetail.imageUrl
                  : "/assets/images/imagenotfound.png"
              }
              alt="New"
            ></img>
            <div className="text-area">
              <div className="speaker-info">
                <h1 className="title">
                  {memberDetail.firstName} {memberDetail.lastName}
                </h1>
                <h4 className="subtitle">Bienvenido {memberDetail.email}</h4>
              </div>
            </div>
            <div className="text-area">
              <div className="speaker-info">
                <h1 className="title">
                  {memberDetail.firstName} {memberDetail.lastName}
                </h1>
                <h3 className="subtitle">Lee mi código por favor.</h3>
              </div>
            </div>
            <div className="qr-container">
              <p>
                {loaded && (
                  <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 256 }}
                    value={qr}
                  />
                )}
              </p>
              <footer>
                {/* Someone famous in <cite title="Source Title">Source Title</cite> */}
              </footer>
            </div>
          </div>
        )}
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

export const ReportAttendance = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportAttendanceComponent);
