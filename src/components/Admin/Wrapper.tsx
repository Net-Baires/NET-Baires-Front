import React, { useEffect } from "react";
import { connect } from "react-redux";
// import Script from 'react-load-script'
import { loading, ready } from "../../store/loading/actions";
import SideMenu from "./Menu/SideMenu";
import FriendsMenu from "./Menu/FriendsMenu";
import TopBar from "./Menu/TopBar";
import { loadScript, loadStyles } from "../../services/helpers/scriptshelpers";
import ReactTooltip from "react-tooltip";
import LoadingOverlay from "react-loading-overlay";
import { AppState } from "../../store";
interface AppProps {
  isLoading: boolean;
  loading: () => void;
  ready: () => void;
}
const AdminWrapperComponent: React.SFC = ({ children, ...props }) => {
  useEffect(() => {
    loadScript("assets/js/vendor-all.min.js");
    loadScript("assets/plugins/bootstrap/js/bootstrap.min.js");
    loadScript("assets/js/pcoded.js");
    loadStyles("assets/css/style-app.css");

    // loadScript("assets/js/pcoded.min.js");
  });

  return (
    <>
      <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill"></div>
        </div>
      </div>
      <SideMenu></SideMenu>
      <TopBar></TopBar>
      <FriendsMenu></FriendsMenu>
      <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="page-header">
                <div className="page-block">
                  <div className="row align-items-center">
                    <div className="col-md-12">
                      {/* <BreadcrumbsComponent></BreadcrumbsComponent> */}
                      {/* <div className="page-header-title">
                                            <h5 className="m-b-10">Sample Page</h5>
                                        </div>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                                            <li className="breadcrumb-item"><a href="#!">Sample Page</a></li>
                                        </ul> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-body">
                <div className="page-wrapper">
                  <LoadingOverlay
                    active={props.isLoading}
                    spinner
                    clasName="row"
                    text="Procesando..."
                    // tslint:disable-next-line: indent
                  >
                    {children}
                  </LoadingOverlay>
                </div>
              </div>
            </div>
          </div>
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

export const AdminWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminWrapperComponent);
