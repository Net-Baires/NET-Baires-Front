import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { NavLink, useHistory } from "react-router-dom";
import { match } from "react-router";
import { syncEvents } from "../../services/eventsServices";
import { slide as Menu } from "react-burger-menu";
import { SecureElement } from "../Auth/SecureElement";
import { BreadcrumbsComponent } from "./BreadcrumbsComponent";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { getCurrentUser } from "../../services/authService";
type HeaderProps = {};

export const Header: React.SFC<HeaderProps> = () => {
  const { isLogged, logout } = useContext(UserContext);
  const [open] = useState(false);
  let history = useHistory();
  const user = getCurrentUser();
  const handleLogout = () => {
    logout();
    history.push("/");
    history.listen;
  };
  const handleSyncEvents = () => {
    syncEvents().then(() => { });
  };

  const handleIsActive = (match: match<any>): boolean => {
    return (match as unknown) as boolean;
  };
  return (
    <>
      <SecureElement roles={["Admin", "Organizer"]}>
        <Menu isOpen={open}>
          <SecureElement rol="Admin">
            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/events"
            >
              <i className="fa fa-fw fa-mis-eventos-o"></i>
              Mis Eventos
            </NavLink>
            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/events/sync"
            >
              <i className="fa fa-fw fa-mis-sync-o"></i>
              Eventos para Syncronizar
            </NavLink>
            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/events/live"
            >
              <i className="fa fa-fw fa-tasks"></i>
              Eventos en vivo
            </NavLink>

            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/members"
            >
              <i className="fa fa-fw fa-users"></i>
              Lista de Miembros
            </NavLink>
            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/users/new"
            >
              <i className="fa fa-fw fa-user-plus"></i>
              Nuevo Usuario
            </NavLink>

            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/sponsors"
            >
              <i className="fa fa-fw fa-panel-o"></i>
              Sponsors
            </NavLink>
            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/sponsors/new"
            >
              <i className="fa fa-fw fa-hubspot"></i>
              Nuevo Sponsor
            </NavLink>
            <a className="nav-link-slide-bar" onClick={handleSyncEvents}>
              <i className="fa fa-fw fa-mis-eventos-o"></i>
              Sync Eventos
            </a>

            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/badges"
            >
              <i className="fa fa-fw fa-ribbon"></i>
              Lista de Badges
            </NavLink>
            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/badges/new"
            >
              <i className="fa fa-fw fa-hubspot"></i>
              Nuevo Badge
            </NavLink>
            <NavLink
              exact
              className="nav-link-slide-bar"
              activeClassName="active"
              to="/app/panel"
            >
              <i className="fa fa-fw fa-panel-o"></i>
              Panel de Control
            </NavLink>
          </SecureElement>
          <NavLink
            exact
            className="nav-link-slide-bar"
            activeClassName="active"
            to="/app/EventLive/Attendances"
          >
            <i className="fa fa-fw fa-mis-eventos-o"></i>
            Recibir Miembros
          </NavLink>
        </Menu>
      </SecureElement>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#">
          {" "}
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
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            {!isLogged() ? (
              <Nav.Item>
                <NavLink
                  exact
                  isActive={handleIsActive}
                  className="nav-link"
                  activeClassName="active"
                  to="/login"
                >
                  Login
                </NavLink>
              </Nav.Item>
            ) : (
                <>
                  <NavDropdown title="Acciones" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                      <NavLink
                        exact
                        isActive={handleIsActive}
                        className="nav-link nav-link-dropdown"
                        activeClassName="active"
                        to="/app/profile"
                      >
                        Perfil
                    </NavLink>
                    </NavDropdown.Item>
                    <SecureElement rol="Member">
                      <NavDropdown.Item href="#">
                        <NavLink
                          exact
                          isActive={handleIsActive}
                          className="nav-link nav-link-dropdown"
                          activeClassName="active"
                          to="/app/organizedcode/read"
                        >
                          Leer Código
                      </NavLink>
                      </NavDropdown.Item>
                    </SecureElement>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Nav.Item>
                        <a
                          onClick={handleLogout}
                          className="nav-link nav-link-dropdown"
                          href="#"
                        >
                          Desconectarse
                      </a>
                      </Nav.Item>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            <Nav.Item>
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/joinSlack"
              >
                Sumate a SLACK
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/badges"
              >
                Badges
              </NavLink>
            </Nav.Item>
            {/* <Nav.Item>
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/organizers/1111"
              >
                Organizadores
              </NavLink>
            </Nav.Item> */}

            <Nav.Item>
              <NavLink
                exact
                className="nav-link"
                activeClassName="active"
                to="/events/live"
              >
                Eventos en Vivo
              </NavLink>
            </Nav.Item>

          </Nav>
          {isLogged() && (
            <Navbar.Text>
              Bienvenido :{" "}
              <NavLink exact activeClassName="active" to="/">
                {user.email}
              </NavLink>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Navbar>

    </>
  );
};
export default Header;
