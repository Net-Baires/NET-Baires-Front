import React, { useContext, useState, MouseEvent } from "react";
import { UserContext } from "../../contexts/UserContext";
import { NavLink, useHistory, Link } from "react-router-dom";
import { Location } from "history";
import { match, Route } from "react-router";
import { syncEvents } from "../../services/eventsServices";
import { slide as Menu } from "react-burger-menu";
import { SecureElement } from "../Auth/SecureElement";
import { BreadcrumbsComponent } from "./BreadcrumbsComponent";
import { syncBadges } from "../../services/badgesServices";
type HeaderProps = {};

export const Header: React.SFC<HeaderProps> = props => {
  const { user, isLoggued, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  let history = useHistory();

  const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
    logout();
    history.push("/");
    history.listen;
  };
  const handleClickMenuAdmin = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
  };
  const handleSyncEvents = (event: MouseEvent<HTMLAnchorElement>) => {
    syncEvents().then(x => {});
  };
  const handleSyncBadge = (event: MouseEvent<HTMLAnchorElement>) => {
    syncBadges().then(x => {});
  };

  const handleIsActive = (match: match<any>, location: Location): boolean => {
    return (match as unknown) as boolean;
  };
  return (
    <>
      <SecureElement rol="Admin">
        <Menu isOpen={open}>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/events"
          >
            <i className="fa fa-fw fa-mis-eventos-o"></i>
            Mis Eventos
          </NavLink>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/eventsToSync"
          >
            <i className="fa fa-fw fa-mis-sync-o"></i>
            Eventos para Syncronizar
          </NavLink>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/events/live"
          >
            <i className="fa fa-fw fa-tasks"></i>
            Eventos en vivo
          </NavLink>

          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/users"
          >
            <i className="fa fa-fw fa-users"></i>
            Lista de Usuarios
          </NavLink>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/users/new"
          >
            <i className="fa fa-fw fa-user-plus"></i>
            Nuevo Usuario
          </NavLink>

          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/sponsors"
          >
            <i className="fa fa-fw fa-panel-o"></i>
            Sponsors
          </NavLink>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/sponsors/new"
          >
            <i className="fa fa-fw fa-hubspot"></i>
            Nuevo Sponsor
          </NavLink>
          <a className="nav-link-slide-bar" onClick={handleSyncEvents}>
            <i className="fa fa-fw fa-mis-eventos-o"></i>
            Sync Eventos
          </a>
          <a className="nav-link-slide-bar" onClick={handleSyncBadge}>
            <i className="fa fa-fw fa-ribbon"></i>
            Sync Badges
          </a>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/EventLive"
          >
            <i className="fa fa-fw fa-mis-eventos-o"></i>
            Evento en Vivo
          </NavLink>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/admin/panel"
          >
            <i className="fa fa-fw fa-panel-o"></i>
            Panel de Control
          </NavLink>
        </Menu>
      </SecureElement>
      <div className="lgx-header-position lgx-header-position-white lgx-header-position-fixed  menu-onscroll">
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark header-menu-dark ">
          <NavLink
            exact
            className="navbar-brand"
            activeClassName="active"
            to="/"
          >
            <img
              className="logo-header"
              src="/assets/images/logo-header.png"
              alt="Logo"
            ></img>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/joinSlack"
                >
                  Sumate a SLACK
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/badges"
                >
                  Badges
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/organizers/1111"
                >
                  Organizadores
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink
                  exact
                  className="nav-link"
                  activeClassName="active"
                  to="/events/live"
                >
                  Eventos en Vivo
                </NavLink>
              </li>
              {!isLoggued ? (
                <li className="nav-item">
                  <NavLink
                    exact
                    isActive={handleIsActive}
                    className="nav-link"
                    activeClassName="active"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      isActive={handleIsActive}
                      className="nav-link"
                      activeClassName="active"
                      to="/profile"
                    >
                      Perfil
                    </NavLink>
                  </li>
                  <SecureElement rol="Member">
                    <li className="nav-item">
                      <NavLink
                        exact
                        isActive={handleIsActive}
                        className="nav-link"
                        activeClassName="active"
                        to="/member/organizedcode/read"
                      >
                        Leer Código
                      </NavLink>
                    </li>
                  </SecureElement>
                  <li className="nav-item">
                    <a onClick={handleLogout} className="nav-link" href="#">
                      Desconectarse
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <BreadcrumbsComponent></BreadcrumbsComponent>
    </>
  );
};
export default Header;
