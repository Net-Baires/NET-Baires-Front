import React, { useState, useEffect } from "react";
import { getSponsors } from "../../../../services/sponsorsServices";
import { EventDetail } from "../../../../services/models/Events/Event";
import { connect } from "react-redux";
import { loading, ready } from "../../../../store/loading/actions";
import { EventsAttendees } from "../../../../services/models/sponsor";
type SponsorsListToEditProps = {
  eventInEdition: EventDetail;
  loading: () => void;
  ready: () => void;
};

const SponsorsListToEditComponent: React.SFC<SponsorsListToEditProps> = () => {
  const [] = useState({} as EventDetail);
  const [sponsors, setSponsors] = useState(new Array<SponsorToEvent>());
  const [] = useState(new Array<EventsAttendees>());

  useEffect(() => {
    getSponsors().then(sponsors => {});
  }, []);

  return (
    <>
      <h2>Sponsors</h2>
      {sponsors && (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Logo</th>
              <th scope="col">Colaboró con</th>
              <th scope="col">Colaboró</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map(sponsor => (
              <tr key={sponsor.id}>
                <th scope="row">{sponsor.id}</th>
                <td>{sponsor.title}</td>
                <td>
                  <img
                    className="sponsors-list-img"
                    src={sponsor.picture}
                  ></img>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    value={sponsor.description}
                    rows={4}
                  ></textarea>
                </td>

                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
class SponsorToEvent {
  id: number = 0;
  title: string = "";
  picture: string = "";
  description: string = "";
  colaboratedWith: string = "";
  colaborated: boolean = false;
  constructor() {}
}
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const SponsorsListToEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorsListToEditComponent);
