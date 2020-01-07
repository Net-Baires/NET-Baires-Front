import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { getSpeaker } from "../../services/speakersServices";
import { Speaker } from "../../services/models/speaker";

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
  const { id } = useParams();
  const [speakerDetail, setSpeaker] = useState<Speaker>({} as Speaker);
  useEffect(() => {
    getSpeaker(Number(id)).then(s => setSpeaker(s));
  }, []);
  return (
    <div className="services-section text-center" >
      <div className="container">
        <div className="row  justify-content-md-center">
          <div className="col-md-8">
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
                  {/* <p>{badge.description}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
export default SpeakerDetail;
