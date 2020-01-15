import React from "react";
import { Member } from "../../../services/models/Member";
import { isEmpty } from "../../../services/objectsservices";
import { MemberCard } from '../../Common/MemberCard';
import { useHistory } from 'react-router-dom';
type HomeOrganizersProps = {
  organizers: Member[];
};
const HomeOrganizers: React.SFC<HomeOrganizersProps> = ({ organizers }) => {
  const history = useHistory();
  const navigateToOrganizerDetail = (memberId: number) => {
    history.push(`/members/${memberId}/profile`)
  }
  return (
    <>
      {!isEmpty(organizers) && (
        <div className="services-section text-center" id="nuestrosOrganizadores">
          <div className="container">
            <div className="row  justify-content-md-center">
              <div className="col-md-8">
                <div className="services-content">
                  <h1 className="wow fadeInUp" data-wow-delay="0s">
                    Nuestros Organizadores
                 </h1>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    Estos son los miembros de nuestra comunidad que hacen posible todos y cada uno de nuestros eventos.
                 </p>
                </div>
              </div>
              <div className="col-md-12 text-center">
                <div className="services">
                  <div className="row">
                    {organizers.map(organizer => <MemberCard key={organizer.id} navigationHandler={navigateToOrganizerDetail} member={organizer}></MemberCard>)}
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

export default HomeOrganizers;
