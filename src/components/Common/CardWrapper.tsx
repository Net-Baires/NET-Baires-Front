import React, { Fragment, useState } from "react";
import useCollapse from 'react-collapsed';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MaximizeIcon from '@material-ui/icons/Maximize';
import MinimizeIcon from '@material-ui/icons/Minimize';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
type CardWrapperProps = {
  cardTitle?: string;
  colSize?: number;
  cardBodyClassName?: string;
};

export const CardWrapper: React.SFC<CardWrapperProps> = ({
  children,
  colSize,
  cardTitle,
  cardBodyClassName
}) => {
  const [isOpen, setOpen] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (colSize == null) colSize = 12;
  return (
    <>
      <Fragment>

        <div className={`col-md-${colSize}`}>
          <div className="card">
            <div className="card-header">
              <h5>{cardTitle}</h5>
              <div className="card-header-right">
                <div className="btn-group card-option">
                  <button
                    onClick={handleClick}
                    type="button"
                    className="btn btn-icon"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {!isOpen ?
                      <StyledMenuItem onClick={() => setOpen(oldOpen => !oldOpen)}>
                        <ListItemIcon>
                          <MaximizeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Expandir" />
                      </StyledMenuItem>
                      :
                      <StyledMenuItem onClick={() => setOpen(oldOpen => !oldOpen)}>
                        <ListItemIcon>
                          <MinimizeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Colapsar" />
                      </StyledMenuItem>
                    }

                  </StyledMenu>
                </div>
              </div>
            </div>
            <section {...getCollapseProps()} className={`${cardBodyClassName != null ? cardBodyClassName : ''} card-block card-container-general`}>{children}</section>
          </div>
        </div>
      </Fragment>
    </>
  );
};
