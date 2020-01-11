import React, { MouseEvent } from "react";
import { GetBadgeResponse } from '../../services/models/BadgeDetail';
import { NavLink } from "react-router-dom";
import { NotFound } from "../Common/NotFoun";
import { isEmpty } from "../../services/objectsservices";

type BadgesListPublicProps = {
  badges: Array<GetBadgeResponse>;
  linkText?: string;
  callbackClick: (badge: GetBadgeResponse) => void;
};

export const BadgesListGridPublic: React.SFC<BadgesListPublicProps> = ({
  badges,
  linkText,
  callbackClick
}) => {
  const clickText = (event: MouseEvent<HTMLButtonElement>, badge: GetBadgeResponse) => {
    event.preventDefault();
    callbackClick(badge);
  };
  return (
    <>
      {!isEmpty(badges) && (
        badges.map(badge => (
          <div className="card  card-badge-container  col-sm-3" style={{ width: "18rem;" }}>
            <div className="card-badge-img">
              <img src={badge.imageUrl} className="card-img-top" alt="..."></img>
            </div>
            <div className="card-body">
              <h5 className="card-title">{badge.name}</h5>
              {/* <p className="card-text">{badge.description}</p> */}
              <div className="card-badge-link-container">
                <button
                  onClick={e => clickText(e, badge)} type="button" className="btn btn-success  btn-action btn-fill btn-event-live">   {linkText != null ? linkText : "Detalle"}</button>
              </div>
            </div>
          </div>
        ))
      )
      }
    </>
  );
};