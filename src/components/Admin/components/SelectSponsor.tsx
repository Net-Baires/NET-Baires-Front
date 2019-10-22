import React, { useState, useEffect } from "react";
import { Sponsor } from "../../../services/models/sponsor";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
type SelectSponsorProps = {
  sponsors: Sponsor[];
  selectSponsor: (ids: number[]) => void;
};

export const SelectSponsor: React.SFC<SelectSponsorProps> = ({
  selectSponsor,
  ...props
}) => {
  const [sponsors] = useState(props.sponsors);
  const [sponsorsSelected, setSponsorsSelected] = useState(new Array<number>());
  const { SearchBar } = Search;

  const columns = [
    {
      dataField: "title",
      text: "Nombre"
    },
    {
      dataField: "picture",
      text: "Logo",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (cellContent: any) => (
        <img className="sponsors-list-img" src={cellContent}></img>
      )
    }
  ];
  const handleOnSelect = (row: any, isSelect: any) => {
    let ids = new Array<number>();
    if (isSelect) {
      ids = [...sponsorsSelected, row.id];
      setSponsorsSelected(ids);
    } else {
      ids = sponsorsSelected.filter(x => x !== row.id);
      setSponsorsSelected(ids);
    }
    selectSponsor(ids);
  };

  const handleOnSelectAll = (isSelect: any, rows: any) => {
    let ids: number[] = rows.map((r: any) => r.id);
    if (isSelect) {
      setSponsorsSelected(ids);
    } else {
      setSponsorsSelected([]);
      ids = [];
    }
    selectSponsor(ids);
  };
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: (row: any, rowIndex: number) =>
      rowIndex > 1 ? "#00BFFF" : "#00FFFF",
    selected: sponsorsSelected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  };
  return (
    <>
      {sponsors && (
        <div className="card border-primary mb-3">
          <div className="card-header">Sponsors que nos apoyaron</div>
          <div className="card-body">
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
                    {...props.baseProps}
                    pagination={paginationFactory()}
                    selectRow={selectRow}
                  />
                </div>
              )}
            </ToolkitProvider>
          </div>
        </div>
      )}
    </>
  );
};
