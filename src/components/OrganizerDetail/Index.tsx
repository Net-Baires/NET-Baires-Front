import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { getOrganizer } from "../../services/organizersServices";
import ReactHtmlParser from 'react-html-parser';
import { Member } from '../../services/models/Member';

type OrganizerProps = {
  name: string;
};
type OrganizerParams = {
  id: number;
};

type OrganizerPropsAndRouter = OrganizerParams & OrganizerProps;
const OrganizerDetail: React.SFC<
  RouteComponentProps<OrganizerPropsAndRouter>
> = () => {
  const { id } = useParams();
  const [organizer, setOrganizer] = useState<Member>({} as Member);
  useEffect(() => {
    getOrganizer(Number(id)).then(s => setOrganizer(s));
  }, []);
  return (
    <div className="services-section text-center" >
      <div className="container">
        <div className="row  justify-content-md-center">
          <div className="col-md-8">
            <div className="services-content">
              <h1 className="wow fadeInUp" data-wow-delay="0s">
                {organizer.firstName} {organizer.lastName}
              </h1>
            </div>
          </div>
          <div className="col-md-12 text-center">
            <div className="services">
              <div className="row">
                <div className="col-md-12 badge-detail-img">
                  <img src={organizer.picture} alt="New" />
                </div>
                <div className="col-md-12">
                  <p>{ReactHtmlParser(organizer.biography)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrganizerDetail;
