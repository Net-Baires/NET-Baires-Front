import React from "react";
import { NavLink } from "react-router-dom";
import { SecureElement } from '../../Auth/SecureElement';
import { makeStyles, createStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconDashboard from '@material-ui/icons/Dashboard'
import { Rol } from '../../../services/authService';
type SideMenuProps = {
  closeMenu: () => void;
  roles: Rol[];
  linkTo: string;
  text: string;
  icon: JSX.Element;
};

export const SideMenuOption: React.SFC<SideMenuProps> = ({ closeMenu, roles, linkTo, text, icon }) => {
  const classes = useStyles()
  return (

    <SecureElement roles={roles}>
      <NavLink
        exact
        className="nav-link-slide-bar"
        activeClassName="active"
        to={linkTo}
      >
        <ListItem onClick={closeMenu} button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </NavLink>
    </SecureElement>
  );
};

const drawerWidth = 240

const useStyles = makeStyles(() =>
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
