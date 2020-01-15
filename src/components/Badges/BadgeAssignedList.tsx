import React, { } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from '../../store/loading/actions';
import { CardWrapper } from '../Common/CardWrapper';
import { formatStringDateTime, formatStringDate } from '../../helpers/DateHelpers';
import { BadgeMemberViewModel } from '../../services/models/BadgeDetail';
import { isEmpty } from '../../services/objectsservices';
type BadgeAssignedListProps = {
  loading: () => void;
  ready: () => void;
  badges: BadgeMemberViewModel[];
};

const BadgeAssignedListComponent: React.SFC<BadgeAssignedListProps>
  = ({ badges }) => {

    return (
      <>
        {!isEmpty(badges) &&
          <CardWrapper cardBodyClassName="card-body-md" colSize={8} cardTitle="Badges ya entregados">
            <div className="table-responsive" style={{ height: "400px" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="d-none d-sm-block">Id</th>
                    <th>Imagen</th>
                    <th className="d-none d-sm-block">Nombre</th>
                    <th>Entregado</th>
                  </tr>
                </thead>
                <tbody>
                  {badges.map(badge => (
                    <tr key={badge.badge.id} className="unread">
                      <td className="d-none d-sm-block">
                        <h6 className="mb-1">{badge.badge.id}</h6>

                      </td>
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ height: "50px" }}
                          src={
                            badge.badge.imageUrl != "" && badge.badge.imageUrl != null
                              ? badge.badge.imageUrl
                              : "assets/images/no-image-profile.png"
                          }
                          alt="activity-user"
                        ></img>
                      </td>
                      <td className="d-none d-sm-block">
                        <h6 className="mb-1">{badge.badge.name}</h6>
                      </td>
                      <td>
                        <h6 className="mb-1">{formatStringDate(badge.assignmentDate)}</h6>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardWrapper>
        }
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

export const BadgeAssignedList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgeAssignedListComponent);
