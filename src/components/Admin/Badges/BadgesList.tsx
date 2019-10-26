import React, { useState, useEffect, MouseEvent } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Checkbox from "react-simple-checkbox";
import { connect } from "react-redux";
import { loading, ready } from "../../../store/loading/actions";
import { PageFullWidthWrapper } from "../../Common/PageFullWidthWrapper";
import { SearchWrapper } from "../../Common/SearchWrapper";
import { getBadges } from "../../../services/badgesServices";
import { GetBadgeResponse } from "../../../services/models/BadgeDetail";

type BadgesListProps = {
  loading: () => void;
  ready: () => void;
};
const BadgesListComponent: React.SFC<BadgesListProps> = ({
  loading,
  ready
}) => {
  const [badge, setbadge] = useState(new Array<GetBadgeResponse>());
  const history = useHistory();
  useEffect(() => {
    loading();
    getBadges().then(badge => {
      setbadge(badge);
      ready();
    });
  }, []);
  const { SearchBar } = Search;

  const updateBadge = (
    user: GetBadgeResponse,
    badge: Array<GetBadgeResponse>
  ) => {
    // loading();
    // updateBadge(user.id, user).then(() => {
    //   setbadge(badge);
    //   ready();
    // });
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
      dataField: "badgeImageUrl",
      text: "Badge",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, badge: GetBadgeResponse) => (
        <img
          className="img-preview-badge-assign"
          src={badge.badgeImageUrl}
        ></img>
      )
    },
    {
      text: "Acción",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, badge: GetBadgeResponse) => (
        <NavLink
          className="btn btn-primary"
          activeClassName="active"
          to={`/admin/badges/${badge.id}/edit`}
        >
          Editar
        </NavLink>
      )
    }
  ];
  const handleDelete = (
    event: MouseEvent<HTMLButtonElement>,
    user: GetBadgeResponse
  ) => {
    event.preventDefault();
  };
  const handleEdit = (
    event: MouseEvent<HTMLButtonElement>,
    user: GetBadgeResponse
  ) => {
    event.preventDefault();
    history.push(`/admin/badge/${user.id}/Edit`);
  };

  return (
    <PageFullWidthWrapper classWrapper="lgx-page-wrapper">
      {badge && (
        <SearchWrapper title="Usuarios">
          <ToolkitProvider keyField="id" data={badge} columns={columns} search>
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
      )}
      <NavLink
        className="btn btn-success"
        activeClassName="active"
        to="/admin/badges/new"
      >
        Nuevo Badge
      </NavLink>
    </PageFullWidthWrapper>
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

export const BadgesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgesListComponent);