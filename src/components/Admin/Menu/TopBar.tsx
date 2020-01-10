import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

type TopBarProps = {
    openMenu: () => void;
};
export const TopBar: React.SFC<TopBarProps> = ({ openMenu }) => {
    const classes = useStyles();
    const history = useHistory();
    const clickProfile = () => {
        history.push("/app/profile");
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon onClick={() => openMenu()} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        NET-Baires
                    </Typography>
                    <Button onClick={clickProfile} color="inherit">
                        <AccountCircle />
                    </Button>
                </Toolbar>
            </AppBar>
        </div>)
}