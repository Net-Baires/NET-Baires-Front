import React, { useEffect, useState } from "react";
import { getEventsLive } from "../../services/eventsServices";
import { isEmpty } from "../../services/objectsservices";
import { EventDetail } from "../../services/models/Events/Event";
import { NavLink } from "react-router-dom";
import { EventActions } from "../Admin/AdminControlPanel/EventActions";
import ControlPanelEventsLive from '../EventLive/ControlPanelEventsLive';
import { subscribe, UpdateEventLive, CommunicationMessageType } from '../../services/communicationServices';

type MemberControlPanelProps = {};
const MemberControlPanel: React.SFC<MemberControlPanelProps> = () => {
  const [eventsLive, setEventsLive] = useState(new Array<EventDetail>());
  useEffect(() => {
    getEventsLive().then(e => {
      setEventsLive(e);
    });
    subscribe<UpdateEventLive>(CommunicationMessageType.UpdateEventLive, (data) => {
      getEventsLive().then(e => {
        setEventsLive(e);
      });
    });
  }, []);
  return (
    <>
      {!isEmpty(eventsLive) && (
        <>

          <div className="col-sm-12">
            <div className="alert alert-primary" role="alert">
              <p>
                Estos son los eventos que se encuentran ocurriendo en este
                momento.
              </p>
              <label className="text-muted">
                Copy/paste source code in your page in just couples of seconds.
              </label>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Eventos en Vivo</h5>
              </div>
            </div>
          </div>
          <div className="row">
            <ControlPanelEventsLive eventsDetail={eventsLive}></ControlPanelEventsLive>
          </div>
          <div className="row">

            <div className="col-md-6 col-xl-4">
              <div className="card card-social">
                <div className="card-block border-bottom">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-auto">
                      <i className="fab fa-twitter text-c-blue f-36"></i>
                    </div>
                    <div className="col text-right">
                      <h3>8</h3>
                      <h5 className="text-c-purple mb-0">68.2% <span className="text-muted">Eventos Registrados</span></h5>
                    </div>
                  </div>
                </div>
                <div className="card-block">
                  <div className="row align-items-center justify-content-center card-active">
                    <div className="col-6">
                      <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Presente : </span>5</h6>
                      <div className="progress">
                        <div className="progress-bar progress-c-green" role="progressbar" style={{ width: "50%", height: "6px;" }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Ausente :</span>3</h6>
                      <div className="progress">
                        <div className="progress-bar progress-c-blue" role="progressbar" style={{ width: "30%", height: "6px;" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      )
      }
    </>
  );
};
export default MemberControlPanel;
