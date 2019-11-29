import React, { useState, useEffect, MouseEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getSponsors } from "../../../services/sponsorsServices";
import { PageFullWidthWrapper } from "../../../components/Common/PageFullWidthWrapper";
import { Sponsor } from "../../../services/models/sponsor";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { SearchWrapper } from "../../Common/SearchWrapper";
export const SponsorsList: React.SFC<RouteComponentProps> = () => {
  let history = useHistory();

  const [sponsors, setSponsor] = useState(new Array<Sponsor>());
  const { SearchBar } = Search;
  useEffect(() => {
    getSponsors().then(s => setSponsor(s));
  }, []);

  const handleEdit = (
    event: MouseEvent<HTMLButtonElement>,
    sponsor: Sponsor
  ) => {
    event.preventDefault();
    history.push(`/admin/sponsors/${sponsor.id}/edit`);
  };
  const handleNew = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    history.push(`/admin/sponsors/new`);
  };
  const columns = [
    {
      dataField: "id",
      text: "Id"
    },
    {
      dataField: "name",
      text: "Nombre"
    },
    {
      dataField: "description",
      text: "Descripción"
    },
    {
      dataField: "siteUrl",
      text: "Sitio"
    },
    {
      dataField: "Logo",
      text: "Logo",
      formatter: (_cellContent: any, sponsor: Sponsor) => (
        <img className="sponsors-list-img" src={sponsor.logoUrl}></img>
      )
    },

    {
      text: "Acción",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, sponsor: Sponsor) => (
        <button
          type="button"
          onClick={e => handleEdit(e, sponsor)}
          className="btn btn-primary"
        >
          Edit
        </button>
      )
    }
  ];
  return (
    <>
      <SearchWrapper title="Sponsors">
        <ToolkitProvider keyField="id" data={sponsors} columns={columns} search>
          {(props: any) => (
            <div>
              <SearchBar {...props.searchProps} />
              <hr />
              <BootstrapTable
                class="table-responsive"
                keyField="id"
                {...props.baseProps}
                pagination={paginationFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      </SearchWrapper>
      <button type="button" onClick={handleNew} className="btn btn-primary">
        Nuevo Sponsor
      </button>
    </>
  );
};
