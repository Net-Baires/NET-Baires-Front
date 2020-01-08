import React, { } from "react";
import { connect } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { loading, ready } from '../../store/loading/actions';
import { CardWrapper } from '../Common/CardWrapper';
import { formatStringDateTime } from '../../helpers/DateHelpers';
import { GetBadgeResponse } from '../../services/models/BadgeDetail';
import { isEmpty } from '../../services/objectsservices';
type BadgeAssignedListProps = {
  loading: () => void;
  ready: () => void;
  badges: GetBadgeResponse[];
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
                    <th>Id</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Entregado</th>
                  </tr>
                </thead>
                <tbody>
                  {badges.map(badge => (
                    <tr key={badge.id} className="unread">
                      <td>
                        <h6 className="mb-1">{badge.id}</h6>

                      </td>
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ height: "50px" }}
                          src={
                            badge.imageUrl != "" && badge.imageUrl != null
                              ? badge.imageUrl
                              : "assets/images/no-image-profile.png"
                          }
                          alt="activity-user"
                        ></img>
                      </td>
                      <td>
                        <h6 className="mb-1">{badge.name}</h6>
                      </td>
                      <td>
                        <h6 className="mb-1">{formatStringDateTime(badge.created)}</h6>
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
