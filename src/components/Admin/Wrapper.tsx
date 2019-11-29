import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import Script from 'react-load-script'
import { loading, ready } from '../../store/loading/actions';
import '../../../assets/fonts/fontawesome/css/fontawesome-all.min.css'
import '../../../assets/plugins/animation/css/animate.min.css'
import '../../../assets/css/style-app.css'
type EditUserParams = {
    id: string;
    loading: () => void;
    ready: () => void;
};

const AdminWrapperComponent: React.SFC = ({ children }) => {
    // useEffect(() => {
    //     addScript("assets/js/vendor-all.min.js");
    //     addScript("assets/plugins/bootstrap/js/bootstrap.min.js");
    //     addScript("assets/js/pcoded.min.js");
    // });
    const addScript = (scriptToAdd: string) => {
        const script = document.createElement("script");
        // script.async = true;

        script.src = scriptToAdd;
        //For head
        document.head.appendChild(script);

        // For body
        document.body.appendChild(script);
    }
    return (<>
        {/* <Script
            url="assets/js/vendor-all.min.js" /> */}
        <Script
            url="assets/plugins/bootstrap/js/bootstrap.min.js" />
        <Script
            url="assets/js/pcoded.min.js" />
        <div className="loader-bg">
            <div className="loader-track">
                <div className="loader-fill"></div>
            </div>
        </div>

        <nav className="pcoded-navbar">
            <div className="navbar-wrapper">
                <div className="navbar-brand header-logo">
                    <a href="index.html" className="b-brand">
                        <div className="b-bg">
                            <i className="feather icon-trending-up"></i>
                        </div>
                        <span className="b-title">Datta Able</span>
                    </a>
                    <a className="mobile-menu" id="mobile-collapse" href="#!"><span></span></a>
                </div>
                <div className="navbar-content scroll-div">
                    <ul className="nav pcoded-inner-navbar">
                        <li className="nav-item pcoded-menu-caption">
                            <label>Navigation</label>
                        </li>
                        <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" className="nav-item">
                            <a href="index.html" className="nav-link"><span className="pcoded-micon"><i className="feather icon-home"></i></span><span className="pcoded-mtext">Dashboard</span></a>
                        </li>
                        <li className="nav-item pcoded-menu-caption">
                            <label>Other</label>
                        </li>
                        <li data-username="Menu levels Menu level 2.1 Menu level 2.2" className="nav-item pcoded-hasmenu">
                            <a href="#!" className="nav-link"><span className="pcoded-micon"><i className="feather icon-menu"></i></span><span className="pcoded-mtext">Menu levels</span></a>
                            <ul className="pcoded-submenu">
                                <li className=""><a href="" className="">Menu Level 2.1</a></li>
                                <li className="pcoded-hasmenu">
                                    <a href="#!" className="">Menu level 2.2</a>
                                    <ul className="pcoded-submenu">
                                        <li className=""><a href="" className="">Menu level 3.1</a></li>
                                        <li className=""><a href="" className="">Menu level 3.2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li data-username="Disabled Menu" className="nav-item disabled"><a href="#!" className="nav-link"><span className="pcoded-micon"><i className="feather icon-power"></i></span><span className="pcoded-mtext">Disabled menu</span></a></li>
                        <li data-username="Sample Page" className="nav-item active"><a href="sample-page.html" className="nav-link"><span className="pcoded-micon"><i className="feather icon-sidebar"></i></span><span className="pcoded-mtext">Sample page</span></a></li>
                        <li className="nav-item pcoded-menu-caption">
                            <label>Support</label>
                        </li>
                        <li data-username="Documentation" className="nav-item"><a href="docs.html" className="nav-link" target="_blank"><span className="pcoded-micon"><i className="feather icon-book"></i></span><span className="pcoded-mtext">Documentation</span></a></li>
                        <li data-username="Need Support" className="nav-item"><a href="https://codedthemes.support-hub.io/" className="nav-link" target="_blank"><span className="pcoded-micon"><i className="feather icon-help-circle"></i></span><span className="pcoded-mtext">Need
                                support ?</span></a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <header className="navbar pcoded-header navbar-expand-lg navbar-light">
            <div className="m-header">
                <a className="mobile-menu" id="mobile-collapse1" href="#!"><span></span></a>
                <a href="index.html" className="b-brand">
                    <div className="b-bg">
                        <i className="feather icon-trending-up"></i>
                    </div>
                    <span className="b-title">Datta Able</span>
                </a>
            </div>
            <a className="mobile-menu" id="mobile-header" href="#!">
                <i className="feather icon-more-horizontal"></i>
            </a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li><a href="#!" className="full-screen"><i className="feather icon-maximize"></i></a></li>
                    <li className="nav-item dropdown">
                        <a className="dropdown-toggle" href="#" data-toggle="dropdown">Dropdown</a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#!">Action</a></li>
                            <li><a className="dropdown-item" href="#!">Another action</a></li>
                            <li><a className="dropdown-item" href="#!">Something else here</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <div className="main-search">
                            <div className="input-group">
                                <input type="text" id="m-search" className="form-control" placeholder="Search . . ." />
                                <a href="#!" className="input-group-append search-close">
                                    <i className="feather icon-x input-group-text"></i>
                                </a>
                                <span className="input-group-append search-btn btn btn-primary">
                                    <i className="feather icon-search input-group-text"></i>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <div className="dropdown">
                            <a className="dropdown-toggle" href="#" data-toggle="dropdown"><i className="icon feather icon-bell"></i></a>
                            <div className="dropdown-menu dropdown-menu-right notification">
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href="#!" className="m-r-10">mark as read</a>
                                        <a href="#!">clear all</a>
                                    </div>
                                </div>
                                <ul className="noti-body">
                                    <li className="n-title">
                                        <p className="m-b-0">NEW</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image"></img>
                                            <div className="media-body">
                                                <p><strong>John Doe</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                                <p>New ticket Added</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image"></img>
                                            <div className="media-body">
                                                <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                                <p>Prchace New Theme and make payment</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image"></img>
                                            <div className="media-body">
                                                <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                                <p>currently login</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div className="noti-footer">
                                    <a href="#!">show all</a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li><a href="#!" className="displayChatbox"><i className="icon feather icon-mail"></i></a></li>
                    <li>
                        <div className="dropdown drp-user">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon feather icon-settings"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right profile-notification">
                                <div className="pro-head">
                                    <img src="assets/images/user/avatar-1.jpg" className="img-radius" alt="User-Profile-Image"></img>
                                    <span>John Doe</span>
                                    <a href="auth-signin.html" className="dud-logout" title="Logout">
                                        <i className="feather icon-log-out"></i>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><a href="#!" className="dropdown-item"><i className="feather icon-settings"></i> Settings</a></li>
                                    <li><a href="#!" className="dropdown-item"><i className="feather icon-user"></i> Profile</a></li>
                                    <li><a href="message.html" className="dropdown-item"><i className="feather icon-mail"></i> My Messages</a></li>
                                    <li><a href="auth-signin.html" className="dropdown-item"><i className="feather icon-lock"></i> Lock Screen</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </header>

        <section className="header-user-list">
            <div className="h-list-header">
                <div className="input-group">
                    <input type="text" id="search-friends" className="form-control" placeholder="Search Friend . . ."></input>
                </div>
            </div>
            <div className="h-list-body">
                <a href="#!" className="h-close-text"><i className="feather icon-chevrons-right"></i></a>
                <div className="main-friend-cont scroll-div">
                    <div className="main-friend-list">
                        <div className="media userlist-box" data-id="1" data-status="online" data-username="Josephin Doe">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image "></img>
                                <div className="live-status">3</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Josephin Doe<small className="d-block text-c-green">Typing . . </small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="2" data-status="online" data-username="Lary Doe">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image"></img>
                                <div className="live-status">1</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Lary Doe<small className="d-block text-c-green">online</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="3" data-status="online" data-username="Alice">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body">
                                <h6 className="chat-header">Alice<small className="d-block text-c-green">online</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="4" data-status="offline" data-username="Alia">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image"></img>
                                <div className="live-status">1</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Alia<small className="d-block text-muted">10 min ago</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="5" data-status="offline" data-username="Suzen">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-4.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body">
                                <h6 className="chat-header">Suzen<small className="d-block text-muted">15 min ago</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="1" data-status="online" data-username="Josephin Doe">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image "></img>
                                <div className="live-status">3</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Josephin Doe<small className="d-block text-c-green">Typing . . </small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="2" data-status="online" data-username="Lary Doe">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image"></img>
                                <div className="live-status">1</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Lary Doe<small className="d-block text-c-green">online</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="3" data-status="online" data-username="Alice">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body">
                                <h6 className="chat-header">Alice<small className="d-block text-c-green">online</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="4" data-status="offline" data-username="Alia">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image"></img>
                                <div className="live-status">1</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Alia<small className="d-block text-muted">10 min ago</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="5" data-status="offline" data-username="Suzen">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-4.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body">
                                <h6 className="chat-header">Suzen<small className="d-block text-muted">15 min ago</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="1" data-status="online" data-username="Josephin Doe">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image "></img>
                                <div className="live-status">3</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Josephin Doe<small className="d-block text-c-green">Typing . . </small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="2" data-status="online" data-username="Lary Doe">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image"></img>
                                <div className="live-status">1</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Lary Doe<small className="d-block text-c-green">online</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="3" data-status="online" data-username="Alice">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body">
                                <h6 className="chat-header">Alice<small className="d-block text-c-green">online</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="4" data-status="offline" data-username="Alia">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image"></img>
                                <div className="live-status">1</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Alia<small className="d-block text-muted">10 min ago</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="5" data-status="offline" data-username="Suzen">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-4.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body">
                                <h6 className="chat-header">Suzen<small className="d-block text-muted">15 min ago</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="1" data-status="online" data-username="Josephin Doe">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image "></img>
                                <div className="live-status">3</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Josephin Doe<small className="d-block text-c-green">Typing . . </small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="2" data-status="online" data-username="Lary Doe">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image"></img>
                                <div className="live-status">1</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Lary Doe<small className="d-block text-c-green">online</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="3" data-status="online" data-username="Alice">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body">
                                <h6 className="chat-header">Alice<small className="d-block text-c-green">online</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="4" data-status="offline" data-username="Alia">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image"></img>
                                <div className="live-status">1</div>
                            </a>
                            <div className="media-body">
                                <h6 className="chat-header">Alia<small className="d-block text-muted">10 min ago</small></h6>
                            </div>
                        </div>
                        <div className="media userlist-box" data-id="5" data-status="offline" data-username="Suzen">
                            <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-4.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body">
                                <h6 className="chat-header">Suzen<small className="d-block text-muted">15 min ago</small></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="header-chat">
            <div className="h-list-header">
                <h6>Josephin Doe</h6>
                <a href="#!" className="h-back-user-list"><i className="feather icon-chevron-left"></i></a>
            </div>
            <div className="h-list-body">
                <div className="main-chat-cont scroll-div">
                    <div className="main-friend-chat">
                        <div className="media chat-messages">
                            <a className="media-left photo-table" href="#!"><img className="media-object img-radius img-radius m-t-5" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body chat-menu-content">
                                <div className="">
                                    <p className="chat-cont">hello Datta! Will you tell me something</p>
                                    <p className="chat-cont">about yourself?</p>
                                </div>
                                <p className="chat-time">8:20 a.m.</p>
                            </div>
                        </div>
                        <div className="media chat-messages">
                            <div className="media-body chat-menu-reply">
                                <div className="">
                                    <p className="chat-cont">Ohh! very nice</p>
                                </div>
                                <p className="chat-time">8:22 a.m.</p>
                            </div>
                        </div>
                        <div className="media chat-messages">
                            <a className="media-left photo-table" href="#!"><img className="media-object img-radius img-radius m-t-5" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image"></img></a>
                            <div className="media-body chat-menu-content">
                                <div className="">
                                    <p className="chat-cont">can you help me?</p>
                                </div>
                                <p className="chat-time">8:20 a.m.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-list-footer">
                <div className="input-group">
                    <input type="file" className="chat-attach"></input>
                    <a href="#!" className="input-group-prepend btn btn-success btn-attach">
                        <i className="feather icon-paperclip"></i>
                    </a>
                    <input type="text" name="h-chat-text" className="form-control h-send-chat" placeholder="Write hear . . "></input>
                    <button type="submit" className="input-group-append btn-send btn btn-primary">
                        <i className="feather icon-message-circle"></i>
                    </button>
                </div>
            </div>
        </section>

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
                                                            <li className="dropdown-item full-card"><a href="#!"><span><i className="feather icon-maximize"></i> maximize</span><span style={{ display: 'none' }}><i className="feather icon-minimize"></i> Restore</span></a></li>
                                                            <li className="dropdown-item minimize-card"><a href="#!"><span><i className="feather icon-minus"></i> collapse</span><span style={{ display: 'none' }}><i className="feather icon-plus"></i> expand</span></a></li>
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
