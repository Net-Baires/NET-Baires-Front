import React from "react";
import { isEmpty } from "../../../services/objectsservices";
import { Member } from '../../../services/models/Member';
import { MemberCard } from '../../Common/MemberCard';
import { useHistory } from 'react-router';

type HomeSpeakersProps = {
  speakers: Member[];
};
const HomeSpeakers: React.SFC<HomeSpeakersProps> = ({ speakers }) => {
  const history = useHistory();
  const navigateToSpeaker = (memberId: number) => {
    history.push(`/members/${memberId}/profile`)
  }
  return (
    <>
      {!isEmpty(speakers) && (
        <div className="services-section text-center" id="speakers">
          <div className="container">
            <div className="row  justify-content-md-center">
              <div className="col-md-8">
                <div className="services-content">
                  <h1 className="wow fadeInUp" data-wow-delay="0s">
                    Algunos de nuestros speakers
                </h1>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    Gracias a ellos y a todos los demas por hacer posible esta comunidad!!
                </p>
                </div>
              </div>
              <div className="col-md-12 text-center">
                <div className="services">
                  <div className="row">
                    {speakers.map(speaker => (
                      <MemberCard key={speaker.id} navigationHandler={navigateToSpeaker} member={speaker}></MemberCard>
                    ))}
                  </div>
                  <div className="section-btn-area">
                    {/* <NavLink
                      className="btn btn-primary btn-action"
                      data-wow-delay="0.2s"
                      href="#!"
                      to="/JoinSlack"
                    >
                      Mas Speakers
                   </NavLink> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeSpeakers;
