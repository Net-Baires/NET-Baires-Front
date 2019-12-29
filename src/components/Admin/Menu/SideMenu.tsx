import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { syncEvents } from "../../../services/eventsServices";
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
type SideMenuProps = {};
const drawerWidth = 240
const useStyles = makeStyles((theme: any) =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export const SideMenu: React.SFC<SideMenuProps> = () => {
  const [] = useState(false);
  const handleSyncEvents = () => {
    syncEvents().then(() => { });
  };
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  function handleClick() {
    setOpen(!open)
  }
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
            <List component="nav" className={classes.appMenu} disablePadding>
              <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <IconDashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>

              <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <IconShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>

              <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <IconPeople />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>

              <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <IconBarChart />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItem>
              <ListItem button onClick={handleClick} className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <IconLibraryBooks />
                </ListItemIcon>
                <ListItemText primary="Nested Pages" />
                {open ? <IconExpandLess /> : <IconExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  <ListItem button className={classes.menuItem}>
                    <ListItemText inset primary="Nested Page 1" />
                  </ListItem>
                  <ListItem button className={classes.menuItem}>
                    <ListItemText inset primary="Nested Page 2" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
            {/* <ul className="nav pcoded-inner-navbar">
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
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
};
export default SideMenu;
