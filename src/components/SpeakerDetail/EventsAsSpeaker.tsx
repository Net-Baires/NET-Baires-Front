import React, { useState, useEffect } from "react";
import { getSpeaker } from "../../services/speakersServices";
import { Speaker } from "../../services/models/speaker";
import { isEmpty } from '../../services/objectsservices';
type EventsAsSpeakerProps = {
  memberId: number;
};

export const EventsAsSpeaker: React.SFC<EventsAsSpeakerProps> = ({ memberId }) => {
  const [speakerDetail, setSpeaker] = useState<Speaker>({} as Speaker);
  useEffect(() => {
    getSpeaker(Number(memberId)).then(s => setSpeaker(s));
  }, []);
  return (<>
    {!isEmpty(speakerDetail) &&
      <div className="services-section text-center" id="nuestrosOrganizadores">
        <div className="container">
          <div className="row  justify-content-md-center">
            <div className="col-md-8">
              <div className="services-content">
                <h1 className="wow fadeInUp" data-wow-delay="0s">
                  Eventos como Speaker
       </h1>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Estos son los badges que recibí por mis participación en eventos y mis contribuciones a la comunidad
       </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                {speakerDetail.events.map(event => (

                  <div className="card  card-badge-container  col-sm-3" style={{ width: "18rem;" }}>
                    <div className="card-badge-img">

                      <img
                        src={
                          event!.imageUrl != null
                            ? event!.imageUrl
                            : "/assets/images/imagenotfound.png"
                        }
                        className="icon-live-list-image" alt="..."></img>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      {/* <p className="card-text">{badge.description}</p> */}
                      <div className="card-badge-link-container">
                        <button
                          disabled={true}
                          type="button" className="btn btn-primary  btn-action btn-fill btn-event-live">   Detalle</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    }</>
  );
};
