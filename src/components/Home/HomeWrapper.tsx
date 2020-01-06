import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { loadStyles, loadScript } from "../../services/helpers/scriptshelpers";
import { MenuHome } from "./MenuHome";
import { FooterHome } from "./FooterHome";
import HomeHeaderBanner from "./HomeHeaderBanner/Index";
import ScrollUpButton from "react-scroll-up-button";
import { DialogInstallPwa } from '../InstallPwa/DialogInstallPwa';

//Add this line Here
const HomeWrapperComponent: React.SFC = ({ children }) => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    loadStyles("assets/css/bootstrap.min.css");
    loadStyles("assets/css/style-landing.css");
    loadScript("assets/js/bootstrap.min.js");
  });
  return (
    <>
      <div
        className="wrapper "
      >
        <MenuHome></MenuHome>

        <div className="main" id="main">
          <HomeHeaderBanner></HomeHeaderBanner>
          {children}
          <FooterHome></FooterHome>
          <ScrollUpButton />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = () => ({});
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
