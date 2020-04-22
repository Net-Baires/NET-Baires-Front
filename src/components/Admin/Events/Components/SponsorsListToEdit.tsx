import React, { useState, useEffect, ChangeEvent } from "react";
import { getSponsors } from "../../../../services/sponsorsServices";
import {
  EventDetail,
  SponsorEvent,
} from "../../../../services/models/Events/Event";
import { connect } from "react-redux";
import { loading, ready } from "../../../../store/loading/actions";
import { Sponsor } from "../../../../services/models/sponsor";
import { EventsAttendees } from "../../../../services/models/EventsAttendees";
import { SearchWrapper } from "../../../Common/SearchWrapper";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import paginationFactory from "react-bootstrap-table2-paginator";

type SponsorsListToEditProps = {
  eventInEdition: EventDetail;
  updateSponsors: (spopnsors: SponsorEvent[]) => void;
  loading: () => void;
  ready: () => void;
};

const SponsorsListToEditComponent: React.SFC<SponsorsListToEditProps> = ({
  eventInEdition,
  updateSponsors,
}) => {
  const [] = useState({} as EventDetail);
  const [sponsors, setSponsors] = useState(new Array<SponsorToEvent>());
  const [] = useState(new Array<EventsAttendees>());
  const { SearchBar } = Search;

  useEffect(() => {
    getSponsors().then((sponsors) => {
      var spon = sponsors.map((x) => {
        var colaboration = null;
        if (eventInEdition.sponsors != null)
          colaboration = eventInEdition.sponsors.find(
            (s) => s.sponsorId == x.id
          );
        return new SponsorToEvent(
          x,
          colaboration != null,
          colaboration ? colaboration.detail : ""
        );
      });
      setSponsors(spon);
    });
  }, []);

  const handleSponsorColaborate = (
    eventInput: ChangeEvent<HTMLInputElement>,
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
            detail: item.collaboratedDetail,
          });
        }
        return acc;
      }, new Array<SponsorEvent>())
    );
    setSponsors(usersToUpdate);
  };
  const columns = [
    // {
    //   dataField: "sponsor.id",
    //   text: "Id"
    // },
    {
      dataField: "sponsor.name",
      text: "Empresa",
    },
    {
      dataField: "logoUrl",
      text: "Logo",
      style: {
        textAlign: "center",
        height: "2px",
      },
      formatter: (_cellContent: any, sponsor: SponsorToEvent) => (
        <img className="sponsors-list-img" src={sponsor.sponsor.logoUrl}></img>
      ),
    },
    // {
    //   dataField: "collaboratedDetail",
    //   text: "Colaboró con",
    //   style: {
    //     textAlign: "center",
    //     height: "2px"
    //   },
    //   formatter: (_cellContent: any, sponsor: SponsorToEvent) => (
    //     <textarea
    //       className="form-control"
    //       value={sponsor.collaboratedDetail}
    //       onChange={e => handleOnChangeDescription(e, sponsor)}
    //       rows={4}
    //     ></textarea>
    //   )
    // },
    {
      dataField: "collaborated",
      text: "Colaboró con",
      style: {
        textAlign: "center",
        height: "2px",
      },
      formatter: (_cellContent: any, sponsor: SponsorToEvent) => (
        <div className="button-action">
          <FormControlLabel
            control={
              <Switch
                checked={sponsor.collaborated}
                onChange={(e) =>
                  handleSponsorColaborate(e, sponsor, !sponsor.collaborated)
                }
              />
            }
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {sponsors && (
        <>
          <h2>Sponsors</h2>
          <SearchWrapper title="Usuarios">
            <ToolkitProvider
              keyField="id"
              data={sponsors}
              columns={columns}
              search
            >
              {(props: any) => (
                <div>
                  <SearchBar {...props.searchProps} />
                  <hr />
                  <BootstrapTable
                    keyField="id"
                    {...props.baseProps}
                    pagination={paginationFactory()}
                  />
                </div>
              )}
            </ToolkitProvider>
          </SearchWrapper>
        </>
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
  },
});

export const SponsorsListToEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorsListToEditComponent);
