import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { syncEvents } from "../../../services/eventsServices";
import { SecureElement } from "../../Auth/SecureElement";
type SideMenuProps = {};

export const SideMenu: React.SFC<SideMenuProps> = () => {
  const [] = useState(false);
  const handleSyncEvents = () => {
    syncEvents().then(() => { });
  };
  return (
    <>
      <nav className="pcoded-navbar">
        <div className="navbar-wrapper">
          <div className="navbar-brand header-logo">
            <NavLink
              exact
              className="b-brand"
              activeClassName="active"
              to="/admin/panel"
            >
              <div className="b-bg panel-logo">
                {/* <i className="feather icon-trending-up"></i> */}
              </div>
              <span className="b-title">NET-Baires</span>
            </NavLink>
            <a className="mobile-menu" id="mobile-collapse">
              <span></span>
            </a>
          </div>
          <div className="navbar-content scroll-div">
            <ul className="nav pcoded-inner-navbar">
              <li data-username="landing page" className="nav-item">
                <SecureElement roles={["Admin", "Organizer"]}>
                  <NavLink
                    exact
                    className="nav-link-slide-bar"
                    activeClassName="active"
                    to="/admin/panel"
                  >
                    <span className="pcoded-micon">
                      <i className="fab fa-cpanel"></i>
                    </span>
                    <span className="pcoded-mtext">Panel de Control</span>
                  </NavLink>
                </SecureElement>
                <SecureElement roles={["Member"]}>
                  <NavLink
                    exact
                    className="nav-link-slide-bar"
                    activeClassName="active"
                    to="/member/panel"
                  >
                    <span className="pcoded-micon">
                      <i className="fab fa-cpanel"></i>
                    </span>
                    <span className="pcoded-mtext">Panel de Control</span>
                  </NavLink>
                </SecureElement>
              </li>
              <li className="nav-item pcoded-menu-caption">
                <label>Other</label>
              </li>

              <li
                data-username="Menu levels Menu level 2.1 Menu level 2.2"
                className="nav-item pcoded-hasmenu"
              >

                <SecureElement roles={["Admin", "Organizer"]}>
                  <a className="nav-link">
                    <span className="pcoded-micon">
                      <i className="feather icon-check-square"></i>
                    </span>
                    <span className="pcoded-mtext">Eventos</span>
                  </a>
                  <ul className="pcoded-submenu">
                    <li className="">
                      <NavLink
                        exact
                        activeClassName="active"
                        to="/admin/events"
                      >
                        Mis Eventos
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        exact
                        activeClassName="active"
                        to="/admin/eventsToSync"
                      >
                        Eventos para Sincronizar
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        exact
                        activeClassName="active"
                        to="/admin/events/live"
                      >
                        Eventos en vivo
                      </NavLink>
                    </li>
                    <li className="">
                      <a
                        className="nav-link-slide-bar"
                        onClick={handleSyncEvents}
                      >
                        Sync Eventos
                      </a>
                    </li>
                  </ul>
                </SecureElement>
              </li>
              <li
                data-username="Menu levels Menu level 2.1 Menu level 2.2"
                className="nav-item pcoded-hasmenu"
              >
                <SecureElement roles={["Admin"]}>
                  <a className="nav-link">
                    <span className="pcoded-micon">
                      <i className="fas fa-user"></i>
                    </span>
                    <span className="pcoded-mtext">Usuarios</span>
                  </a>
                  <ul className="pcoded-submenu">
                    <li className="">
                      <NavLink
                        exact
                        className="nav-link-slide-bar"
                        activeClassName="active"
                        to="/admin/users"
                      >
                        Lista
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        exact
                        className="nav-link-slide-bar"
                        activeClassName="active"
                        to="/admin/users/new"
                      >
                        Nuevo
                      </NavLink>
                    </li>
                  </ul>
                </SecureElement>
              </li>
              <li
                data-username="Menu levels Menu level 2.1 Menu level 2.2"
                className="nav-item pcoded-hasmenu"
              >
                <SecureElement roles={["Admin"]}>
                  <a className="nav-link">
                    <span className="pcoded-micon">
                      <i className="fas fa-university"></i>
                    </span>
                    <span className="pcoded-mtext">Sponsors</span>
                  </a>
                  <ul className="pcoded-submenu">
                    <li className="">
                      <NavLink
                        exact
                        className="nav-link-slide-bar"
                        activeClassName="active"
                        to="/admin/sponsors"
                      >
                        Lista
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        exact
                        className="nav-link-slide-bar"
                        activeClassName="active"
                        to="/admin/sponsors/new"
                      >
                        Nuevo
                      </NavLink>
                    </li>
                  </ul>
                </SecureElement>
              </li>

              <li
                data-username="Menu levels Menu level 2.1 Menu level 2.2"
                className="nav-item pcoded-hasmenu"
              >
                <SecureElement roles={["Admin"]}>
                  <a className="nav-link">
                    <span className="pcoded-micon">
                      <i className="fas fa-money-check"></i>
                    </span>
                    <span className="pcoded-mtext">Badges</span>
                  </a>
                  <ul className="pcoded-submenu">
                    <li className="">
                      <NavLink
                        exact
                        className="nav-link-slide-bar"
                        activeClassName="active"
                        to="/admin/badges"
                      >
                        Lista
                      </NavLink>
                    </li>
                    <li className="">
                      <NavLink
                        exact
                        className="nav-link-slide-bar"
                        activeClassName="active"
                        to="/admin/badges/new"
                      >
                        Nuevo
                      </NavLink>
                    </li>
                  </ul>
                </SecureElement>
              </li>

              <li data-username="Animations" className="nav-item">
                <SecureElement roles={["Admin", "Organizer"]}>
                  <NavLink
                    exact
                    className="nav-link-slide-bar"
                    activeClassName="active"
                    to="/admin/EventLive/Attendances"
                  >
                    <span className="pcoded-micon">
                      <i className="fas fa-user-check"></i>
                    </span>
                    <span className="pcoded-mtext">Recibir Miemebros</span>
                  </NavLink>
                </SecureElement>
              </li>
              <li data-username="Animations" className="nav-item">
                <NavLink
                  exact
                  className="nav-link-slide-bar"
                  activeClassName="active"
                  to="/logout"
                >
                  <span className="pcoded-micon">
                    <i className="fas fa-user-check"></i>
                  </span>
                  <span className="pcoded-mtext">Desconectarse</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default SideMenu;
