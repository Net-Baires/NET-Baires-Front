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
      <CardWrapper colSize={4} cardTitle="Ultimos Usuarios Recibidos">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th className="d-none d-sm-block">Fecha Registro</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
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
                  <td className="d-none d-sm-block">
                    <h6 className="text-muted">
                      <i className="fas fa-circle text-c-green f-10 m-r-15"></i>
                      {formatStringDate(member.attendedTime)} -{" "}
                      {formatStringTime(member.attendedTime)}
                    </h6>
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
