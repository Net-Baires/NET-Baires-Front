import React, { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { NavLink, useHistory } from "react-router-dom";
import { match } from "react-router";
import { syncEvents } from "../../../services/eventsServices";
import { SecureElement } from '../../Auth/SecureElement';
import { BreadcrumbsComponent } from "./BreadcrumbsComponent";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { getCurrentUser } from "../../../services/authService";
type SideMenuProps = {};

export const SideMenu: React.SFC<SideMenuProps> = () => {
    const { isLoggued, logout } = useContext(UserContext);
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
                                <i className="feather icon-trending-up"></i>
                            </div>
                            <span className="b-title">NET-Baires</span>
                        </NavLink>
                        <a className="mobile-menu" id="mobile-collapse" href="#!"><span></span></a>
                    </div>
                    <div className="navbar-content scroll-div">
                        <SecureElement rols={["Admin", "Organizer"]}>
                            <ul className="nav pcoded-inner-navbar">
                                <li data-username="landing page" className="nav-item">
                                    <NavLink
                                        exact
                                        className="nav-link-slide-bar"
                                        activeClassName="active"
                                        to="/admin/panel"
                                    >
                                        <span className="pcoded-micon">
                                            <i className="fab fa-cpanel">
                                            </i>
                                        </span>
                                        <span className="pcoded-mtext">
                                            Panel de Control
                                                    </span>
                                    </NavLink>
                                </li>
                                <li className="nav-item pcoded-menu-caption">
                                    <label>Other</label>
                                </li>

                                <li data-username="Menu levels Menu level 2.1 Menu level 2.2" className="nav-item pcoded-hasmenu">
                                    <a href="#!" className="nav-link"><span className="pcoded-micon"><i className="feather icon-check-square"></i></span><span className="pcoded-mtext">Eventos</span></a>
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
                                            <a className="nav-link-slide-bar" onClick={handleSyncEvents}>
                                                Sync Eventos
                                         </a>
                                        </li>
                                    </ul>
                                </li>
                                <li data-username="Menu levels Menu level 2.1 Menu level 2.2" className="nav-item pcoded-hasmenu">
                                    <a href="#!" className="nav-link"><span className="pcoded-micon"><i className="fas fa-user"></i></span><span className="pcoded-mtext">Usuarios</span></a>
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
                                </li>
                                <li data-username="Menu levels Menu level 2.1 Menu level 2.2" className="nav-item pcoded-hasmenu">
                                    <a href="#!" className="nav-link"><span className="pcoded-micon"><i className="fas fa-university"></i></span><span className="pcoded-mtext">Sponsors</span></a>
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
                                </li>

                                <li data-username="Menu levels Menu level 2.1 Menu level 2.2" className="nav-item pcoded-hasmenu">
                                    <a href="#!" className="nav-link"><span className="pcoded-micon"><i className="fas fa-money-check"></i></span><span className="pcoded-mtext">Badges</span></a>
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
                                </li>

                                <li data-username="Animations" className="nav-item">
                                    <NavLink
                                        exact
                                        className="nav-link-slide-bar"
                                        activeClassName="active"
                                        to="/admin/EventLive/Attendances"
                                    >
                                        <span className="pcoded-micon"><i className="fas fa-user-check"></i></span><span className="pcoded-mtext">Recibir Miemebros</span>
                                    </NavLink>
                                </li>

                            </ul>
                        </SecureElement>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default SideMenu;
