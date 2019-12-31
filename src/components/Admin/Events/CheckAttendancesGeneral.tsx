import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
// import QRCode from "qrcode.react";
import { QRCode } from 'react-qr-svg';
import { getCurrentUser } from "../../../services/authService";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { EventToReportAttendance } from "../../../services/models/Events/EventToReportAttendance";
import { getCheckAttendanceGeneral } from "../../../services/eventsServices";
import { PageCenterWrapper } from "../../Common/PageCenterWrapper";
import { CardWrapper } from '../../Common/CardWrapper';

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

      <CardWrapper cardTitle="Contanos si Viniste">
        {event.eventDetail &&
          <div className="row">
            <div className="col-md-2"></div>

            <div className="col-md-8">
              < h3 > {event.eventDetail.title}</h3>
              <img
                className="img-report-assitance"
                src={event.eventDetail.imageUrl}
                alt="New"
              ></img>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="qr-container-attendance-general">
                <p>{loaded &&
                  <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    style={{ maxHeight: "500px" }}
                    level="Q"
                    value={qr}
                  />
                }</p>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        }
      </CardWrapper >

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
