import React, { useState, useEffect, MouseEvent } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BadgeAssign } from "../../services/models/BadgeAssign";
import { BadgeDetail } from "../../services/models/BadgeDetail";
import {
  getBadgesToAssign,
  assignBadgeToMember,
  removeBadgeFromMember
} from "../../services/badgesServices";
import { PageFullWidthWrapper } from "../Common/PageFullWidthWrapper";
import { NavLink } from "react-router-dom";
type BadgesAssignProps = {
  memberId: number;
  loaded: () => void;
  loading: () => void;
};

export const BadgesAssign: React.SFC<BadgesAssignProps> = ({
  memberId,
  loaded,
  loading
}) => {
  const [badges, setBadges] = useState(new Array<BadgeAssign>());
  useEffect(() => {
    loading();
    getBadgesToAssign(memberId).then(s => {
      setBadges(s);
      loaded();
    });
  }, []);

  const { SearchBar } = Search;

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
      formatter: (_cellContent: any, badge: BadgeAssign) => (
        <img
          className="img-preview-badge-assign"
          src={badge.badgeImageUrl}
        ></img>
      )
    },
    {
      text: "Asignar",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, badge: BadgeAssign) => {
        return (
          <>
            {badge.assigned ? (
              <button
                type="button"
                onClick={e => handleRemoveEvent(e, badge)}
                className="btn btn-danger"
              >
                Quitar
              </button>
            ) : (
              <button
                type="button"
                onClick={e => handleAddEvent(e, badge)}
                className="btn btn-success"
              >
                Asignar
              </button>
            )}
          </>
        );
      }
    },
    {
      text: "Acción",
      style: {
        textAlign: "center",
        height: "2px"
      },
      formatter: (_cellContent: any, badge: BadgeAssign) => (
        <NavLink
          className="btn btn-primary"
          activeClassName="active"
          to={`/badges/${badge.id}`}
        >
          Detalle
        </NavLink>
      )
    }
  ];

  const handleRemoveEvent = (
    event: MouseEvent<HTMLButtonElement>,
    badge: BadgeAssign
  ) => {
    event.preventDefault();
    removeBadgeFromMember(badge.id, memberId).then(s => {
      setBadges(s);
      getBadgesToAssign(memberId).then(s => {
        setBadges(s);
        loaded();
      });
    });
  };
  const handleAddEvent = (
    event: MouseEvent<HTMLButtonElement>,
    badge: BadgeAssign
  ) => {
    event.preventDefault();
    loading();
    assignBadgeToMember(badge.id, memberId).then(s => {
      setBadges(s);
      getBadgesToAssign(memberId).then(s => {
        setBadges(s);
        loaded();
      });
    });
  };
  return (
    <>
      <PageFullWidthWrapper classWrapper="lgx-page-wrapper">
        <article>
          <div>
            {badges && (
              <ToolkitProvider
                keyField="id"
                data={badges}
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
            )}
          </div>
        </article>
      </PageFullWidthWrapper>
    </>
  );
};
