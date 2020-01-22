import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { loadStyles, loadScript } from "../../services/helpers/scriptshelpers";
import { MenuHome } from "./MenuHome";
import { FooterHome } from "./FooterHome";
import HomeHeaderBanner from "./HomeHeaderBanner/Index";
import ScrollUpButton from "react-scroll-up-button";
import { Backdrop, CircularProgress, makeStyles, createStyles, Theme } from '@material-ui/core';
import { AppState } from '../../store';
import { Offline, Online } from "react-detect-offline";
interface HomeWrapperProps {
  isLoading: boolean;
  loading: () => void;
  ready: () => void;
}
const HomeWrapperComponent: React.SFC<HomeWrapperProps> = ({ isLoading, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    loadStyles("assets/css/bootstrap.min.css");
    loadStyles("assets/css/style-landing.css");
    loadScript("assets/js/bootstrap.min.js");
  }, []);
  useEffect(() => {
    if (document.getElementsByClassName("hero-section app-hero").length > 0) {
      const bottonOfHeader = document.getElementsByClassName("hero-section app-hero")[0].scrollHeight;
      const siveNavBar = document.getElementsByClassName("navbar ")[0].scrollHeight;
      if (window.pageYOffset > bottonOfHeader)
        window.scrollTo(0, bottonOfHeader - siveNavBar);
    }
  });

  return (
    <>

      <div
        className="wrapper "
      >
        <MenuHome></MenuHome>
        <div className="main" id="main">
          <HomeHeaderBanner></HomeHeaderBanner>
          <Backdrop
            className={classes.backdrop}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {children}
          <FooterHome></FooterHome>
          <ScrollUpButton />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.loading.isLoading
});
const mapDispatchToProps = (dispatch: any) => ({
  loading: () => {
    dispatch(loading());
  },
  ready: () => {
    dispatch(ready());
  }
});

export const HomeWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeWrapperComponent);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);