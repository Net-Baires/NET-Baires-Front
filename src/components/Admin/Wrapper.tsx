import React, { useEffect } from "react";
import { connect } from "react-redux";
// import Script from 'react-load-script'
import { loading, ready } from '../../store/loading/actions';
import SideMenu from './Menu/SideMenu';
import FriendsMenu from './Menu/FriendsMenu';
import TopBar from './Menu/TopBar';
import { loadScript, loadStyles } from '../../services/helpers/scriptshelpers';

const AdminWrapperComponent: React.SFC = ({ children }) => {
    useEffect(() => {
        loadScript("assets/js/vendor-all.min.js");
        loadScript("assets/plugins/bootstrap/js/bootstrap.min.js");
        loadScript('assets/js/pcoded.js')
        loadStyles('assets/css/style-app.css');

        // loadScript("assets/js/pcoded.min.js");
    });

    return (<>

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
                                        <div className="page-header-title">
                                            <h5 className="m-b-10">Sample Page</h5>
                                        </div>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html"><i className="feather icon-home"></i></a></li>
                                            <li className="breadcrumb-item"><a href="#!">Sample Page</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-body">
                            <div className="page-wrapper">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>Hello card</h5>
                                                <div className="card-header-right">
                                                    <div className="btn-group card-option">
                                                        <button type="button" className="btn dropdown-toggle btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i className="feather icon-more-horizontal"></i>
                                                        </button>
                                                        <ul className="list-unstyled card-option dropdown-menu dropdown-menu-right">
                                                            <li className="dropdown-item full-card"><a href="#!"><span><i className="feather icon-maximize"></i> maximize</span><span style={{ display: "none" }}><i className="feather icon-minimize"></i> Restore</span></a></li>
                                                            <li className="dropdown-item minimize-card"><a href="#!"><span><i className="feather icon-minus"></i> collapse</span><span style={{ display: "none" }}><i className="feather icon-plus"></i> expand</span></a></li>
                                                            <li className="dropdown-item reload-card"><a href="#!"><i className="feather icon-refresh-cw"></i> reload</a></li>
                                                            <li className="dropdown-item close-card"><a href="#!"><i className="feather icon-trash"></i> remove</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-block">
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
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

export const AdminWrapper = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminWrapperComponent);
