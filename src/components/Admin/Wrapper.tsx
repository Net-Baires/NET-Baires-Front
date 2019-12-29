import React, { useEffect, useContext } from "react";
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
import { ToastContainer } from 'react-toastify';
import { subscribe, CommunicationMessageType, subscribeGeneral, MemberDirectMessage } from '../../services/communicationServices';
import { UserContext } from '../../contexts/UserContext';
import { infoToast } from '../../services/toastServices';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);
interface AppProps {
  isLoading: boolean;
  loading: () => void;
  ready: () => void;
}
const AdminWrapperComponent: React.SFC<AppProps> = ({ children, ...props }) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    loadScript("assets/js/vendor-all.min.js");
    loadScript("assets/plugins/bootstrap/js/bootstrap.min.js");
    loadScript("assets/js/pcoded.js");
    loadStyles("assets/css/style-app.css");
  });

  useEffect(() => {
    subscribeGeneral<MemberDirectMessage>(`${CommunicationMessageType.MemberDirectMessage}-${user.id}`, data => {
      infoToast(data.notificationMessage)
    })
  }, [])

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
                  {/* <LoadingOverlay
                    active={props.isLoading}
                    spinner
                    clasName="row"
                    text="Procesando..."
                  // tslint:disable-next-line: indent
                  > */}
                  {children}
                  <Backdrop
                    className={classes.backdrop}
                    open={props.isLoading}
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  {/* </LoadingOverlay> */}
                  <ToastContainer />
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
