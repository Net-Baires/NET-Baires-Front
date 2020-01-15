import React, { useState, useEffect } from "react";
import { BadgesListGridPublic } from '../Badges/BadgesListGridPublic';
import { isEmpty } from '../../services/objectsservices';
import { useHistory, useParams } from 'react-router-dom';
import { getMemberDetail, getBadgesFromMeber } from '../../services/membersServices';
import { Member } from '../../services/models/Member';
import { BadgeMemberViewModel } from '../../services/models/BadgeDetail';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { loading, ready } from '../../store/loading/actions';
import { EventsAsSpeaker } from '../SpeakerDetail/EventsAsSpeaker';

type PublicProfileProps = {
  urlToShare?: string;
  loading: () => void;
  ready: () => void;
};
const PublicProfileComponent: React.SFC<PublicProfileProps> = ({ loading, ready }) => {
  const history = useHistory();
  const [memberDetail, setMemberDetail] = useState({} as Member);
  const [badges, setBadges] = useState(new Array<BadgeMemberViewModel>());
  const { id } = useParams();
  useEffect(() => {
    loading();
    getMemberDetail(+id!).then(member => {
      setMemberDetail(member);
    })
    getBadgesFromMeber(+id!).then(b => {
      setBadges(b);
      ready();
    }, [])
  }, [])
  return (
    <>
      <>
        <div className="flex-features" style={{ backgroundColor: "#FFFFFF" }} id="features">
          <div className="container">
            <div className="flex-split" style={{ backgroundColor: "#FFFFFF" }}>
              <div className="f-left wow fadeInUp" style={{ backgroundColor: "#FFFFFF" }} data-wow-delay="0s" >
                <div className="left-content" style={{ textAlign: "center" }}>

                  <img className="img-fluid"
                    style={{ maxWidth: "300px", borderRadius: "999px" }}
                    src={
                      memberDetail!.picture != "" && memberDetail!.picture != null
                        ? memberDetail!.picture
                        : "assets/images/no-image-profile.png"
                    } alt=""></img>
                </div>
              </div>
              <div className="f-right wow fadeInUp" style={{ backgroundColor: "#FFFFFF" }} data-wow-delay="0.2s" >
                <div className="right-content">
                  <h2>{memberDetail.firstName} {memberDetail.lastName}</h2>
                  <ul>
                    {memberDetail.workPosition &&
                      <li><i className="ion-android-checkbox-outline"></i><strong className="text-bold">Rol Laboral :</strong> {memberDetail.workPosition}</li>
                    }

                    {memberDetail.github &&
                      <li><i className="ion-android-checkbox-outline"></i><strong className="text-bold">Github :</strong> {memberDetail.github}</li>
                    }
                    {memberDetail.linkedin &&
                      <li><i className="ion-android-checkbox-outline"></i><strong className="text-bold">Linkedin :</strong> {memberDetail.linkedin}</li>
                    }
                    {memberDetail.twitter &&
                      <li><i className="ion-android-checkbox-outline"></i><strong className="text-bold">Twitter :</strong> {memberDetail.twitter}</li>
                    }
                  </ul>
                  {/* <button className="btn btn-primary btn-action btn-fill">Learn More</button> */}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <p>{ReactHtmlParser(memberDetail.biography)}</p>
            </div>
          </div>

        </div>
        {!isEmpty(badges) &&
          <div className="services-section text-center" style={{ backgroundColor: "#f4f7fa" }} id="nuestrosOrganizadores">
            <div className="container">
              <div className="row  justify-content-md-center">
                <div className="col-md-8">
                  <div className="services-content">
                    <h1 className="wow fadeInUp" data-wow-delay="0s">
                      Mis Badges
         </h1>
                    <p className="wow fadeInUp" data-wow-delay="0.2s">
                      Estos son los badges que recibí por mis participación en eventos y mis contribuciones a la comunidad
         </p>
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <div className="services">
                    <div className="row">

                      <BadgesListGridPublic callbackClick={b => history.push(`/members/${id}/badges/${b.id}`)} badges={badges.map(x => x.badge)}></BadgesListGridPublic>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}

        <EventsAsSpeaker memberId={+id!}></EventsAsSpeaker>

      </>
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

export const PublicProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicProfileComponent);
