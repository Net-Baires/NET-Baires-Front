import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { getSponsors } from "../../../../services/sponsorsServices";
import {
  EventDetail,
  SponsorEvent
} from "../../../../services/models/Events/Event";
import { connect } from "react-redux";
import { loading, ready } from "../../../../store/loading/actions";
import { EventsAttendees, Sponsor } from "../../../../services/models/sponsor";
type SponsorsListToEditProps = {
  eventInEdition: EventDetail;
  updateSponsors: (spopnsors: SponsorEvent[]) => void;
  loading: () => void;
  ready: () => void;
};

const SponsorsListToEditComponent: React.SFC<SponsorsListToEditProps> = ({
  eventInEdition,
  updateSponsors
}) => {
  const [] = useState({} as EventDetail);
  const [sponsors, setSponsors] = useState(new Array<SponsorToEvent>());
  const [] = useState(new Array<EventsAttendees>());

  useEffect(() => {
    getSponsors().then(sponsors => {
      setSponsors(
        sponsors.map(x => {
          var colaboration = eventInEdition.sponsors.find(
            s => s.sponsorId == x.id
          );
          return new SponsorToEvent(
            x,
            colaboration != null,
            colaboration ? colaboration.detail : ""
          );
        })
      );
    });
  }, []);

  const handleSponsorColaborate = (
    eventInput: MouseEvent<HTMLButtonElement>,
    sponsor: SponsorToEvent,
    collaborated: boolean
  ) => {
    eventInput.preventDefault();
    const updateIndex = sponsors.indexOf(sponsor);
    const usersToUpdate = sponsors.slice();
    usersToUpdate[updateIndex].collaborated = collaborated;

    updateSponsors(
      usersToUpdate.reduce((acc, item) => {
        if (item.collaborated) {
          acc.push({
            sponsorId: item.sponsor.id,
            detail: item.collaboratedDetail
          });
        }
        return acc;
      }, new Array<SponsorEvent>())
    );
    setSponsors(usersToUpdate);
  };
  const handleOnChangeDescription = (
    eventInput: ChangeEvent<HTMLTextAreaElement>,
    sponsor: SponsorToEvent
  ) => {
    eventInput.preventDefault();
    const updateIndex = sponsors.indexOf(sponsor);
    const usersToUpdate = sponsors.slice();
    usersToUpdate[updateIndex].collaboratedDetail = eventInput.target.value;

    updateSponsors(
      usersToUpdate.reduce((acc, item) => {
        if (item.collaborated) {
          acc.push({
            sponsorId: item.sponsor.id,
            detail: item.collaboratedDetail
          });
        }
        return acc;
      }, new Array<SponsorEvent>())
    );
    setSponsors(usersToUpdate);
  };
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
              <tr key={sponsor.sponsor.id}>
                <th scope="row">{sponsor.sponsor.id}</th>
                <td>{sponsor.sponsor.name}</td>
                <td>
                  <img
                    className="sponsors-list-img"
                    src={sponsor.sponsor.logoUrl}
                  ></img>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    disabled={!sponsor.collaborated}
                    value={sponsor.collaboratedDetail}
                    onChange={e => handleOnChangeDescription(e, sponsor)}
                    rows={4}
                  ></textarea>
                </td>
                <td className="button-action">
                  {sponsor.collaborated ? (
                    <button
                      onClick={e => handleSponsorColaborate(e, sponsor, false)}
                      type="button"
                      className="btn btn-success"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                  ) : (
                    <button
                      onClick={e => handleSponsorColaborate(e, sponsor, true)}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
class SponsorToEvent {
  constructor(
    public sponsor: Sponsor,
    public collaborated: boolean,
    public collaboratedDetail: string = ""
  ) {}
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
