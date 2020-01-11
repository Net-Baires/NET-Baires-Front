import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams, useHistory } from "react-router-dom";
import { getSpeaker } from "../../services/speakersServices";
import { Speaker } from "../../services/models/speaker";
import ReactHtmlParser from 'react-html-parser';
import { GetBadgeResponse } from '../../services/models/BadgeDetail';
import { getBdgesFromMeber } from '../../services/membersServices';
import { BadgesListGridPublic } from '../Badges/BadgesListGridPublic';
import { isEmpty } from '../../services/objectsservices';
type SpeakerProps = {
  name: string;
};
type SpeakerParams = {
  id: number;
};

type SpeakerPropsAndRouter = SpeakerParams & SpeakerProps;
const SpeakerDetail: React.SFC<
  RouteComponentProps<SpeakerPropsAndRouter>
> = () => {
  const history = useHistory();
  const { id } = useParams();
  const [speakerDetail, setSpeaker] = useState<Speaker>({} as Speaker);
  const [badges, setBadges] = useState<GetBadgeResponse[]>(new Array<GetBadgeResponse>());
  useEffect(() => {
    getSpeaker(Number(id)).then(s => setSpeaker(s));
    getBdgesFromMeber(Number(id)).then(s => setBadges(s));
  }, []);
  return (<>
    <div className="services-section text-center" >
      <div className="container">
        <div className="row  justify-content-md-center">
          <div className="col-md-12">
            <div className="services-content">
              <h1 className="wow fadeInUp" data-wow-delay="0s">
                {speakerDetail.firstName} {speakerDetail.lastName}
              </h1>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <div className="services">
              <div className="row">
                <div className="col-md-12 badge-detail-img">
                  <img src={speakerDetail.picture} alt="New" />
                </div>
                <div className="col-md-12">
                  <p>{ReactHtmlParser(speakerDetail.biography)}</p>
                </div>
                {!isEmpty(badges) && <>

                  <div className="col-md-12">
                    <div className="services-content">
                      <h1 className="wow fadeInUp" data-wow-delay="0s">
                        Badges recibidos por el usuario
                    </h1>
                    </div>
                  </div>
                  <div className="col-md-12 row">
                    <BadgesListGridPublic callbackClick={b => history.push(`/badges/${b.id}`)} badges={badges}></BadgesListGridPublic>
                  </div>
                  <div className="col-md-12">
                    <div className="services-content">
                      <h1 className="wow fadeInUp" data-wow-delay="0s">
                        Eventos en los que participo como Ordaor
                    </h1>
                    </div>
                  </div>
                </>}
                {!isEmpty(speakerDetail) &&
                  <>
                    <div className="col-md-12">
                      <div className="services-content">
                        <h1 className="wow fadeInUp" data-wow-delay="0s">
                          Eventos como Orador
                    </h1>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        {speakerDetail.events.map(event => (
                          <div key={event!.id} className="col-sm-4 ">
                            <div
                              className="table-left wow fadeInUp"
                              data-wow-delay="0.4s"
                            >
                              <div className="icon icon-live-list-image-container">
                                <img
                                  className="icon-live-list-image"
                                  src={
                                    event!.imageUrl != null
                                      ? event!.imageUrl
                                      : "/assets/images/imagenotfound.png"
                                  }
                                  alt="Icon"
                                />
                              </div>
                              <div className="pricing-details">
                                <h2 className="event-live-list-title">{event!.title}</h2>
                                <div className="row">
                                  <div className="col-sm-12">
                                    {/* <button
                                      type="button"
                                      // onClick={e => handleInfoEvent(e, event.event!)}
                                      className="btn btn-success  btn-action btn-fill btn-event-live"
                                    >
                                      Detalle
                                    </button> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>))}
                      </div>
                    </div>
                  </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
export default SpeakerDetail;
