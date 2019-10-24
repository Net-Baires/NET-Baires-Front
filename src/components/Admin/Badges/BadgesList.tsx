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
import { BadgeDetail } from "../../../services/models/BadgeDetail";

type BadgesListProps = {
  loading: () => void;
  ready: () => void;
};
const BadgesListComponent: React.SFC<BadgesListProps> = ({
  loading,
  ready
}) => {
  const [badge, setbadge] = useState(new Array<BadgeDetail>());
  const history = useHistory();
  useEffect(() => {
    loading();
    getBadges().then(badge => {
      setbadge(badge);
      ready();
    });
  }, []);
  const { SearchBar } = Search;
  const handleUserEnable = (isChecked: boolean, user: BadgeDetail) => {
    const updateIndex = badge.indexOf(user);
    const badgeToUpdate = badge.slice();
    badgeToUpdate[updateIndex].blocked = isChecked;
    updateBadge(badgeToUpdate[updateIndex], badge);
  };
  const handleUserOrganized = (isChecked: boolean, user: BadgeDetail) => {
    const updateIndex = badge.indexOf(user);
    const badgeToUpdate = badge.slice();
    badgeToUpdate[updateIndex].organized = isChecked;
    updateBadge(badgeToUpdate[updateIndex], badge);
  };
  const handleUserColaborator = (isChecked: boolean, user: BadgeDetail) => {
    const updateIndex = badge.indexOf(user);
    const badgeToUpdate = badge.slice();
    badgeToUpdate[updateIndex].colaborator = isChecked;
    updateBadge(badgeToUpdate[updateIndex], badge);
  };
  const updateBadge = (user: BadgeDetail, badge: Array<BadgeDetail>) => {
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
      formatter: (_cellContent: any, badge: BadgeDetail) => (
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
      formatter: (_cellContent: any, badge: BadgeDetail) => (
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
    user: BadgeDetail
  ) => {
    event.preventDefault();
  };
  const handleEdit = (
    event: MouseEvent<HTMLButtonElement>,
    user: BadgeDetail
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
        to="/admin/badge/new"
      >
        Nuevo Usuario
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
