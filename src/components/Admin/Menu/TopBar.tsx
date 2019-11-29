import React, { useContext, useState } from "react";

type TopBarProps = {};

export const TopBar: React.SFC<TopBarProps> = () => {

    return (
        <>

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
                        <li><a href="#!" className="full-screen" ><i className="feather icon-maximize"></i></a></li>
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
                                                <img className="img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image" />
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
                                                <img className="img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" />
                                                <div className="media-body">
                                                    <p><strong>Joseph William</strong><span className="n-time text-muted"><i className="icon feather icon-clock m-r-10"></i>30 min</span></p>
                                                    <p>Prchace New Theme and make payment</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="notification">
                                            <div className="media">
                                                <img className="img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image" />
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
                                        <img src="assets/images/user/avatar-1.jpg" className="img-radius" alt="User-Profile-Image" />
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
            </header >
        </>
    );
};
export default TopBar;
