import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AppState } from "../../../store";
import { connect } from "react-redux";
import { Member } from "../../../services/models/Member";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "black",
    },
    title: {
      flexGrow: 1,
    },
  })
);
type TopBarStateProps = {
  memberDetail: Member;
};
type TopBarProps = {
  openMenu: () => void;
};
const TopBarComponent: React.SFC<TopBarProps & TopBarStateProps> = ({
  openMenu,
  memberDetail,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const clickProfile = () => {
    history.push("/app/profile");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => openMenu()}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            NET-Baires
          </Typography>
          <Button onClick={clickProfile} color="inherit">
            {memberDetail && memberDetail.picture ? (
              <Avatar alt="Remy Sharp" src={memberDetail.picture} />
            ) : (
              <AccountCircle />
            )}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  memberDetail: state.memberDetail.memberDetail,
});
const mapDispatchToProps = (dispatch: any) => ({});

export const TopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarComponent);
