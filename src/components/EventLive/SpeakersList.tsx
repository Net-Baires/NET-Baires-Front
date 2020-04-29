import React, { useEffect, useState } from "react";
import { CardWrapper } from "../Common/CardWrapper";
import { getSpeakersFromEvent } from "../../services/eventsServices";
import { Member } from "../../services/models/Member";
import { isEmpty } from "../../services/objectsservices";
type NewUserProps = {
  eventId: number;
};
export const SpeakersList: React.SFC<NewUserProps> = ({ eventId }) => {
  const [speakers, setSpeakers] = useState([] as Member[]);
  useEffect(() => {
    getSpeakersFromEvent(eventId).then((x) => {
      setSpeakers(x.map((x) => x.member));
    });
  }, []);
  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {!isEmpty(speakers) &&
              speakers.map((member) => (
                <tr key={member.id} className="unread">
                  <td>
                    <img
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                      src={
                        member.picture != "" && member.picture != null
                          ? member.picture
                          : "assets/images/no-image-profile.png"
                      }
                      alt="activity-user"
                    ></img>
                  </td>
                  <td>
                    <h6 className="mb-1">{member.firstName}</h6>
                    <p className="m-0">{member.lastName}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
