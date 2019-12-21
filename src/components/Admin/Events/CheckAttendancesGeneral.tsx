import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import QRCode from "qrcode.react";
import { getCurrentUser } from "../../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { EventToReportAttendance } from "../../../services/models/Events/EventToReportAttendance";
import { getCheckAttendanceGeneral } from "../../../services/eventsServices";
import { PageCenterWrapper } from "../../Common/PageCenterWrapper";

type CheckAttendancesGeneralProps = {
  loading: () => void;
  ready: () => void;
};
type CheckAttendancesGeneralParams = {
  id: number;
};

type CheckAttendancesGeneralPropsAndRouter = CheckAttendancesGeneralParams &
  CheckAttendancesGeneralProps;
export const CheckAttendancesGeneralComponent: React.SFC<RouteComponentProps<
  CheckAttendancesGeneralPropsAndRouter
> &
  CheckAttendancesGeneralProps> = ({ match, ...props }) => {
  const [qr, setQr] = useState("a");
  const [event, setEvent] = useState({} as EventToReportAttendance);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    props.loading();
    getCheckAttendanceGeneral(match.params.id).then(x => {
      setQr(x.token);
      setEvent(x);
      setLoaded(true);
      props.ready();
    });
  }, []);
  return (
    <>
      <article>
        <header>
          <h1>Contanos si viniste!!!</h1>
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
              <h1 className="title"></h1>
              <h4 className="subtitle"></h4>
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

export const CheckAttendancesGeneral = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckAttendancesGeneralComponent);
