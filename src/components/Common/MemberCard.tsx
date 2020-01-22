import React, { MouseEvent } from "react";
import { Member } from '../../services/models/Member';
import { NavLink } from 'react-router-dom';

type NotFoundProps = {
  member: Member;
  navigationHandler?: (memberId: number) => void;
};

export const MemberCard: React.SFC<NotFoundProps> = ({ member, navigationHandler }) => {
  const navigationLocalHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (navigationHandler != null)
      navigationHandler(member.id);
  }
  return (
    <div className="col-md-4" style={{ cursor: "pointer" }} >
      <div className="card profile-card-3">
        <div className="background-block" onClick={navigationLocalHandler}>
          <img src="assets/images/user-card-header.jpg" alt={member.firstName} className="background" />
        </div>
        <div onClick={navigationLocalHandler} className="profile-thumb-block">
          <img src={
            member.picture != "" && member.picture != null
              ? member.picture
              : "assets/images/no-image-profile.png"
          } alt="profile-image" className="profile" />
        </div>
        <div className="card-content">

          <h2 onClick={navigationLocalHandler}>
            <a
              style={{ color: "black", cursor: "pointer" }}

            >
              {member.firstName} {member.lastName && member.lastName}<small>{member.workPosition && member.workPosition}   </small>
            </a>
          </h2>
          <div className="icon-block">
            {member.twitter && (
              <a
                className="sp-tw"
                target="_blank"
                href={
                  "https://twitter.com/" + member.twitter
                }
              >
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {member.github && (
              <a
                className="sp-insta"
                target="_blank"
                href={
                  "https://github.com/" + member.github
                }
              >
                <i className="fab fa-github"></i>
              </a>
            )}
            {member.instagram && (
              <a
                className="sp-insta"
                target="_blank"
                href={
                  "https://www.instagram.com/" +
                  member.instagram
                }
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {member.linkedin && (
              <a
                className="sp-in"
                target="_blank"
                href={"linkedin.com/in/" + member.linkedin}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};
