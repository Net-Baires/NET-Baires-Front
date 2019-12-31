import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loading, ready } from "../../store/loading/actions";
import { loadStyles, loadScript } from "../../services/helpers/scriptshelpers";
import { MenuHome } from "./MenuHome";
import { FooterHome } from "./FooterHome";
import HomeHeaderBanner from "./HomeHeaderBanner/Index";
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here
const HomeWrapperComponent: React.SFC = ({ children }) => {
  useEffect(() => {
    loadStyles("assets/css/bootstrap.min.css");
    loadStyles("assets/fonts/fontawesome/css/fontawesome-all.min.css");
    loadStyles("assets/plugins/animation/css/animate.min.css");
    loadStyles("assets/css/animate.css");
    loadStyles("assets/css/owl.carousel.css");
    loadStyles("assets/css/owl.theme.css");
    loadStyles("assets/css/magnific-popup.css");
    loadStyles("assets/css/animsition.min.css");
    loadStyles("assets/css/ionicons.min.css");
    loadStyles("assets/css/style-landing.css");
    loadScript("assets/js/jquery-2.1.1.js");
    loadScript("assets/js/bootstrap.min.js");
    loadScript("assets/js/menu.js");
    loadScript("assets/js/custom.js");
  });
  useEffect(() => {
  })
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
