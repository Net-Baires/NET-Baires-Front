import React from "react";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { Member } from "../../services/models/Member";

type UsersListToShowProps = {
  members: Array<Member>;
};

export const UsersListToShow: React.SFC<UsersListToShowProps> = ({
  members
}) => (
  <PageFullWidthWrapper>
    {members &&
      members.map(member => (
        <div className="col-xs-12 col-sm-6 col-md-4">
          <div className="lgx-single-speaker">
            <figure>
              <a className="profile-img" href="speakers.html">
                <img src={member.picture} alt="Speaker" />
              </a>
              <figcaption>
                <div className="social-group">
                  <a className="sp-tw" href={member.twitter}>
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a className="sp-fb" href={member.github}>
                    <i className="fa fa-github"></i>
                  </a>
                  <a className="sp-insta" href={member.instagram}>
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a className="sp-in" href={member.linkedin}>
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
                <div className="speaker-info">
                  <h3 className="title">
                    <a href="speaker.html">
                      {member.firstName} {member.lastName}
                    </a>
                  </h3>
                  <h4 className="subtitle">Ceo of LogicHunt</h4>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      ))}
  </PageFullWidthWrapper>
);
