import React from "react";
import { MemberDetail } from "../../services/models/Events/EventLiveDetail";
import { CardWrapper } from "../Common/CardWrapper";
import {
  formatStringDate,
  formatStringTime
} from "../../helpers/DateHelpers";
type NewUserProps = {
  members: MemberDetail[];
};
export const LastUsersAttended: React.SFC<NewUserProps> = ({ members }) => {
  return (
    <>
      <CardWrapper colSize={8} cardTitle="Ultimos Usuarios Recibidos">
        <div className="table-responsive">
          <table className="table table-hover">
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="unread">
                  <td>
                    <img
                      className="rounded-circle"
                      style={{ width: "40px" }}
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
                    <p className="m-0">{member.username}</p>
                  </td>
                  <td>
                    <h6 className="text-muted">
                      <i className="fas fa-circle text-c-green f-10 m-r-15"></i>
                      {formatStringDate(member.attendedTime)} -{" "}
                      {formatStringTime(member.attendedTime)}
                    </h6>
                  </td>
                  <td>
                    <a href="#!" className="label theme-bg2 text-white f-12">
                      Reject
                    </a>
                    <a href="#!" className="label theme-bg text-white f-12">
                      Approve
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardWrapper>
    </>
  );
};
